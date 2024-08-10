import ClubsSlides from '../Clubs/ClubsSlides';

const TableClub = ({ data, handleDelete }) => {
  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div>
        {data?.length > 0 ? (
          <ClubsSlides data={data} handleDelete={handleDelete} />
        ) : (
          <h1>No Clubs!</h1>
        )}
      </div>
    </div>
  );
};

export default TableClub;
