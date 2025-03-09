import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./ImageCarousel.css";

const ImageCarousel = ({ images, startIndex, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="carousel-overlay">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <div className="carousel-wrapper">
        <Carousel
          selectedItem={startIndex}
          showArrows={true}
          showStatus={false}
          showThumbnails={false}
          infiniteLoop={true}
          useKeyboardArrows={true}
          swipeable={true}
        >
          {images?.map((image) => (
            <div key={image._id} className="carousel-slide">
              <img src={image.imageUrl} alt={image.modelName} />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ImageCarousel;
