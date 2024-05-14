import TEditCard from "./TEditCard";


const TenderEditsCard = ({ data ,fetchData}) => {

  
  return (
    <>
      {data.map((tender,index) => (
        <TEditCard tender={tender} fetchData={fetchData}/>
      ))}
    </>
  );
};

export default TenderEditsCard;
