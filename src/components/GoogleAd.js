// src/components/GoogleAd.js
import React, { useEffect, useRef } from 'react';

const GoogleAd = ({ adClient, adSlot, adFormat = 'auto', adWidth = 'auto', adHeight = 'auto' }) => {
  const adRef = useRef(null);

  useEffect(() => {
    if (window && adRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('Adsbygoogle error:', e);
      }
    }
  }, []);

  return (
    <div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: adWidth, height: adHeight }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        ref={adRef}
      ></ins>
    </div>
  );
};

export default GoogleAd;
