import 'yet-another-react-lightbox/styles.css';
import styles from '../Gallery/gallery.module.css';
import { useState } from 'react'; 
import { STATIC_FILES } from '../../utils/apiURl';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { FcEditImage } from 'react-icons/fc';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';
import ConfirmationModal from '../../utils/ConfirmationModal';

const Poster = (props) => {
  const { data, onClick, handleDelete } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleClickImage = (index) => {
    onClick(index);
  };

  const openModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedId(null);
  }
  const confirmDelete = () => {
    if (selectedId) {
      handleDelete(selectedId);
      closeModal();
    }
  }

  return (
    <div className={styles.container}>
      {data &&
        data.map((slide, index) => (
          <div key={slide._id} className={styles.item}>
            <div
              onClick={() => handleClickImage(index)}
              className={styles.image}
            >
              <img src={StaticLinkProvider(slide.image)} alt="" />
            </div>
            <p className={styles.event}>{slide.name}</p>
            <div className="flex items-center justify-center -mt-12">
              <button
                className="text-xl text-black dark:text-white"
                onClick={() => openModal(slide._id)}
              >
                Delete
              </button>
              <MdDelete className="text-[rgb(220,0,0)] text-xl" />
            </div>
            <Link
              to={`/events/${slide._id}`}
              className="flex items-center justify-center -mt-12"
            >
              <button className="text-xl text-black dark:text-white">
                Edit
              </button>
              <FcEditImage className="text-[rgb(0,220,114)] text-xl" />
            </Link>
          </div>
        ))}
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Poster;
