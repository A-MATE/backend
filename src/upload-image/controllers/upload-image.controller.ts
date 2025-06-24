import {
  Controller,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadImageService } from '../services/upload-image.service';

@Controller('upload-image')
export class UploadImageController {
  constructor(private readonly uploadImageService: UploadImageService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('Only PNG or JPEG files are allowed'),
            false,
          );
        }
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!folder) {
      throw new BadRequestException('Folder parameter is missing');
    }

    const timestamp = Date.now();
    const thumbnailPath = `${folder}/thumbnail-${timestamp}_${file.originalname}`;
    const largePath = `${folder}/large-${timestamp}_${file.originalname}`;

    const result = await this.uploadImageService.uploadFile(
      file.buffer,
      thumbnailPath,
      largePath,
      file.mimetype,
    );

    return { statusCode: 200, isSuccess: true, data: result };
  }
}
