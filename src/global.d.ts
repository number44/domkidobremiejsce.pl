declare namespace wp {
  namespace apiFetch {
    function createRootURLMiddleware(root: string): any;
  }
  // Define the shape of your localized data
  interface ApiSettings {
    root: string;
    media_api_url: string;
    nonce: string;
    api_url: string;
    home_url: string;
    theme_url: string;
  }
}

interface TestingI {
  title: string;
  price: number;
  age: number;
}
declare const wpApiSettings: wp.ApiSettings;
