import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebase/firebaseInit";

import "./AlbumForm.css";
import { toast } from "react-toastify";

function AlbumForm() {
  const [albumName, setAlbumName] = useState("");

  const handleClear = () => {
    setAlbumName("");
  };

  const handleSubmit = async () => {
    if (albumName.trim() === "") return;

    try {
      await addDoc(collection(db, "albums"), {
        name: albumName,
      });

      toast.success("Album added successfully.");

      setAlbumName("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="album-form">
      <h2>Create an Album</h2>

      <input
        type="text"
        placeholder="Album Name"
        value={albumName}
        onChange={(e) => setAlbumName(e.target.value)}
      />

      <div className="buttons">
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>

        <button className="create-btn" onClick={handleSubmit}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AlbumForm;
