// import carousel from './scripts/carousel';
import "./styles.scss";
// const emblaNodes: NodeListOf<HTMLElement> | null = document.querySelectorAll('.embla');
import lazyloadImages from "./scripts/lazyload";
import reservation from "./scripts/reservation";
import googleConsentInit from "./google_consent";
const oferta = document.querySelector(".oferta-section");
function init() {
  // const emblaNodes: NodeListOf<HTMLElement> | null = document.querySelectorAll('.embla');
  if (oferta) {
    reservation();
  }
  // googleConsentInit();
  lazyloadImages();
}

window.addEventListener("load", () => {
  if (window.location.hash) {
    const id = window.location.hash.substring(1); // Remove the #
    const targetElement = document.getElementById(id);
    if (targetElement) {
      // const headerOffset = 80; // Replace with your header height
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const menuFixedElem: HTMLElement | null = document.querySelector(".menu-fixed");
      let heighMenuFixedElem = 0;
      if (menuFixedElem) {
        heighMenuFixedElem = menuFixedElem.offsetHeight;
      }

      window.scrollTo({
        top: elementPosition - heighMenuFixedElem,
        behavior: "smooth",
      });
    }
  }
});
document.addEventListener("DOMContentLoaded", init);
