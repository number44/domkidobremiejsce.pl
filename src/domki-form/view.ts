/**
 * WordPress dependencies
 */
import { store, getContext } from '@wordpress/interactivity';
import { FormEvent } from 'react';

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

      if (!formData.get('firstname')) {
        context.errorFirstname = true;
        return;
      } else {
        context.errorFirstname = false;
      }
      if (!formData.get('email')) {
        context.errorEmail = true;
        return;
      } else {
        context.errorEmail = false;
      }
      if (!formData.get('message')) {
        context.errorMessage = true;
        return;
      } else {
        context.errorMessage = false;
      }
      if (!formData.get('consent')) {
        context.errorConsent = true;
        return;
      } else {
        context.errorConsent = false;
      }
      context.loading = true;

      const data: FormDataI = {
        firstname: formData.get('firstname') as string,
        email: formData.get('email') as string,
        phone: formData.get('phone') as string,
        message: formData.get('message') as string,
      };

      console.log('data', data);
      console.log('data', JSON.parse(JSON.stringify(data)));

      console.log('wpApi', JSON.parse(JSON.stringify(wpApiSettings.root)));
      try {
        const response = await fetch(wpApiSettings.root + 'lesio_theme_api/v1/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        console.log('json', JSON.parse(JSON.stringify(json)));
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
        console.log('error', error);
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
      console.log(`Is open: ${isOpen}`);
    },
  },
};

type Store = ServerState & typeof storeDef;

const { state } = store<Store>('domki-form', storeDef);

interface FormDataI {
  firstname: string;
  email: string;
  phone: string;
  message: string;
  consent?: boolean;
}
