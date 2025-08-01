export interface AttributesI {
  identifier: string;
  title: TitleI;
  elements: ElementI[];
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
