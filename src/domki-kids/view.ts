/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';
import carousel from '@/scripts/carousel';
import { EmblaCarouselType } from 'embla-carousel'; // Import EmblaCarouselType
interface EmblaCarouselHTMLElement extends HTMLElement {
  emblaApiInstance?: EmblaCarouselType; // Use '?' because it might not be set initially
}

type ServerState = {
  state: {};
};

type ContextI = {
  imageSelected: number;
  showCarousel: boolean;
  image: {
    selected: number;
  };
};

const storeDef = {
  state: {},
  actions: {
    openCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.imageSelected = context.image.selected;
      context.showCarousel = !context.showCarousel;
    },
    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = !context.showCarousel;
    },
  },
  callbacks: {
    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = false;
    },
    initCarousel() {
      const { ref } = getElement();
      if (!ref) return;
      const context = getContext<ContextI>();
      if (!context) return;
      const element: EmblaCarouselHTMLElement | null = ref;
      if (!element) return;
      if (!element.emblaApiInstance) {
        // Pass the root Embla node
        element.emblaApiInstance = carousel(element);
        // Optional: Listen for Embla's slide changes and update the context
        element.emblaApiInstance?.on('select', callbacks.updateImageSelectedFromEmbla);
      }
      const emblaApi = element.emblaApiInstance;
      if (emblaApi && context.imageSelected !== undefined) {
        // Subtract 1 because Embla is 0-indexed, and your data is 1-indexed
        const targetIndex = Math.max(0, Number(context.imageSelected) - 1);
        if (emblaApi.selectedScrollSnap() !== targetIndex) {
          emblaApi.scrollTo(targetIndex, true);
        }
      }
    },

    updateImageSelectedFromEmbla: () => {
      const { ref } = getElement();
      if (!ref) return;
      const context = getContext<ContextI>();
      if (!context) return;
      const element: EmblaCarouselHTMLElement | null = ref;
      if (!element) return;
      // 2. Cast the element to your new interface here as well
      const emblaApi = element.emblaApiInstance;
      if (emblaApi) {
        context.imageSelected = emblaApi.selectedScrollSnap() + 1;
      }
    },

    detectKeys: (event: KeyboardEvent) => {
      const context = getContext<ContextI>();
      if (!context) return;

      if (event.key === 'Escape') {
        // context.showCarousel = false;
        callbacks.closeCarousel();
      }
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state, callbacks } = store<Store>('domki-kids', storeDef);
