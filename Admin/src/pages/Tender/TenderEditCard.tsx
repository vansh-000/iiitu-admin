import TEditCard from "./TEditCard";


const TenderEditsCard = ({ data ,fetchData}) => {

  
  return (
    <>
      {data.length>0 ? (data.map((tender,index) => (
        <TEditCard tender={tender} fetchData={fetchData}/>
      ))) : (
          <h1 className="text-xl">No Tenders currently</h1>
      )}
    </>
  );
};

export default TenderEditsCard;
