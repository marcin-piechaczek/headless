import { useEffect } from 'react';

const useTidioChat = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'http://widget-v4.tidiochat.com/1_44_2/static/js/render.25f149d94e7f5d0c1136.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useTidioChat;
