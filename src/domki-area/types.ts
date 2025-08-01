export interface AttributesI {
  identifier: string;
  title: TitleI;
  elements: ElementI[];
  apiGallery: ApiGalleryI;
  gallery: GalleryI;
  button: ButtonI;
}
interface ElementI {
  text: string;
  unit: string;
  url: string;
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
export interface LinkI {
  text: string;
  url: string;
  order_by: number;
}

interface ElementI {
  distance: string;
  fullname: string;
  order_by: number;
}
