export interface AttributesI {
  align: string;
  facebook: string;
  instagram: string;
  phone: LinkI;
  reservation: LinkI;
  links: LinkI[];
  mobile: MobileI;
  pattern: ImageI;
  logo: ImageI;
}

interface ImageI {
  media_id: number;
  alt: string;
}

export interface MobileI {
  line_1: string;
  line_2: string;
  reservation_text: string;
}

export interface LinkI {
  text: string;
  url: string;
}
