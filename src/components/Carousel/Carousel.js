import "./Carousel.css";

function Carousel({ image, onClose, onNext, onPrevious }) {
  return (
    <div className="carousel-overlay">
      {/* Close Button */}
      <div className="close-btn" onClick={onClose}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1828/1828774.png"
          alt="Close"
        />
      </div>

      {/* Previous Button */}
      <div className="nav-btn left-btn" onClick={onPrevious}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4436/4436147.png"
          alt="Previous"
        />
      </div>

      {/* Image */}
      <img className="carousel-image" src={image.imageUrl} alt={image.title} />

      {/* Next Button */}
      <div className="nav-btn right-btn" onClick={onNext}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4238/4238413.png"
          alt="Next"
        />
      </div>
    </div>
  );
}

export default Carousel;
