interface GoogleConsentData {
  cookieName: string;
  cookieDuration: number;
}

declare const googleConsentData: GoogleConsentData;
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

function googleConsentInit() {
  const acceptButton = document.getElementById("accept-consent") as HTMLButtonElement | null;
  const declineButton = document.getElementById("decline-consent") as HTMLButtonElement | null;
  const banner = document.getElementById("consent-banner") as HTMLDivElement | null;

  if (banner) {
    // Function to hide the banner
    const hideBanner = () => {
      banner.style.display = "none";
    };

    // Handle the accept button click
    if (acceptButton) {
      acceptButton.addEventListener("click", () => {
        hideBanner();

        // Set the consent cookie
        const cookieName = googleConsentData.cookieName;
        const cookieDuration = googleConsentData.cookieDuration;
        const d = new Date();
        d.setTime(d.getTime() + cookieDuration * 24 * 60 * 60 * 1000);
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cookieName}=true;${expires};path=/`;

        // Update Google Consent Mode settings
        if (window.gtag) {
          window.gtag("consent", "update", {
            ad_user_data: "granted",
            ad_personalization: "granted",
            ad_storage: "granted",
            analytics_storage: "granted",
          });
        }
      });
    }

    // Handle the decline button click
    if (declineButton) {
      declineButton.addEventListener("click", () => {
        hideBanner();
      });
    }
  }
}

export default googleConsentInit;
