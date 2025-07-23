export interface AttributesI {
  identifier: string;
  facebook: string;
  instagram: string;
  phone: LinkI;
  reservation: LinkI;
  links: LinkI[];
  logo: ImageI;
  carousel: CarouselI;
  images: SortableImageI[];
}

export interface CarouselI {
  autoplay: string;
  loop: boolean;
}
export interface ImageI {
  media_id: number;
  alt: string;
}

export interface LinkI {
  text: string;
  url: string;
  order_by: number;
}

export interface SortableImageI {
  media_id: number;
  text: string;
  alt: string;
  order_by: number;
}
