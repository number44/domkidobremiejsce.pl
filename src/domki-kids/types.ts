export interface AttributesI {
  identifier: string;
  title: TitleI;
  images: SortableImageI[];
  apiGallery: ApiGalleryI;
  gallery: GalleryI;
  button: ButtonI;
  pattern: PatternI;
}

interface PatternI {
  alt: string;
  media_id: number;
}
interface ElementI {
  media_id: string;
  text: string;
  order_by: number;
}
export interface TitleI {
  text: string;
  show: boolean;
}

export interface SortableImageI {
  media_id: number;
  text: string;
  alt: string;
  order_by: number;
}
export interface ApiGalleryI {
  id: number;
  title: string;
  media_ids: string;
}
export interface GalleryI {
  order_by: number;
  title: string;
  gallery_id: number;
  images: SortableGalleryImageI[];
}
export interface SortableGalleryImageI {
  media_id: number;
  order_by: number;
}
export interface ButtonI {
  text: string;
  link: string;
  show: boolean;
}
