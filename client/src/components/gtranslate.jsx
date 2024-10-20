import { useEffect } from 'react';

const GTranslate = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.gtranslate.net/widgets/latest/float.js";
    script.defer = true;
    document.body.appendChild(script);

    // Clean up the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="gtranslate_wrapper"></div>
  );
};

export default GTranslate;
