import './App.css';
import './styles.css';
import { useState, useEffect, useCallback, useRef } from 'react';
import { parseLinkHeader } from './parseLinkHeader';

function App() {
  const [photos, setPhotos] = useState([]);
  const nextPhotoUrlRef = useRef();
  const [isLoading, setIsLoading] = useState(true)

  const fetchPhotos = async (url, newPhotos = false) => {
    try {
      setIsLoading(true)
      const res = await fetch(url);
      nextPhotoUrlRef.current = parseLinkHeader(res.headers.get('Link')).next;
      const photos = await res.json();
      if (newPhotos) {
        setPhotos(prevPhotos => {
          return [...prevPhotos, ...photos]
        })
      }
      else {
        setPhotos(photos)
      }
    }
    catch (err) {
      console.error(err)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos('http://127.0.0.1:3002/photos?_page=1&_limit=12');
  }, [])

  const imageRef = useCallback(image => {
    if (image == null || nextPhotoUrlRef.current == null) return

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchPhotos(nextPhotoUrlRef.current, true)
        observer.unobserve(image)
      }
    });

    observer.observe(image)
  }, [])

  return (
    <div className="grid">
      {
        photos.map((photo, index) => (
          <img src={ photo.url } alt={ photo.title } key={ photo.id } ref={ index === photos.length - 1 ? imageRef : undefined } />
        ))
      }
      {
      isLoading && (
        Array.from({ length : 12 }, (_, index) => index).map(n => {
          return <div className="skeleton" key={n}>Loading...</div>
        })
      )}
    </div>
  );
}

export default App;
