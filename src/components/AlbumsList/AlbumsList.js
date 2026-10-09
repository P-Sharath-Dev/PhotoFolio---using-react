import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from "react-spinner-material";

import { db } from "../../firebase/firebaseInit";

import AlbumForm from "../AlbumForm/AlbumForm";
import ImagesList from "../ImagesList/ImagesList";

import "./AlbumsList.css";

function AlbumsList() {
  const [showForm, setShowForm] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "albums"), (snapshot) => {
      const fetchedAlbums = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAlbums(fetchedAlbums);

      // Hide spinner after first data is received
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Spinner radius={45} color="#0077ff" stroke={4} visible={true} />
      </div>
    );
  }

  return (
    <div className="albums-list">
      {selectedAlbum ? (
        <ImagesList
          selectedAlbum={selectedAlbum}
          setSelectedAlbum={setSelectedAlbum}
        />
      ) : (
        <>
          <div className="albums-header">
            <h1>Your Albums</h1>

            <button
              className={showForm ? "cancel-btn" : "add-album-btn"}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Cancel" : "Add Album"}
            </button>
          </div>

          {showForm && <AlbumForm />}

          <div className="albums-container">
            {albums.map((album) => (
              <div
                className="album-card"
                key={album.id}
                onClick={() => setSelectedAlbum(album)}
              >
                <div className="album-image">
                  <img
                    src="https://photo-folio-cn.netlify.app/assets/photos.png"
                    alt="Album"
                  />
                </div>

                <div className="album-name">
                  <h3>{album.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default AlbumsList;
