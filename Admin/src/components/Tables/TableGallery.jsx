import { useState } from 'react';
import 'lightbox.js-react/dist/index.css';
import GallerySlides from '../Gallery/Gallery';
import axios from 'axios';
import toast from 'react-hot-toast';
import { API } from '../../utils/apiURl';
import { AiFillEdit } from 'react-icons/ai';

const TableGallery = ({
  data,
  title,
  handleAlbumDelete,
  handleDelete,
  albumId,
  fetchAlbums,
}) => {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API}/album/${albumId}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      toast.success('Album updated successfully!');
      setEditing(false);
      fetchAlbums();
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        <div className="flex flex-row justify-between items-center">
          {editing ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-3 text-black outline-none dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-500 text-white px-2 py-1 rounded-md ml-2"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              <h1 className="text-[1.2rem] text-black font-semibold">
                {title}
              </h1>
              <AiFillEdit
                onClick={() => setEditing(true)}
                className="text-[1.5rem] text-black ml-2 cursor-pointer"
              />
            </div>
          )}
          <button
            onClick={handleAlbumDelete}
            className="bg-red-500 text-white px-2 py-1 rounded-md"
          >
            Delete Album
          </button>
        </div>
        {data?.length > 0 ? (
          <GallerySlides page="gallery" images={data} handleDelete={handleDelete} />
        ) : (
          <h1 className="mt-2">No Images!</h1>
        )}
      </div>
    </div>
  );
};

export default TableGallery;
