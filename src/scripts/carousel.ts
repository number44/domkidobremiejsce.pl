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
  ENABLE_KEYBOARD_NAV: 'data-carousel-keyboard-nav', // New attribute for keyboard nav
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

  // Get attributes
  const dataAutoplayAttr = emblaNode.getAttribute(ATTRIBUTES.AUTOPLAY_DELAY);
  const dataLoop = emblaNode.getAttribute(ATTRIBUTES.LOOP) === 'true';
  const enableDots = emblaNode.getAttribute(ATTRIBUTES.ENABLE_DOTS) === 'true';
  const enableArrows = emblaNode.getAttribute(ATTRIBUTES.ENABLE_ARROWS) === 'true';
  const initialSlideAttr = emblaNode.getAttribute(ATTRIBUTES.INITIAL_SLIDE);
  const enableKeyboardNav = emblaNode.getAttribute(ATTRIBUTES.ENABLE_KEYBOARD_NAV) === 'true'; // New attribute read

  const options: EmblaOptionsType = {
    loop: dataLoop,
    startIndex: initialSlideAttr ? Math.max(0, Number(initialSlideAttr) - 1) : 0, // Subtract 1 for 0-based index
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
      // Only attempt reset/stop if autoplay plugin exists
      const resetOrStop = autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;
      resetOrStop();
    }
  };

  let removePrevNextBtnsClickHandlers: (() => void) | undefined;
  let removeDotBtnsAndClickHandlers: (() => void) | undefined;
  let removeKeyboardNavHandler: (() => void) | undefined; // New handler for keyboard nav

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

  // NEW: Conditionally add keyboard navigation
  if (enableKeyboardNav) {
    removeKeyboardNavHandler = addKeyboardNavigation(emblaApi, onNavButtonClick, emblaNode);
    emblaApi.on('destroy', removeKeyboardNavHandler);
  }

  // It's good practice to also clean up the Embla instance itself when no longer needed
  // if you have external mechanisms to trigger destruction.
  // Example: return () => emblaApi.destroy(); if this carousel function is called from a lifecycle hook.
  return emblaApi; // Return the API instance for external control (e.g., WordPress Interactivity API)
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

// NEW HELPER FUNCTION FOR KEYBOARD NAVIGATION
const addKeyboardNavigation = (
  emblaApi: EmblaCarouselType,
  onButtonClick: (emblaApi: EmblaCarouselType) => void,
  carouselRootNode: HTMLElement, // Pass the root node to check focus later
): (() => void) => {
  const handleKeyDown = (event: KeyboardEvent): void => {
    // Only respond to keyboard events if the carousel or its children are focused
    // or if you want global keyboard navigation.
    // For specific focus, you might use:
    // if (!carouselRootNode.contains(document.activeElement)) return;
    // For simplicity, we'll allow it if *any* part of the document has focus,
    // but you might want to refine this for accessibility.

    if (event.key === 'ArrowLeft') {
      emblaApi.scrollPrev();
      onButtonClick(emblaApi); // To reset autoplay if applicable
    } else if (event.key === 'ArrowRight') {
      emblaApi.scrollNext();
      onButtonClick(emblaApi); // To reset autoplay if applicable
    }
  };

  document.addEventListener('keydown', handleKeyDown, false);

  return (): void => {
    document.removeEventListener('keydown', handleKeyDown, false);
  };
};
