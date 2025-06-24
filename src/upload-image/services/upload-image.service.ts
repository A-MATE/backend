import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { AWSUtil } from 'src/upload-image/utils/aws';

@Injectable()
export class UploadImageService {
  async uploadFile(
    buffer: Buffer,
    thumbnailPath: string,
    largePath: string,
    mimetype: string,
  ): Promise<{ large: string; thumbnail: string }> {
    try {
      const thumbBuffer = await sharp(buffer).resize(150, 150).toBuffer();
      const largeBuffer = await sharp(buffer).resize(1024, 1024).toBuffer();

      const [thumbRes, largeRes] = await Promise.all([
        AWSUtil.uploadToS3(thumbBuffer, thumbnailPath, mimetype),
        AWSUtil.uploadToS3(largeBuffer, largePath, mimetype),
      ]);

      return {
        thumbnail: thumbRes.Location,
        large: largeRes.Location,
      };
    } catch (err) {
      console.log('[SERVER ERROR][UploadImageService:uploadFile]: ', err);
      throw err;
    }
  }
}
