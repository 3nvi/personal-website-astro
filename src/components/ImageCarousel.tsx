import { useState, useEffect, useMemo } from 'preact/hooks';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export const ImageCarousel = ({ imageMap }: { imageMap: Record<string, ImageMetadata[]> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<string>(Object.keys(imageMap)[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const handleClick = (event: Event) => {
      const target = event.currentTarget as HTMLButtonElement;
      if (!target.dataset.carouselProject) {
        return;
      }

      const images = imageMap[target.dataset.carouselProject];
      if (!images) {
        throw new Error(`No images found for project ${target.dataset.carouselProject}`);
      }

      setIsOpen(true);
      setCurrentProject(target.dataset.carouselProject);
      setCurrentIndex(parseInt(target.dataset.carouselIndex || '0'));
    };

    const elems = document.querySelectorAll('button[data-carousel-project]');
    elems?.forEach(elem => {
      elem.addEventListener('click', handleClick);
    });

    return () => {
      elems?.forEach(elem => {
        elem.removeEventListener('click', handleClick);
      });
    };
  }, []);

  const images = useMemo(() => {
    return imageMap[currentProject].map(image => ({
      src: image.src,
      width: image.width,
      height: image.height,
    }));
  }, [currentProject]);

  return (
    <Lightbox open={isOpen} close={() => setIsOpen(false)} index={currentIndex} slides={images} />
  );
};
