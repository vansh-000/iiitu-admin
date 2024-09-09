import 'yet-another-react-lightbox/styles.css';
import styles from './gallery.module.css';
import { STATIC_FILES } from '../../utils/apiURl';
import { MdDelete } from 'react-icons/md';

const Images = (props) => {
  const { data, onClick, handleDelete } = props;

  const handleClickImage = (index) => {
    onClick(index);
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
              <img src={slide.image} alt={slide.description} />
            </div>
            <p className="text-center">{slide?.title}</p>
            <div className="flex flex-row items-center gap-1">
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
