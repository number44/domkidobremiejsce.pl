/**
 * WordPress dependencies
 */
import { store, getContext, getElement } from "@wordpress/interactivity";
import carousel from "@/scripts/carousel";
import { EmblaCarouselType } from "embla-carousel";

interface EmblaCarouselHTMLElement extends HTMLElement {
  emblaApiInstance?: EmblaCarouselType;
}

type ServerState = {
  state: {};
};

type ContextI = {
  imageSelected: number;
  showCarousel: boolean;
  slidingGallery: GalleryI;
  moreList: any[];
  moreimg: number;
  per_page: number;
  page: number;
  loading: boolean; // Add this line
  image: {
    selected: number;
  };
};

interface GalleryI {
  title: string;
  order_by: number;
  images: string;
  api: string;
  media_ids: number[];
}

const storeDef = {
  state: {},
  actions: {
    handleMore() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.page++;
      context.loading = true; // Add this line
    },

    openCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;

      const element = getElement();
      if (!element || !element.ref) return;

      const elem: HTMLElement | null = element.ref;
      if (!elem) return;

      const mediaId = elem.dataset.media_id;
      if (!mediaId) return;

      const indexOfMedia = context.slidingGallery.media_ids.indexOf(Number(mediaId));
      if (indexOfMedia === -1) return;

      // Set to 1-based index for consistency with carousel
      context.imageSelected = indexOfMedia + 1;
      context.showCarousel = true;
    },

    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = false;
    },
  },

  callbacks: {
    handleMore() {
      const context = getContext<ContextI>();
      if (!context) return;
      if (context.page === 0) return;

      const difference = context.slidingGallery.media_ids.slice(context.slidingGallery.images.split(",").length);
      const chunkedDifference = Array.from(chunks(difference, context.per_page));

      const chunkedDifferencePaginated = chunkedDifference
        .slice(0, context.page)
        .reduce((acc, val) => acc.concat(val), []);

      context.moreList = chunkedDifferencePaginated;
      context.loading = false; // Add this line
    },

    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = false;
    },

    initCarousel() {
      const element = getElement();
      if (!element || !element.ref) return;

      const context = getContext<ContextI>();
      if (!context) return;

      const carouselElement: EmblaCarouselHTMLElement | null = element.ref;
      if (!carouselElement) return;

      // Fix: Only initialize if not already initialized
      if (!carouselElement.emblaApiInstance) {
        console.log("Initializing carousel with keyboard nav enabled"); // Debug log
        carouselElement.emblaApiInstance = carousel(carouselElement);

        if (carouselElement.emblaApiInstance) {
          // Fix: Better event handling for slide changes
          carouselElement.emblaApiInstance.on("select", () => {
            callbacks.updateImageSelectedFromEmbla();
          });

          // Fix: Handle reInit events
          carouselElement.emblaApiInstance.on("reInit", () => {
            callbacks.updateImageSelectedFromEmbla();
          });

          // Additional debug info
          console.log("Carousel initialized successfully", {
            slideCount: carouselElement.emblaApiInstance.slideNodes().length,
            canScrollPrev: carouselElement.emblaApiInstance.canScrollPrev(),
            canScrollNext: carouselElement.emblaApiInstance.canScrollNext(),
          });
        }
      }

      const emblaApi = carouselElement.emblaApiInstance;
      if (emblaApi && context.imageSelected !== undefined) {
        // Fix: Better synchronization with context
        const targetIndex = Math.max(0, Number(context.imageSelected) - 1);
        const currentIndex = emblaApi.selectedScrollSnap();

        if (currentIndex !== targetIndex) {
          // Fix: Use setTimeout to ensure DOM is ready
          setTimeout(() => {
            emblaApi.scrollTo(targetIndex, true);
          }, 0);
        }
      }
    },

    updateImageSelectedFromEmbla: () => {
      const element = getElement();
      if (!element || !element.ref) return;

      const context = getContext<ContextI>();
      if (!context) return;

      const carouselElement: EmblaCarouselHTMLElement | null = element.ref;
      if (!carouselElement || !carouselElement.emblaApiInstance) return;

      const emblaApi = carouselElement.emblaApiInstance;
      // Fix: Add 1 to convert from 0-based to 1-based index
      const newIndex = emblaApi.selectedScrollSnap() + 1;

      // Fix: Only update if actually different to prevent loops
      if (context.imageSelected !== newIndex) {
        context.imageSelected = newIndex;
      }
    },

    detectKeys: (event: KeyboardEvent) => {
      const context = getContext<ContextI>();
      if (!context) return;

      console.log("Key detected:", event.key); // Debug log

      if (event.key === "Escape") {
        callbacks.closeCarousel();
        return;
      }

      // Note: Arrow key handling is now done by the carousel's built-in keyboard navigation
      // We don't need to handle it here to avoid double navigation
    },

    initMoreImg: async () => {
      const context = getContext<ContextI>();
      if (!context) return;

      const element = getElement();
      if (!element || !element.ref) return;

      const elem: HTMLElement | null = element.ref;
      if (!elem) return;

      let media_id = context.moreimg;
      if (!media_id) return;

      const url = wpApiSettings.root + "wp/v2/media/" + media_id;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const media = await response.json();
        if (!media) return;

        const imageUrl = media.media_details?.sizes?.medium?.source_url;
        if (!imageUrl) return;

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = media.alt_text || "Domki dobre miejsce - zdjęcie";
        elem.innerHTML = "";
        elem.appendChild(image);
      } catch (err) {
        console.error("Error loading image:", err);
      }
    },

    showButton: () => {
      const context = getContext<ContextI>();
      if (!context || !context.slidingGallery) return false;

      // Calculate how many images are currently visible
      const visibleImagesCount = context.slidingGallery.images.split(",").length;

      // Calculate how many more images have been loaded via "Load More"
      const loadedMoreImagesCount = context.moreList ? context.moreList.length : 0;

      // Total currently displayed images
      const totalDisplayedImages = visibleImagesCount + loadedMoreImagesCount;

      // Total available images in the gallery
      const totalAvailableImages = context.slidingGallery.media_ids.length;

      console.log("showButton check:", {
        visibleImagesCount,
        loadedMoreImagesCount,
        totalDisplayedImages,
        totalAvailableImages,
        hasMoreImages: totalDisplayedImages < totalAvailableImages,
      });

      // Show button only if there are more images to load
      return totalDisplayedImages < totalAvailableImages;
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state, actions, callbacks } = store<Store>("domki-area", storeDef);

function* chunks<T extends number[]>(arr: T, n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
