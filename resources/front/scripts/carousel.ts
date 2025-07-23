import EmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

// Define constants for selectors
const SELECTORS = {
  VIEWPORT: '.embla__viewport',
  PREV_BUTTON: '.embla__button--prev',
  NEXT_BUTTON: '.embla__button--next',
  DOTS_CONTAINER: '.embla__dots',
  DOT_BUTTON: 'embla__dot', // Used for class name
  DOT_SELECTED_CLASS: 'embla__dot--selected',
};

// Define attribute names
const ATTRIBUTES = {
  AUTOPLAY_DELAY: 'data-carousel-autoplay',
  LOOP: 'data-carousel-loop',
  ENABLE_DOTS: 'data-carousel-dots',
  ENABLE_ARROWS: 'data-carousel-arrows',
  INITIAL_SLIDE: 'data-carousel-initial',
};

export default function carousel(emblaNode: HTMLElement | null) {
  if (!emblaNode) {
    console.warn('Embla Carousel: Root node not provided.');
    return;
  }

  const viewportNode = emblaNode.querySelector(SELECTORS.VIEWPORT) as HTMLElement | null;
  const prevBtnNode = emblaNode.querySelector(SELECTORS.PREV_BUTTON) as HTMLElement | null;
  const nextBtnNode = emblaNode.querySelector(SELECTORS.NEXT_BUTTON) as HTMLElement | null;
  const dotsNode = emblaNode.querySelector(SELECTORS.DOTS_CONTAINER) as HTMLElement | null;

  if (!viewportNode) {
    console.error('Embla Carousel: Viewport element not found.', { rootNode: emblaNode, selector: SELECTORS.VIEWPORT });
    return;
  }

  // Get attributes (these will still be read directly for their specific purposes)
  const dataAutoplayAttr = emblaNode.getAttribute(ATTRIBUTES.AUTOPLAY_DELAY);
  const dataLoop = emblaNode.getAttribute(ATTRIBUTES.LOOP) === 'true';
  const enableDots = emblaNode.getAttribute(ATTRIBUTES.ENABLE_DOTS) === 'true';
  const enableArrows = emblaNode.getAttribute(ATTRIBUTES.ENABLE_ARROWS) === 'true';

  // **IMPORTANT CHANGE HERE:** Initial slide will now be controlled by Interactivity API
  // We no longer read data-carousel-initial directly for the Embla initial setup
  const options: EmblaOptionsType = {
    loop: dataLoop,
    // startIndex: 0, // Embla will start at 0 by default, and IAPI will update it
  };

  const plugins = [];

  // Conditionally add Autoplay plugin
  if (dataAutoplayAttr !== null) {
    const autoplayDelay = Number(dataAutoplayAttr) || 3000;
    plugins.push(
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
      }),
    );
  }

  const emblaApi = EmblaCarousel(viewportNode, options, plugins);

  const onNavButtonClick = (api: EmblaCarouselType): void => {
    const autoplay = api?.plugins()?.autoplay;
    if (autoplay) {
      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
      resetOrStop();
    }
  };

  let removePrevNextBtnsClickHandlers: (() => void) | undefined;
  let removeDotBtnsAndClickHandlers: (() => void) | undefined;

  // Conditionally add arrow functionality
  if (enableArrows && prevBtnNode && nextBtnNode) {
    removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtnNode,
      nextBtnNode,
      onNavButtonClick,
    );
    emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
  } else if ((!prevBtnNode || !nextBtnNode) && enableArrows) {
    console.warn('Embla Carousel: Arrows enabled but navigation buttons not found.', { rootNode: emblaNode });
  }

  // Conditionally add dots functionality
  if (enableDots && dotsNode) {
    removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode, onNavButtonClick);
    emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
  } else if (!dotsNode && enableDots) {
    console.warn('Embla Carousel: Dots enabled but dots container not found.', { rootNode: emblaNode });
  }

  // Return the Embla API instance so the Interactivity API can use it
  return emblaApi;
}

// --- Helper Functions (remain mostly the same, but integrate constants) ---

const addTogglePrevNextBtnsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
): (() => void) => {
  const togglePrevNextBtnsState = (): void => {
    if (emblaApi.canScrollPrev()) prevBtn.removeAttribute('disabled');
    else prevBtn.setAttribute('disabled', 'disabled');

    if (emblaApi.canScrollNext()) nextBtn.removeAttribute('disabled');
    else nextBtn.setAttribute('disabled', 'disabled');
  };

  emblaApi
    .on('select', togglePrevNextBtnsState)
    .on('init', togglePrevNextBtnsState)
    .on('reInit', togglePrevNextBtnsState);

  return (): void => {
    prevBtn.removeAttribute('disabled');
    nextBtn.removeAttribute('disabled');
  };
};

const addPrevNextBtnsClickHandlers = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): (() => void) => {
  const scrollPrev = (): void => {
    emblaApi.scrollPrev();
    if (onButtonClick) onButtonClick(emblaApi);
  };
  const scrollNext = (): void => {
    emblaApi.scrollNext();
    if (onButtonClick) onButtonClick(emblaApi);
  };
  prevBtn.addEventListener('click', scrollPrev, false);
  nextBtn.addEventListener('click', scrollNext, false);

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(emblaApi, prevBtn, nextBtn);

  return (): void => {
    removeTogglePrevNextBtnsActive();
    prevBtn.removeEventListener('click', scrollPrev, false);
    nextBtn.removeEventListener('click', scrollNext, false);
  };
};

const addDotBtnsAndClickHandlers = (
  emblaApi: EmblaCarouselType,
  dotsNode: HTMLElement,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): (() => void) => {
  let dotNodes: HTMLElement[] = [];

  const addDotBtnsWithClickHandlers = (): void => {
    dotsNode.innerHTML = emblaApi
      .scrollSnapList()
      .map(() => `<button class="${SELECTORS.DOT_BUTTON}" type="button"></button>`)
      .join('');

    const scrollTo = (index: number): void => {
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(`.${SELECTORS.DOT_BUTTON}`));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener('click', () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = (): void => {
    if (!dotNodes || dotNodes.length === 0) return;
    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();

    // Defensive check for valid indices
    if (dotNodes[previous]) {
      dotNodes[previous].classList.remove(SELECTORS.DOT_SELECTED_CLASS);
    }
    if (dotNodes[selected]) {
      dotNodes[selected].classList.add(SELECTORS.DOT_SELECTED_CLASS);
    }
  };

  emblaApi
    .on('init', addDotBtnsWithClickHandlers)
    .on('reInit', addDotBtnsWithClickHandlers)
    .on('init', toggleDotBtnsActive)
    .on('reInit', toggleDotBtnsActive)
    .on('select', toggleDotBtnsActive);

  return (): void => {
    dotsNode.innerHTML = '';
    // No need to remove individual dot event listeners here, as innerHTML = '' removes the elements and their listeners.
  };
};
