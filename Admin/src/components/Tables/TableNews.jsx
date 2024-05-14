import 'lightbox.js-react/dist/index.css';
import NewsSlides from '../News/News';

const TableNews = ({ data, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div >
        {data?.length > 0 ? (
          <NewsSlides data={data} handleDelete={handleDelete} />
        ) : (
          <h1>No News!</h1>
        )}
      </div>
    </div>
  );
};

export default TableNews;