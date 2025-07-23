export default function lazyloadImages() {
  const images: NodeListOf<HTMLImageElement> = document.querySelectorAll('img.lazy-load-image[data-src-small]');
  if (!images.length) return;

  const loadImages = (image: HTMLImageElement) => {
    const smallSrc = image.getAttribute('data-src-small');
    const largeSrc = image.getAttribute('data-src-large');
    const dataSrcset = image.getAttribute('data-srcset');
    const dataSizes = image.getAttribute('data-sizes');

    if (!smallSrc || !largeSrc) {
      console.warn('Lazy load image missing data attributes:', image);
      return;
    }

    // Load small image first
    image.src = smallSrc;

    // Create a new Image object for the large image
    const largeImage = new Image();
    largeImage.src = largeSrc; // This starts loading the large image

    largeImage.onload = () => {
      // Replace small image with large image when large image is loaded
      image.src = largeSrc; // Set the main src

      // Transfer srcset and sizes if they exist
      if (dataSrcset) {
        image.srcset = dataSrcset;
      }
      if (dataSizes) {
        image.sizes = dataSizes;
      }

      image.classList.add('loaded');

      // Clean up data attributes
      image.removeAttribute('data-src-small');
      image.removeAttribute('data-src-large');
      image.removeAttribute('data-srcset');
      image.removeAttribute('data-sizes');
    };

    largeImage.onerror = () => {
      console.error('Failed to load large image for lazy-load:', largeSrc, image);
      // Fallback or error handling for the user
    };
  };

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image: HTMLImageElement = entry.target as HTMLImageElement;
        loadImages(image);
        observer.unobserve(image);
      }
    });
  }, options);

  images.forEach((image) => {
    observer.observe(image);
  });
}
