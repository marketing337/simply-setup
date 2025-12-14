import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface DropdownPortalProps {
  children: React.ReactNode;
  isOpen: boolean;
  parent: HTMLElement | null;
}

export default function DropdownPortal({ children, isOpen, parent }: DropdownPortalProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen || !parent) return null;
  
  // Get the position of the parent element
  const rect = parent.getBoundingClientRect();
  
  // Create a wrapper with absolute positioning based on the parent's position
  const wrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: `${rect.bottom + window.scrollY}px`,
    left: `${rect.left + window.scrollX}px`,
    width: `${rect.width}px`,
    zIndex: 9999999, // Ultra high z-index to ensure it's above Zoho form
  };

  return createPortal(
    <div style={wrapperStyle}>
      {children}
    </div>,
    document.body
  );
}