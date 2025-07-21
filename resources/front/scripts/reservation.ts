const buttonsWithDates = document.querySelectorAll('[data-start]') as NodeListOf<HTMLElement>;
const buttonWithoutDate = document.querySelector('.button-reservation-clear');
const ofertaBtns = document.querySelectorAll('.btn-oferta') as NodeListOf<HTMLElement>;
const prices = document.querySelectorAll('.cena') as NodeListOf<HTMLElement>;
const reservation = () => {
  if (buttonsWithDates) {
    buttonsWithDates.forEach((btn) => {
      btn.addEventListener('click', () => {
        let start = btn.getAttribute('data-start');
        let finish = btn.getAttribute('data-finish');
        if (start) {
          localStorage.setItem('start', start);
        }
        if (finish) {
          localStorage.setItem('finish', finish);
        }
        if (!buttonWithoutDate) return;
        const link = buttonWithoutDate.getAttribute('data-href');
        if (!link) return;
        window.location.href = link;
      });
    });
  }
  if (buttonWithoutDate) {
    buttonWithoutDate.addEventListener('click', () => {
      localStorage.setItem('start', '');
      localStorage.setItem('finish', '');
      const link = buttonWithoutDate.getAttribute('data-href');
      if (!link) return;
      window.location.href = link;
    });
  }
  if (ofertaBtns) {
    ofertaBtns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        ofertaBtns.forEach((b) => b.classList.remove('btn--active'));
        btn.classList.add('btn--active');
        if (index === 0) {
          prices.forEach((price) => {
            let cenaOne = price.getAttribute('data-cena-1');
            if (cenaOne) {
              price.innerHTML = cenaOne;
            }
          });
        }

        if (index === 1) {
          prices.forEach((price) => {
            let cenaTwo = price.getAttribute('data-cena-2');
            if (cenaTwo) {
              price.innerHTML = cenaTwo;
            }
          });
        }
      });
    });
  }
};
export default reservation;
