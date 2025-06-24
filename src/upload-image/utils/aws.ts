import * as AWS from 'aws-sdk';

export class AWSUtil {
  private static readonly s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  public static async uploadToS3(
    fileBuffer: Buffer,
    objectPath: string,
    fileType: string,
  ) {
    const uploadedImage = await AWSUtil.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: objectPath.replace(/\s/g, ''),
        Body: fileBuffer,
        ContentType: fileType,
      })
      .promise();

    return uploadedImage;
  }
}
