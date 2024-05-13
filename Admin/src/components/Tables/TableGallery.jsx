import 'lightbox.js-react/dist/index.css';
import GallerySlides from '../Gallery/Gallery';

const TableGallery = ({ data, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div >
        {data?.length>0 ? (
          <GallerySlides images={data} handleDelete={handleDelete} />
        ) : (
          <h1>No Images!</h1>
        )}
      </div>
    </div>
  );
};

export default TableGallery;