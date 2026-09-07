import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ProcessVideoCard from './ProcessVideoCard';
import './ProcessVideoCarousel.css';

export default function ProcessVideoCarousel({ items, activeIndex, onSelectIndex }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  // Scroll embla to active item if outside view
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(activeIndex);
    }
  }, [emblaApi, activeIndex]);

  return (
    <div className="process-carousel">
      <div className="process-carousel__viewport" ref={emblaRef}>
        <div className="process-carousel__container">
          {items.map((item, index) => (
            <div key={item.id} className="process-carousel__slide">
              <ProcessVideoCard
                item={item}
                isActive={index === activeIndex}
                onClick={() => onSelectIndex(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
