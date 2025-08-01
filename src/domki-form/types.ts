export interface AttributesI {
  identifier: string;
  title: TitleI;
  privacy: string;
  logo: ImageI;
}

export interface TitleI {
  text: string;
  show: boolean;
}

export interface ImageI {
  media_id: number;
  alt: string;
}
