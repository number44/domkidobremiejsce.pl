export interface GalleryI {
  id: number;
  title: string;
  media_ids: string;
}
export interface ResponseMetaI {
  id: number;
  post_id: number;
  schema_type: string;
  google_rating: string;
  google_review_count: number;
  street_address: string;
  address_locality: string;
  address_region: string;
  postal_code: string;
  address_country: string;
  telephone: string;
  custom_description: string;
  last_updated: string;
  created_at: string;
}

// interfaces/PageSchemaDataI.ts
// interfaces/PageSchemaDataI.ts
export interface PageSchemaDataI {
  "@context": "https://schema.org";
  "@type": string;
  name: string;
  url: string;
  description: string;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: string;
    reviewCount: string;
  };
  address?: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
}
