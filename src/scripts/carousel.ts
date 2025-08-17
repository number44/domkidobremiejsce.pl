import EmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";

// Define constants for selectors
const SELECTORS = {
  VIEWPORT: ".embla__viewport",
  PREV_BUTTON: ".embla__button--prev",
  NEXT_BUTTON: ".embla__button--next",
  DOTS_CONTAINER: ".embla__dots",
  DOT_BUTTON: "embla__dot",
  DOT_SELECTED_CLASS: "embla__dot--selected",
};

// Define attribute names
const ATTRIBUTES = {
  AUTOPLAY_DELAY: "data-carousel-autoplay",
  LOOP: "data-carousel-loop",
  ENABLE_DOTS: "data-carousel-dots",
  ENABLE_ARROWS: "data-carousel-arrows",
  INITIAL_SLIDE: "data-carousel-initial",
  ENABLE_KEYBOARD_NAV: "data-carousel-keyboard-nav",
};

export default function carousel(emblaNode: HTMLElement | null) {
  if (!emblaNode) {
    console.warn("Embla Carousel: Root node not provided.");
    return;
  }

  const viewportNode = emblaNode.querySelector(SELECTORS.VIEWPORT) as HTMLElement | null;
  const prevBtnNode = emblaNode.querySelector(SELECTORS.PREV_BUTTON) as HTMLElement | null;
  const nextBtnNode = emblaNode.querySelector(SELECTORS.NEXT_BUTTON) as HTMLElement | null;
  const dotsNode = emblaNode.querySelector(SELECTORS.DOTS_CONTAINER) as HTMLElement | null;

  if (!viewportNode) {
    console.error("Embla Carousel: Viewport element not found.", {
      rootNode: emblaNode,
      selector: SELECTORS.VIEWPORT,
    });
    return;
  }

  // Get attributes
  const dataAutoplayAttr = emblaNode.getAttribute(ATTRIBUTES.AUTOPLAY_DELAY);
  const dataLoop = emblaNode.getAttribute(ATTRIBUTES.LOOP) === "true";
  const enableDots = emblaNode.getAttribute(ATTRIBUTES.ENABLE_DOTS) === "true";
  const enableArrows = emblaNode.getAttribute(ATTRIBUTES.ENABLE_ARROWS) === "true";
  const initialSlideAttr = emblaNode.getAttribute(ATTRIBUTES.INITIAL_SLIDE);
  const enableKeyboardNav = emblaNode.getAttribute(ATTRIBUTES.ENABLE_KEYBOARD_NAV) === "true";

  // Fix: Better calculation for initial slide
  let startIndex = 0;
  if (initialSlideAttr) {
    const parsed = parseInt(initialSlideAttr, 10);
    if (!isNaN(parsed) && parsed > 0) {
      startIndex = parsed - 1; // Convert from 1-based to 0-based
    }
  }

  const options: EmblaOptionsType = {
    loop: dataLoop,
    startIndex: startIndex,
    // Fix: Add these options for better loop behavior
    containScroll: "trimSnaps",
    dragFree: false,
    // Fix: Ensure slides align properly
    align: "start",
  };

  const plugins = [];

  // Conditionally add Autoplay plugin
  if (dataAutoplayAttr !== null) {
    const autoplayDelay = Number(dataAutoplayAttr) || 3000;
    plugins.push(
      Autoplay({
        delay: autoplayDelay,
        stopOnInteraction: false,
        // Fix: Don't jump on init to prevent conflicts with startIndex
        jump: false,
      }),
    );
  }

  // Fix: Store the API instance globally on the element for external access
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
  let removeKeyboardNavHandler: (() => void) | undefined;

  // Conditionally add arrow functionality
  if (enableArrows && prevBtnNode && nextBtnNode) {
    removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtnNode,
      nextBtnNode,
      onNavButtonClick,
    );
    emblaApi.on("destroy", removePrevNextBtnsClickHandlers);
  }

  // Conditionally add dots functionality
  if (enableDots && dotsNode) {
    removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode, onNavButtonClick);
    emblaApi.on("destroy", removeDotBtnsAndClickHandlers);
  }

  // Fix: Improved keyboard navigation
  if (enableKeyboardNav) {
    removeKeyboardNavHandler = addKeyboardNavigation(emblaApi, onNavButtonClick, emblaNode);
    emblaApi.on("destroy", removeKeyboardNavHandler);
  }

  // Fix: Wait for initial render before scrolling to initial position
  emblaApi.on("init", () => {
    if (startIndex > 0) {
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        emblaApi.scrollTo(startIndex, true); // true = immediate, no animation
      });
    }
  });

  return emblaApi;
}

// Fix: Improved toggle function for prev/next buttons
const addTogglePrevNextBtnsActive = (
  emblaApi: EmblaCarouselType,
  prevBtn: HTMLElement,
  nextBtn: HTMLElement,
): (() => void) => {
  const togglePrevNextBtnsState = (): void => {
    // Fix: For looping carousels, buttons should always be enabled
    if (emblaApi.canScrollPrev()) {
      prevBtn.removeAttribute("disabled");
    } else {
      prevBtn.setAttribute("disabled", "disabled");
    }

    if (emblaApi.canScrollNext()) {
      nextBtn.removeAttribute("disabled");
    } else {
      nextBtn.setAttribute("disabled", "disabled");
    }
  };

  emblaApi
    .on("select", togglePrevNextBtnsState)
    .on("init", togglePrevNextBtnsState)
    .on("reInit", togglePrevNextBtnsState);

  return (): void => {
    prevBtn.removeAttribute("disabled");
    nextBtn.removeAttribute("disabled");
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

  prevBtn.addEventListener("click", scrollPrev, false);
  nextBtn.addEventListener("click", scrollNext, false);

  const removeTogglePrevNextBtnsActive = addTogglePrevNextBtnsActive(emblaApi, prevBtn, nextBtn);

  return (): void => {
    removeTogglePrevNextBtnsActive();
    prevBtn.removeEventListener("click", scrollPrev, false);
    nextBtn.removeEventListener("click", scrollNext, false);
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
      .join("");

    const scrollTo = (index: number): void => {
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    };

    dotNodes = Array.from(dotsNode.querySelectorAll(`.${SELECTORS.DOT_BUTTON}`));
    dotNodes.forEach((dotNode, index) => {
      dotNode.addEventListener("click", () => scrollTo(index), false);
    });
  };

  const toggleDotBtnsActive = (): void => {
    if (!dotNodes || dotNodes.length === 0) return;

    const previous = emblaApi.previousScrollSnap();
    const selected = emblaApi.selectedScrollSnap();

    // Remove active class from all dots first
    dotNodes.forEach((dot) => dot.classList.remove(SELECTORS.DOT_SELECTED_CLASS));

    // Add active class to current dot
    if (dotNodes[selected]) {
      dotNodes[selected].classList.add(SELECTORS.DOT_SELECTED_CLASS);
    }
  };

  emblaApi
    .on("init", addDotBtnsWithClickHandlers)
    .on("reInit", addDotBtnsWithClickHandlers)
    .on("init", toggleDotBtnsActive)
    .on("reInit", toggleDotBtnsActive)
    .on("select", toggleDotBtnsActive);

  return (): void => {
    dotsNode.innerHTML = "";
  };
};

// Fix: Improved keyboard navigation with better focus handling
const addKeyboardNavigation = (
  emblaApi: EmblaCarouselType,
  onButtonClick: (emblaApi: EmblaCarouselType) => void,
  carouselRootNode: HTMLElement,
): (() => void) => {
  const handleKeyDown = (event: KeyboardEvent): void => {
    // Check if carousel modal is open by looking for the active class
    const galleryModal = document.querySelector(".gallery-modal.is-active");
    if (!galleryModal) return;

    // Only handle arrow keys
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    // Check if this carousel is the active one in the modal
    const activeCarouselSlider = galleryModal.querySelector(".gallery_slider:not(.hide)");
    if (!activeCarouselSlider || !activeCarouselSlider.contains(carouselRootNode)) return;

    // Prevent default behavior and stop propagation to avoid double handling
    event.preventDefault();
    event.stopPropagation();

    console.log("Carousel keyboard navigation:", event.key); // Debug log

    if (event.key === "ArrowLeft") {
      emblaApi.scrollPrev();
      onButtonClick(emblaApi);
    } else if (event.key === "ArrowRight") {
      emblaApi.scrollNext();
      onButtonClick(emblaApi);
    }
  };

  // Add event listener to document for global keyboard handling with capture
  document.addEventListener("keydown", handleKeyDown, true);

  return (): void => {
    document.removeEventListener("keydown", handleKeyDown, true);
  };
};
