import { useEffect } from 'react';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical resources after initial paint
    const preloadCriticalResources = () => {
      // Preload Razorpay only when payment might be needed
      const preloadRazorpay = () => {
        if (!window.Razorpay && !document.querySelector('script[src*="razorpay"]')) {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = 'https://checkout.razorpay.com/v1/checkout.js';
          link.as = 'script';
          document.head.appendChild(link);
        }
      };

      // Defer non-critical resource preloading
      setTimeout(preloadRazorpay, 2000);
    };

    // Optimize font loading
    const optimizeFonts = () => {
      // Add font-display: swap to reduce blocking
      const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
      fontLinks.forEach(link => {
        if (link instanceof HTMLLinkElement) {
          const href = link.href;
          if (!href.includes('display=swap')) {
            link.href = href.includes('?') ? `${href}&display=swap` : `${href}?display=swap`;
          }
        }
      });
    };

    // Implement intersection observer for lazy loading
    const setupLazyLoading = () => {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px'
      });

      // Observe all images with data-src
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    };

    // Run optimizations after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        preloadCriticalResources();
        optimizeFonts();
        setupLazyLoading();
      });
    } else {
      preloadCriticalResources();
      optimizeFonts();
      setupLazyLoading();
    }

    // Cleanup on unmount
    return () => {
      // Remove any event listeners if needed
    };
  }, []);

  return <>{children}</>;
}