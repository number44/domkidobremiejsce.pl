import { store, getContext, getElement } from "@wordpress/interactivity";
import carousel from "@/scripts/carousel";
import { EmblaCarouselType } from "embla-carousel"; // Import EmblaCarouselType
interface EmblaCarouselHTMLElement extends HTMLElement {
  emblaApiInstance?: EmblaCarouselType; // Use '?' because it might not be set initially
}
type ContextI = {
  isOpen: boolean;
  active: number;
  showCarousel: boolean;
  slidingGalleries: GalleryI[];
  initMoreImg: number;
  moreList: number[];
  moreimg: number;
  per_page: number;
  page: number;
  loading: boolean;
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
    handleMore() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.page++;
      context.loading = true;
    },
    openCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      const { ref } = getElement();
      if (!ref) return;

      const elem: HTMLElement | null = ref;
      if (!elem) return;

      // get data-media_id value
      const mediaId = elem.dataset.media_id;
      if (!mediaId) return;

      const selectedGallery = context.slidingGalleries.find((gallery) => gallery.order_by === context.active);
      if (!selectedGallery) return;
      const indexOfMedia = selectedGallery.media_ids.indexOf(Number(mediaId));
      if (indexOfMedia === -1) return;
      context.imageSelected = indexOfMedia + 1;

      context.showCarousel = !context.showCarousel;

      // context.imageSelected = context.image.selected;
      // context.showCarousel = !context.showCarousel;
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
      context.moreList = [];
      context.page = 0;
      let weekFromToday = new Date();
      weekFromToday.setDate(weekFromToday.getDate() + 7);
      document.cookie = `gallery_active=${context.active};expires=${weekFromToday.toUTCString()}`.trim();
    },
  },
  callbacks: {
    handleMore() {
      const context = getContext<ContextI>();
      if (!context) return;
      if (context.page === 0) return;
      const selectedGallery = context.slidingGalleries.find((gallery) => gallery.order_by === context.active);
      if (!selectedGallery) return;

      const difference = selectedGallery.media_ids.slice(selectedGallery.images.split(",").length);
      const chunkedDifference = Array.from(chunks(difference, context.per_page));

      const chunkedDifferencePaginated = chunkedDifference
        .slice(0, context.page)
        .reduce((acc, val) => acc.concat(val), []);

      context.moreList = chunkedDifferencePaginated;
      context.loading = false;
    },
    closeCarousel() {
      const context = getContext<ContextI>();
      if (!context) return;
      context.showCarousel = false;
    },
    getMoreImages() {
      const context = getContext<ContextI>();
      if (!context) return;
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
        element.emblaApiInstance?.on("select", callbacks.updateImageSelectedFromEmbla);
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

      if (event.key === "Escape") {
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
    initMoreImg: async () => {
      const context = getContext<ContextI>();
      if (!context) return;
      const elem: HTMLElement | null = getElement().ref;
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
        image.alt = media.alt_text || "Domki dobre miejsce - zdjÄ™cie";
        elem.innerHTML = "";
        elem.appendChild(image);
      } catch (err) {
        throw err;
      } finally {
      }
    },
    showButton: () => {
      const context = getContext<ContextI>();
      if (!context) return false;

      const selectedGallery = context.slidingGalleries.find((gallery) => gallery.order_by === context.active);
      if (!selectedGallery) return false;

      // Calculate how many images are currently visible
      const visibleImagesCount = selectedGallery.images.split(",").length;

      // Calculate how many more images have been loaded via "Load More"
      const loadedMoreImagesCount = context.moreList.length;

      // Total currently displayed images
      const totalDisplayedImages = visibleImagesCount + loadedMoreImagesCount;

      // Total available images in the gallery
      const totalAvailableImages = selectedGallery.media_ids.length;

      // Show button only if there are more images to load
      return totalDisplayedImages < totalAvailableImages;
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state, actions, callbacks } = store<Store>("domki-galleries", storeDef);

interface GalleryI {
  title: string;
  order_by: number;
  images: string;
  api: string;
  media_ids: number[];
}
function* chunks<T extends number[]>(arr: T, n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}
