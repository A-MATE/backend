import { Module } from '@nestjs/common';
import { UploadImageController } from './controllers/upload-image.controller';
import { UploadImageService } from './services/upload-image.service';

@Module({
  controllers: [UploadImageController],
  providers: [UploadImageService],
})
export class UploadImageModule {}
