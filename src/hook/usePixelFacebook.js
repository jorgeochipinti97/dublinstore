// hooks/useFacebookPixel.js
import { useEffect } from 'react';

const useFacebookPixel = () => {
  useEffect(() => {
    // Carga el script del píxel de Facebook
    (function(f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // Inicializa el píxel
    fbq('init', '307885082364145'); // Cambia 'YOUR_PIXEL_ID' por tu ID real
    fbq('track', 'PageView');
  }, []);

  const trackEvent = (event, data) => {
    window.fbq('track', event, data);
  };

  return trackEvent;
};

export default useFacebookPixel;
