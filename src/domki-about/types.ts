export interface AttributesI {
  identifier: string;
  image_one: ImageI;
  image_two: ImageI;
  pattern: ImageI;
}
export interface ImageI {
  media_id: number;
  alt: string;
}
