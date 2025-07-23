export interface AttributesI {
  identifier: string;
  image_one: ImageWithAspectRatioI;
  image_two: ImageWithAspectRatioI;
  image_three: ImageWithAspectRatioI;
  pattern: ImageI;
}

export interface ImageI {
  media_id: number;
  alt: string;
}
export interface ImageWithAspectRatioI {
  media_id: number;
  alt: string;
  aspect_ratio: AspectRatioT;
}

export type AspectRatioT = '16/9' | '4/3' | '1/1' | '3/4';
