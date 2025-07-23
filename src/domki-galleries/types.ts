export interface AttributesI {
  identifier: string;
  title: TitleI;
  galleries: GalleryI[];
  button: ButtonI;
}

export interface GalleryI {
  order_by: number;
  title: string;
  gallery_id: number;
  images: SortableImageI[];
}

export interface ButtonI {
  text: string;
  link: string;
  show: boolean;
}

interface TitleI {
  text: string;
  show: boolean;
}

export interface SortableImageI {
  media_id: number;
  order_by: number;
}
export interface ApiGalleryI {
  id: number;
  title: string;
  media_ids: string;
}
