import { store, getContext, getElement } from "@wordpress/interactivity";

type ServerState = {
  state: {
    progress: number;
    isMenuOpen: boolean;
    links: any[];
  };
};

interface ContextI {
  isOpen: boolean;
  socialType: string;
  facebook: string;
  instagram: string;
  isMobileMenuOpen: boolean;
  isMenuFixed: boolean;
}
const storeDef = {
  state: {
    progress: 0,
    isMenuOpen: false,
  },
  actions: {
    closeMobileMenu() {
      const context = getContext<ContextI>();
      context.isMobileMenuOpen = false;
    },
    closeMenuOpen() {
      const context = getContext<ContextI>();
      // context.isOpen = false;
    },
    openMobileMenu() {
      const context = getContext<ContextI>();
      context.isMobileMenuOpen = true;
    },
    toggleMenuOpen() {
      const context = getContext<ContextI>();
      const { ref } = getElement();
      if (!ref) {
        console.warn("Ref is null or undefined.");
        return;
      }
      const elem: HTMLElement | null = ref;
      if (!elem) {
        console.warn("Element is null after ref check.");
        return;
      }
      // Set menu to open
      context.isOpen = true;

      // --- Handlers for closing the menu ---

      // Function to close the menu and remove all listeners
      const closeMenuAndCleanup = () => {
        if (context.isOpen) {
          // Only close if it's currently open
          context.isOpen = false;
          document.removeEventListener("click", handleClickOutside);
          document.removeEventListener("scroll", handleScroll);
          document.removeEventListener("keydown", handleEscapeKey);
          const menuFixedIcon: HTMLElement | null = elem.querySelector(".menu-fixed-icon");
          if (menuFixedIcon) {
            menuFixedIcon.removeEventListener("click", handleMenuFixedIconClick);
          }
        }
      };

      // Click outside handler
      const handleClickOutside = (e: MouseEvent) => {
        // Check if the clicked element is NOT the menu itself and NOT a descendant of the menu
        if (elem && !elem.contains(e.target as Node)) {
          closeMenuAndCleanup();
        }
      };

      // Scroll handler
      const handleScroll = () => {
        closeMenuAndCleanup();
      };

      // Escape key handler
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" || e.key === "Esc") {
          // 'Esc' for older browsers
          closeMenuAndCleanup();
        }
      };

      // --- Add event listeners ---
      const handleMenuFixedIconClick = (e: MouseEvent) => {
        // Prevent the click from bubbling up to document and being caught by handleClickOutside
        e.stopPropagation();
        closeMenuAndCleanup();
      };
      // Use setTimeout to allow the current click event (that opened the menu) to propagate
      // before listening for outside clicks. This prevents immediate closing.
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("scroll", handleScroll, { passive: true }); // Use passive for scroll for performance
        document.addEventListener("keydown", handleEscapeKey);
        const menuFixedIcon: HTMLElement | null = elem.querySelector(".menu-fixed-icon");
        if (menuFixedIcon) {
          menuFixedIcon.addEventListener("click", handleMenuFixedIconClick);
        }
      }, 0);
    },
    redirectToSocial: (e: Event) => {
      e.preventDefault();
      const context = getContext<ContextI>(); // Get the local context for the clicked element
      const { ref } = getElement();
      if (!ref) return;
      const link: HTMLElement | null = ref;
      if (!link) return;
      const socialType = context.socialType;
      if (socialType != "instagram" && socialType != "facebook") return;

      let facebookAppUrl = `fb://page/${context.facebook}`;
      let facebookWebUrl = `https://www.facebook.com/${context.facebook}`;
      let instagramAppUrl = `instagram://user?username=${context.instagram}`;
      let instagramWebUrl = `https://www.instagram.com/${context.instagram}`;

      let webUrl = "";
      let appUrl = "";

      if (socialType === "facebook") {
        webUrl = facebookWebUrl;
        appUrl = facebookAppUrl;
      } else if (socialType === "instagram") {
        webUrl = instagramWebUrl;
        appUrl = instagramAppUrl;
      }

      // Attempt to open the app
      window.location.href = appUrl;

      // Set a timeout to fallback to the web URL if the app doesn't open
      const appFallbackTimeout = setTimeout(() => {
        window.location.href = webUrl;
      }, 250); // Increased delay slightly

      // Optional: Try to clear the timeout if the app is launched
      // This is still heuristic but slightly better than nothing.
      window.addEventListener(
        "blur",
        () => {
          clearTimeout(appFallbackTimeout);
        },
        { once: true },
      );
    },
  },
  callbacks: {
    init() {
      callbacks.handleScroll();
    },
    scrollFoo() {
      const context: ContextI = getContext();
      const { ref } = getElement();
    },
    watchMobileMenu: () => {
      const context: ContextI = getContext();
      if (!context) return;
      document.body.style.overflowY = "hidden!important";
      if (context.isMobileMenuOpen) {
      } else {
        document.body.style.overflow = "auto";
      }
    },
    handleScroll: () => {
      const context: ContextI = getContext();
      if (!context) return;

      const { ref } = getElement();
      if (!ref) return;

      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const block = ref;
      const header: HTMLElement | null = block.querySelector(".menu-fixed");
      if (!header) return;
      const indicator: HTMLElement | null = block.querySelector(".indicator-container");
      if (!indicator) return;
      const progress: HTMLElement | null = indicator.querySelector(".indicator");
      if (!progress) return;
      progress.style.width = `${scrolled}%`;
      if (scrolled > 5) {
        header.classList.add("show-menu-fixed");
      } else {
        header.classList.remove("show-menu-fixed");
      }
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state, callbacks } = store<Store>("domki-navbar", storeDef);
