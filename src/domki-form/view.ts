/**
 * WordPress dependencies
 */
import { getHeaders, getNonceHeaders } from "@/helpers/http";
import { store, getContext } from "@wordpress/interactivity";
import { FormEvent } from "react";

type ServerState = {
  state: {
    isDark: boolean;
    darkText: string;
    lightText: string;
  };
};

interface ContextI {
  isOpen: boolean;
  loading: boolean;
  errorFirstname: boolean;
  errorEmail: boolean;
  errorMessage: boolean;
  errorConsent: boolean;
  success: boolean;
  logo_id: number;
}

const storeDef = {
  state: {
    get themeText(): string {
      return state.isDark ? state.darkText : state.lightText;
    },
  },
  actions: {
    handleSubmit: async (event: FormEvent) => {
      event.preventDefault();
      const context = getContext<ContextI>();
      if (!context) return;
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      // const data: Record<string, FormDataEntryValue> = {}; // Explicit type for data object
      // for (const [key, value] of formData.entries()) {
      //   data[key] = value;
      // }

      if (!formData.get("firstname")) {
        context.errorFirstname = true;
        return;
      } else {
        context.errorFirstname = false;
      }
      if (!formData.get("email")) {
        // check if is valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.get("email") as string)) {
          context.errorEmail = true;
          return;
        } else {
          context.errorEmail = false;
        }
      } else {
        context.errorEmail = false;
      }
      if (!formData.get("message")) {
        context.errorMessage = true;
        return;
      } else {
        context.errorMessage = false;
      }
      if (!formData.get("consent")) {
        context.errorConsent = true;
        return;
      } else {
        context.errorConsent = false;
      }
      context.loading = true;

      const data: FormDataI = {
        firstname: formData.get("firstname") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        message: formData.get("message") as string,
        logo_id: context.logo_id,
      };

      let url = wpApiSettings.root + "lesio_theme_api/v1/message";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "X-WP-Nonce": wpApiSettings.nonce,
            "Content-Type": "application/json", // Add this
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          context.loading = false;
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        if (json.status >= 200 && json.status < 300) {
          context.success = true;
          setTimeout(() => {
            context.success = false;
          }, 3000);
        }
        context.loading = false;
        context.success = true;
        form.reset();
      } catch (error) {
        console.error("error", error);
      } finally {
        context.loading = false;
      }
    },
    toggleOpen() {
      const context = getContext<ContextI>();
      context.isOpen = !context.isOpen;
    },
    toggleTheme() {
      state.isDark = !state.isDark;
    },
  },
  callbacks: {
    logIsOpen: () => {
      const { isOpen } = getContext<ContextI>();
      // Log the value of `isOpen` each time it changes.
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state } = store<Store>("domki-form", storeDef);

interface FormDataI {
  firstname: string;
  email: string;
  phone: string;
  message: string;
  consent?: boolean;
  logo_id: number;
}
