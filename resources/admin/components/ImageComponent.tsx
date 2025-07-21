import { useEffect, useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@wordpress/components';

interface PropsI {
  media_id: number;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
}

const ImageComponent = ({ media_id, alt = '', style = {}, className = '' }: PropsI) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchImage = async () => {
    setLoading(true);
    try {
      const response = await fetch(wpApiSettings.media_api_url + media_id);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const respJson = await response.json();
      setImgSrc(respJson.source_url);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImage();
  }, [media_id]);

  if (loading) {
    return <Spinner />;
  }

  if (!imgSrc) {
    return null;
  }

  return <img src={imgSrc} alt={alt} style={style} className={className} />;
};

export default ImageComponent;
