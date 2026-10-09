import { useEffect, useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseInit";

import "./ImageForm.css";
import { toast } from "react-toastify";

function ImageForm({
  selectedAlbum,
  selectedImage,
  setSelectedImage,
  setShowForm,
}) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (selectedImage) {
      setTitle(selectedImage.title);
      setImageUrl(selectedImage.imageUrl);
    }
  }, [selectedImage]);

  const handleClear = () => {
    setTitle("");
    setImageUrl("");
    setSelectedImage(null);
  };

  const handleSubmit = async () => {
    if (title.trim() === "" || imageUrl.trim() === "") return;

    try {
      if (selectedImage) {
        await updateDoc(doc(db, "images", selectedImage.id), {
          title,
          imageUrl,
        });
        toast.success("Image updated successfully.");
      } else {
        await addDoc(collection(db, "images"), {
          title,
          imageUrl,
          albumId: selectedAlbum.id,
        });

        toast.success("Image added successfully.");
      }

      handleClear();
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="image-form">
      <h2>{selectedImage ? "Update Image" : "Add Image"}</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <div className="buttons">
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>

        <button className="create-btn" onClick={handleSubmit}>
          {selectedImage ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default ImageForm;
