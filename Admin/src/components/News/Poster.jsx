import "yet-another-react-lightbox/styles.css";
import styles from "../Gallery/gallery.module.css";
import { STATIC_FILES } from "../../utils/apiURl";
import { MdDelete } from "react-icons/md";

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
                        <p className={styles.news}>{slide.heading.length > 20 ? `${slide.heading.substring(0, 100)}...` : slide.heading}</p>
                        <div className="flex items-center justify-center ">
                            <button className="text-xl text-black" onClick={() => handleDelete(slide._id)}>Delete</button>
                            <MdDelete className="text-[rgb(220,0,0)] text-xl" />
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Poster;
