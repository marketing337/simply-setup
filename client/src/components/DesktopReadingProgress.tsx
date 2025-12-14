import { useState, useEffect } from 'react';
import { Clock, BookOpen, TrendingUp } from 'lucide-react';

interface DesktopReadingProgressProps {
  content: string;
  className?: string;
}

export default function DesktopReadingProgress({ content, className = '' }: DesktopReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [wordsRead, setWordsRead] = useState(0);

  useEffect(() => {
    // Calculate reading time and word count
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
    const estimatedTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    setReadingTime(estimatedTime);

    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.min(Math.max((scrollTop / documentHeight) * 100, 0), 100);
      
      setProgress(scrollPercentage);
      setWordsRead(Math.round((scrollPercentage / 100) * wordCount));
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
  }, [content]);

  return (
    <div className={`desktop-reading-progress bg-white border border-gray-200 rounded-xl shadow-sm p-6 ${className}`}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <h3 className="font-semibold text-gray-900">Reading Progress</h3>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Reading Stats */}
        <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Est. Time</p>
              <p className="text-sm font-medium text-gray-900">{readingTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Words Read</p>
              <p className="text-sm font-medium text-gray-900">{wordsRead.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        {/* Completion Message */}
        {progress >= 95 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm font-medium text-green-800">
                Article completed! 🎉
              </p>
            </div>
          </div>
        )}
      </div>
      
      <style>{`
        .desktop-reading-progress {
          position: sticky;
          top: 20px;
        }
        
        @media (max-width: 1023px) {
          .desktop-reading-progress {
            display: none;
          }
        }
        
        .desktop-reading-progress .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: .5;
          }
        }
      `}</style>
    </div>
  );
}