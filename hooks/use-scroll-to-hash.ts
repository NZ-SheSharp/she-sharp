import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToElement = (element: Element) => {
      const yOffset = -80; // Navigation bar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      console.log('[ScrollToHash] Scrolling to element:', element, 'at position:', y);
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const handleScrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      console.log('[ScrollToHash] Looking for element with hash:', hash);

      // First attempt - element might already exist
      const element = document.querySelector(hash);
      if (element) {
        console.log('[ScrollToHash] Element found immediately');
        scrollToElement(element);
        return;
      }

      console.log('[ScrollToHash] Element not found, setting up observer');

      // Set up MutationObserver to watch for the element
      let observer: MutationObserver | null = null;
      let timeoutId: NodeJS.Timeout | null = null;

      const startObserving = () => {
        observer = new MutationObserver((mutations, obs) => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            console.log('[ScrollToHash] Element found by observer');
            obs.disconnect();
            if (timeoutId) clearTimeout(timeoutId);
            
            // Wait for any animations/transitions to start
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                scrollToElement(targetElement);
              });
            });
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['id']
        });

        // Stop observing after 10 seconds
        timeoutId = setTimeout(() => {
          if (observer) observer.disconnect();
        }, 10000);
      };

      // Wait for images to load as they might affect layout
      if (document.readyState === 'complete') {
        startObserving();
      } else {
        window.addEventListener('load', startObserving, { once: true });
      }

      // Cleanup function
      return () => {
        if (observer) observer.disconnect();
        if (timeoutId) clearTimeout(timeoutId);
      };
    };

    // Run on mount and when pathname changes
    const cleanup = handleScrollToHash();

    // Also handle hash changes on the same page
    window.addEventListener('hashchange', handleScrollToHash);

    return () => {
      if (cleanup) cleanup();
      window.removeEventListener('hashchange', handleScrollToHash);
    };
  }, [pathname]);
}