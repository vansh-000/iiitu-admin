import styles from './clubs.module.css';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagramSquare,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
} from 'react-icons/fa';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';
import ConfirmationModal from '../../utils/ConfirmationModal';

const ClubsCard = (props) => {
  const { data, handleDelete } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClubId, setSelectedClubId] = useState(null);

  const openModal = (id) => {
    setSelectedClubId(id);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClubId(null);
  }
  const confirmDelete = () => {
    if (selectedClubId) {
      handleDelete(selectedClubId);
      closeModal();
    }
  }

  return (
    <div className={styles.container}>
      {data &&
        data.map((slide) => (
          <div className={styles.clubbox} key={slide._id}>
            <div className={styles.club}>
              <Link to={`/clubs/${slide._id}`} className={styles.supercont}>
                <div className={styles.cont}>
                  <div className={styles.textcont}>
                    <h1 className={styles.clubname}>{slide.Name}</h1>
                    <p>
                      {slide.Description.length > 70
                        ? slide.Description.substr(0, 70) + '...'
                        : slide.Description}
                    </p>
                  </div>
                  <div className={styles.imgcont}>
                    <img
                      className={styles.img}
                      src={StaticLinkProvider(slide?.Logo)}
                      alt={`${slide.Name} Image`}
                    />
                  </div>
                </div>
                <div className={styles.contactscont}>
                  {slide.socialLinks &&
                    slide.socialLinks.map(
                      (link, index) =>
                        link.link && (
                          <a
                            key={index}
                            href={link.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.socialMedia === 'Facebook' && <FaFacebookF />}
                            {link.socialMedia === 'Twitter' && <FaTwitter />}
                            {link.socialMedia === 'Instagram' && (
                              <FaInstagramSquare />
                            )}
                            {link.socialMedia === 'LinkedIn' && (
                              <FaLinkedinIn />
                            )}
                            {link.socialMedia === 'GitHub' && <FaGithub />}
                            {link.socialMedia === 'Youtube' && <FaYoutube />}
                          </a>
                        ),
                    )}
                </div>
              </Link>
              <div className="flex items-center justify-center">
                <button
                  className="text-xl text-black dark:text-white"
                  onClick={() => openModal(slide._id)}
                >
                  Delete
                </button>
                <MdDelete className="text-[rgb(220,0,0)] text-xl" />
              </div>
            </div>
          </div>
        ))}
        <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Club"
        message="Are you sure you want to delete this club? This action cannot be undone."
      />
    </div>
  );
};

export default ClubsCard;
