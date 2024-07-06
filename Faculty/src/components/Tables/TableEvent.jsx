import 'lightbox.js-react/dist/index.css';
import EventSlides from '../../pages/components/Events/EventSlides';
// import EventSlides from '../Events/Event';

const TableEvent = ({ data, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div >
        {data?.length>0 ? (
          <EventSlides data={data} handleDelete={handleDelete} />
        ) : (
          <h1>No Events!</h1>
        )}
      </div>
    </div>
  );
};

export default TableEvent;