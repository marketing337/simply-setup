import { useEffect, useRef } from 'react';

interface ZohoFormProps {
  className?: string;
  height?: string;
  width?: string;
}

const ZohoForm = ({ className = "", height = "532px", width = "100%" }: ZohoFormProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Clear any existing iframe
    container.innerHTML = '';

    try {
      const iframe = document.createElement("iframe");
      iframeRef.current = iframe;

      // Update this alias to match your hidden field's actual alias in Zoho Form
      const websiteFieldAlias = 'Website1';
      const currentURL = encodeURIComponent(window.location.href);

      iframe.src = `https://forms.zohopublic.in/accounts50/form/FreeConsultationforVO/formperma/urrOCtvT5yXGX362UwMIt2LyDlZDwsBPop0oKXJeySY?${websiteFieldAlias}=${currentURL}&zf_rszfm=1`;

      iframe.style.border = "none";
      iframe.style.height = height;
      iframe.style.width = width;
      iframe.style.margin = "0";
      iframe.style.padding = "0";
      iframe.style.display = "block";
      iframe.style.overflow = "hidden";
      iframe.scrolling = "no";
      iframe.setAttribute("aria-label", 'Free Consultation for VO');
      iframe.setAttribute("allow", "geolocation;");

      container.appendChild(iframe);

      const handleMessage = (event: MessageEvent) => {
        const evntData = event.data;
        if (evntData && evntData.constructor === String) {
          const zf_ifrm_data = evntData.split("|");
          if (zf_ifrm_data.length === 2 || zf_ifrm_data.length === 3) {
            const zf_perma = zf_ifrm_data[0];
            const zf_ifrm_ht_nw = (parseInt(zf_ifrm_data[1], 10) + 15) + "px";
            
            if (iframeRef.current && 
                iframeRef.current.src.indexOf('formperma') > 0 && 
                iframeRef.current.src.indexOf(zf_perma) > 0) {
              const prevIframeHeight = iframeRef.current.style.height;
              const zf_tout = zf_ifrm_data.length === 3;
              
              if (zf_tout) {
                iframeRef.current.scrollIntoView();
              }
              
              if (prevIframeHeight !== zf_ifrm_ht_nw) {
                if (zf_tout) {
                  setTimeout(() => {
                    if (iframeRef.current) {
                      iframeRef.current.style.height = zf_ifrm_ht_nw;
                    }
                  }, 500);
                } else {
                  iframeRef.current.style.height = zf_ifrm_ht_nw;
                }
              }
            }
          }
        }
      };

      window.addEventListener('message', handleMessage, false);

      return () => {
        window.removeEventListener('message', handleMessage, false);
      };
    } catch (e) {
      console.error('Error loading Zoho form:', e);
    }
  }, [height, width]);

  return (
    <div 
      ref={containerRef}
      className={`zoho-form-container ${className}`}
      id="zf_div_urrOCtvT5yXGX362UwMIt2LyDlZDwsBPop0oKXJeySY"
      style={{ 
        margin: 0, 
        padding: 0, 
        width: '100%', 
        overflow: 'hidden',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}
    />
  );
};

export default ZohoForm;