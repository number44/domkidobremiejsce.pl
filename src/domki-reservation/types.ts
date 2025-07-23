export interface AttributesI {
  identifier: string;
  title: string;
  promotion_text: string;
  promo_1: PromoI;
  promo_2: PromoI;
  promo_3: PromoI;
  promo_4: PromoI;
  button: LinkI;
  reservation_text: string;
}
export interface PromoI {
  id: number;
  from: string;
  to: string;
  alt: string;
  line_1: string;
  line_2: string;
  url: string;
  img_id: number;
  price_1: string;
  price_2: string;
}

export interface LinkI {
  text: string;
  url: string;
}
export interface ImageI {
  id: number;
  url: string;
  alt: string;
  thumbnail: string;
  medium: string;
  large: string;
  full: string;
}

export interface MediaImageI {
  id: number;
  title: string;
  filename: string;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploadedTo: number;
  date: string;
  modified: string;
  menuOrder: number;
  mime: string;
  type: string;
  subtype: string;
  icon: string;
  dateFormatted: string;
  nonces: {
    update: string;
    delete: string;
    edit: string;
  };
  editLink: string;
  meta: boolean;
  authorName: string;
  authorLink: string;
  uploadedToTitle: string;
  uploadedToLink: string;
  filesizeInBytes: number;
  filesizeHumanReadable: string;
  context: string;
  height: number;
  width: number;
  orientation: string;
  sizes: {
    thumbnail: {
      height: number;
      width: number;
      url: string;
      orientation: string;
    };
    medium: {
      height: number;
      width: number;
      url: string;
      orientation: string;
    };
    large: {
      height: number;
      width: number;
      url: string;
      orientation: string;
    };
    full: {
      height: number;
      width: number;
      url: string;
      orientation: string;
    };
  };
  compat: {
    item: string;
    meta: string;
  };
}

/**
 * Swiper
 */
