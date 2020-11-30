import { useEffect } from 'react';

const useTidioChat = () => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'code.tidio.co/8lg9h4i9tbx7k5yo2ws4m5hhbtaidmjj.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
};

export default useTidioChat;
