//Result of pushing a file to an image storage provider
export interface UploadedImage {
  //Provider specific identifier, used to look the image up later
  key: string;
  //Ready to use URL pointing at the uploaded image
  url: string;
}

//Contract every image storage provider has to fulfill
export interface ImageStorage {
  name: string;
  upload(file: Express.Multer.File): Promise<UploadedImage>;
  getImageUrl(key: string): Promise<string>;
}
