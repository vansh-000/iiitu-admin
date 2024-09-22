import 'lightbox.js-react/dist/index.css';
import GallerySlides from '../Gallery/Gallery';

const TableCarousel = ({ data, handleDelete, handleEdit }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        {data?.length > 0 ? (
          <GallerySlides
            page="carousel"
            images={data}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ) : (
          <h1>No carousels!</h1>
        )}
      </div>
    </div>
  );
};

export default TableCarousel;
