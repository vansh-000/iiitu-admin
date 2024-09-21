import 'yet-another-react-lightbox/styles.css';
import styles from './gallery.module.css';
import { STATIC_FILES } from '../../utils/apiURl';
import { MdDelete, MdEdit } from 'react-icons/md';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';
import { useState } from 'react';

const Images = (props) => {
  const { data, onClick, handleDelete, handleEdit, page } = props;
  const [isEditing, setIsEditing] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleClickImage = (index) => {
    onClick(index);
  };

  const startEditing = (index, title) => {
    setIsEditing(index);
    setEditedTitle(title);
  };

  const saveEditedTitle = (id) => {
    handleEdit(id, editedTitle);
    setIsEditing(null);
  };

  return (
    <div className={styles.container}>
      {data &&
        data.map((slide, index) => (
          <div key={slide._id} className="flex flex-col items-center">
            <div
              onClick={() => handleClickImage(index)}
              className={styles.image}
            >
              <img
                src={StaticLinkProvider(slide.image)}
                alt={slide.description}
              />
            </div>
            {page === 'carousel' && isEditing === index ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-center border border-gray-300 p-1 rounded-sm"
              />
            ) : (
              <p className="text-center">{slide?.title}</p>
            )}
            <div className="flex flex-row items-center gap-2 mt-2">
              {page === 'carousel' && isEditing === index ? (
                <button
                  className="text-xl text-blue-500"
                  onClick={() => saveEditedTitle(slide._id)}
                >
                  Save
                </button>
              ) : (
                <>
                  {page === 'carousel' && (
                    <>
                      <button
                        className="text-xl text-black dark:text-white"
                        onClick={() => startEditing(index, slide.title)}
                      >
                        Edit
                      </button>
                      <MdEdit className="text-blue-500 text-xl" />
                    </>
                  )}
                </>
              )}
              <button
                className="text-xl text-black dark:text-white"
                onClick={() => handleDelete(slide._id)}
              >
                Delete
              </button>
              <MdDelete className="text-[rgb(220,0,0)] text-xl" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Images;
