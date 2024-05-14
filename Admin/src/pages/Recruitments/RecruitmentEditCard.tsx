import REditCard from "./REditCard";


const RecruitmentEditCard = ({ data ,fetchData}) => {

  
  return (
    <>
      {data.map((recruitment,index) => (
        <REditCard recruitment={recruitment} fetchData={fetchData}/>
      ))}
    </>
  );
};

export default RecruitmentEditCard;
