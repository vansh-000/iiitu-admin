import TEditCard from "./TEditCard";

const TenderEditsCard = ({ data, fetchData }) => {

  return (
    <>
      {data.length > 0 ? (data.map((tender) => (
        <TEditCard tender={tender} fetchData={fetchData} key={tender._id} />
      ))) : (
        <h1 className="text-xl">No Tenders currently</h1>
      )}
    </>
  );
};

export default TenderEditsCard;
