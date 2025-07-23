import "./styles.scss";
import detectScroll from "./utils/scrolling";
import scrolling from "./scripts/scrolling";
import menusFoo from "./scripts/menus";
import gallery from "./scripts/gallery";
import reservation from "./scripts/reservation";
import { carousel, galleryCarousel } from "./scripts/carousel";
import sectionlinks from "./scripts/sectionLinks";
import "swiper/css";
import mobileSocials from "./scripts/mobileSocials";
import privacy from "./scripts/privacy";
const oferta = document.querySelector(".oferta-section");
const swipey = document.querySelector(".swipey") as HTMLElement;
const gallerySection = document.querySelector(".gallery-section") as HTMLElement;

init();
function init(): void {
  privacy();

  sectionlinks();
  mobileSocials();
  menusFoo();
  detectScroll(scrolling, 40);
  if (oferta) {
    reservation();
  }
  if (gallerySection) {
    galleryCarousel();
    gallery();
  }

  if (swipey) {
    carousel(swipey);
  }
}
