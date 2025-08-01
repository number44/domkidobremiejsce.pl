import { store, getContext, getElement } from "@wordpress/interactivity";
import carousel from "@/scripts/carousel";
import { EmblaCarouselType } from "embla-carousel"; // Import EmblaCarouselType
import { LinkI } from "./types";
interface EmblaCarouselHTMLElement extends HTMLElement {
  emblaApiInstance?: EmblaCarouselType; // Use '?' because it might not be set initially
}

type ServerState = {
  state: {
    isDark: boolean;
    darkText: string;
    lightText: string;
    links: LinkI[];
  };
};

type ContextI = {
  isOpen: boolean;
};

const storeDef = {
  state: {
    get themeText(): string {
      return state.isDark ? state.darkText : state.lightText;
    },
  },
  actions: {
    toggleOpen() {
      const context = getContext<ContextI>();
      context.isOpen = !context.isOpen;
    },
    toggleTheme() {
      state.isDark = !state.isDark;
    },
  },
  callbacks: {
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
        // element.emblaApiInstance?.on('select', callbacks.updateImageSelectedFromEmbla);
      }
      // const emblaApi = element.emblaApiInstance;
      // if (emblaApi && context.imageSelected !== undefined) {
      // Subtract 1 because Embla is 0-indexed, and your data is 1-indexed
      // const targetIndex = Math.max(0, Number(context.imageSelected) - 1);
      // if (emblaApi.selectedScrollSnap() !== targetIndex) {
      //   emblaApi.scrollTo(targetIndex);
      // }
      // }
    },
    logIsOpen: () => {
      const { isOpen } = getContext<ContextI>();
      // Log the value of `isOpen` each time it changes.
    },
    init: () => {
      console.log("state", JSON.parse(JSON.stringify(state)));
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state } = store<Store>("domki-hero", storeDef);
