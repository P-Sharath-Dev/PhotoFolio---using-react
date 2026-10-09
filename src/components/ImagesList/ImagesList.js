import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseInit";
import ImageForm from "../ImageForm/ImageForm";
import Carousel from "../Carousel/Carousel";

import "./ImagesList.css";
import { toast } from "react-toastify";

function ImagesList({ selectedAlbum, setSelectedAlbum }) {
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Carousel
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, "images"),
      where("albumId", "==", selectedAlbum.id),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedImages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setImages(fetchedImages);
    });

    return () => unsubscribe();
  }, [selectedAlbum]);

  const filteredImages = images.filter((image) =>
    image.title.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      toast.success("Image deleted successfully.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="images-list">
      {/* Form */}
      {showForm && (
        <ImageForm
          selectedAlbum={selectedAlbum}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setShowForm={setShowForm}
        />
      )}

      {/* Header */}
      <div className="images-header">
        <img
          className="back-btn"
          src="https://cdn-icons-png.flaticon.com/128/709/709624.png"
          alt="Back"
          onClick={() => setSelectedAlbum(null)}
        />

        <h1>
          {images.length === 0
            ? "No images found in the album."
            : `Images in ${selectedAlbum.name}`}
        </h1>

        {images.length > 0 && (
          <div className="search-container">
            {showSearch && (
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            )}

            <img
              className="search-icon"
              src={
                showSearch
                  ? "https://cdn-icons-png.flaticon.com/128/1828/1828945.png"
                  : "https://photo-folio-cn.netlify.app/assets/search.png"
              }
              alt="Search"
              onClick={() => {
                if (showSearch) {
                  setSearch("");
                }
                setShowSearch(!showSearch);
              }}
            />
          </div>
        )}

        <button
          className={showForm ? "cancel-btn" : "add-album-btn"}
          onClick={() => {
            setSelectedImage(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Cancel" : "Add Image"}
        </button>
      </div>

      {/* Images */}
      <div className="images-container">
        {filteredImages.map((image) => (
          <div className="image-card" key={image.id}>
            <div className="image-actions">
              <div
                className="edit-btn"
                onClick={() => {
                  setSelectedImage(image);
                  setShowForm(true);
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1828/1828911.png"
                  alt="Edit"
                />
              </div>

              <div
                className="delete-btn"
                onClick={() => handleDelete(image.id)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/484/484611.png"
                  alt="Delete"
                />
              </div>
            </div>

            <img
              className="image"
              src={image.imageUrl}
              alt={image.title}
              onClick={() => {
                setCurrentIndex(
                  filteredImages.findIndex((img) => img.id === image.id),
                );
                setShowCarousel(true);
              }}
            />

            <h3>{image.title}</h3>
          </div>
        ))}
      </div>

      {/* Carousel */}
      {showCarousel && (
        <Carousel
          image={filteredImages[currentIndex]}
          onClose={() => setShowCarousel(false)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}

export default ImagesList;
