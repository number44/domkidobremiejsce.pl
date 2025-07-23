/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';
import carousel from '@/scripts/carousel';
import { EmblaCarouselType } from 'embla-carousel'; // Import EmblaCarouselType
interface EmblaCarouselHTMLElement extends HTMLElement {
  emblaApiInstance?: EmblaCarouselType; // Use '?' because it might not be set initially
}
type ContextI = {
  isOpen: boolean;
  active: number;
  showCarousel: boolean;
  switcher: {
    active: number;
  };
  image: {
    selected: number;
  };
  gallery: {
    order_by: number;
  };
  imageSelected: number;
};
type ServerState = {};
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
    toggleOpen() {
      const context = getContext<ContextI>();
      context.isOpen = !context.isOpen;
    },

    handleSwitch() {
      const context = getContext<ContextI>();
      const { ref } = getElement();
      if (!ref || !context) return;
      const elem: HTMLElement | null = ref;
      if (!elem) return;
      context.active = context.switcher.active;

      let weekFromToday = new Date();
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      document.cookie = `gallery_active=${context.active};expires=${weekFromToday.toUTCString()}`.trim();
    },
  },
  callbacks: {
    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = !context.showCarousel;
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

    showGallery: () => {
      const context = getContext<ContextI>();
      if (!context) return;
      if (+context.gallery.order_by === +context.active) {
        return true;
      }
      return false;
    },
    isActive: () => {
      const context = getContext<ContextI>();
      if (!context) return;
      if (+context.active === +context.switcher.active) {
        return true;
      }
      return false;
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state, actions, callbacks } = store<Store>('domki-galleries', storeDef);
