import { useState, useEffect } from 'react';

interface MobileReadingProgressProps {
  className?: string;
}

export default function MobileReadingProgress({ className = '' }: MobileReadingProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = (scrollTop / documentHeight) * 100;
      
      setProgress(Math.min(Math.max(scrollPercentage, 0), 100));
    };

    const throttledCalculateProgress = () => {
      requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener('scroll', throttledCalculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', throttledCalculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 left-0 right-0 z-50 ${className}`}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <style>{`
        @media (max-width: 767px) {
          .reading-progress {
            display: block;
          }
        }
        
        @media (min-width: 768px) {
          .reading-progress {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}