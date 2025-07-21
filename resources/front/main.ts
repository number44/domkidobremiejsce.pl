// import carousel from './scripts/carousel';
import './styles.scss';
// const emblaNodes: NodeListOf<HTMLElement> | null = document.querySelectorAll('.embla');
import lazyloadImages from './scripts/lazyload';
import reservation from './scripts/reservation';
const oferta = document.querySelector('.oferta-section');
function init() {
  // const emblaNodes: NodeListOf<HTMLElement> | null = document.querySelectorAll('.embla');
  if (oferta) {
    reservation();
  }
  // if (emblaNodes.length > 0) {
  //   emblaNodes.forEach((emblaNode) => {
  //     carousel(emblaNode);
  //   });
  // }

  lazyloadImages();
}

document.addEventListener('DOMContentLoaded', init);
