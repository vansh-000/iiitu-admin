import "yet-another-react-lightbox/styles.css";
import styles from "../Gallery/gallery.module.css";
// import { STATIC_FILES } from "../../utils/apiURl";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { FcEditImage } from "react-icons/fc";
import { STATIC_FILES } from "../../../utils/apiURl";
const Poster = (props) => {
    const { data, onClick, handleDelete } = props;

    const handleClickImage = (index) => {
        onClick(index);
    };

    return (
        <div className={styles.container}>
            {data &&
                data.map((slide, index) => (
                    <div key={slide._id} className={styles.item}>
                        <div
                            onClick={() => handleClickImage(index)}
                            className={styles.image}
                        >
                            <img src={`${STATIC_FILES}/${slide.image?.replace(/\\/g, '/')}`} alt="" />
                        </div>
                        <p className={styles.event}>{slide.name}</p>
                        <div className="flex items-center justify-center -mt-12">
                            <button className="text-xl text-black dark:text-white" onClick={() => handleDelete(slide._id)}>Delete</button>
                            <MdDelete className="text-[rgb(220,0,0)] text-xl" />
                        </div>
                        <Link to={`/events/${slide._id}`} className="flex items-center justify-center -mt-12">
                            <button className="text-xl text-black dark:text-white">Edit</button>
                            <FcEditImage  className="text-[rgb(0,220,114)] text-xl" />
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default Poster;
