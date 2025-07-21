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

  useEffect(() => {
    if (!media_id) {
      setImgSrc(null);
      return;
    }

    setLoading(true);
    apiFetch({ path: `/wp/v2/media/${media_id}` })
      .then((media: any) => {
        setImgSrc(media?.source_url || null);
      })
      .catch((err) => {
        console.error('Error fetching media:', err);
        setImgSrc(null);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  }, [media_id]);

  if (loading) {
    return (
      <div className="grid w-full h-full place-center" style={style}>
        <Spinner style={{ marginInline: 'auto' }} />
      </div>
    );
  }

  if (!imgSrc) {
    return null;
  }

  return <img src={imgSrc} alt={alt} style={style} className={className} />;
};

export default ImageComponent;
