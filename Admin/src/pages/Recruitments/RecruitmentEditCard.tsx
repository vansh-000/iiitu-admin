import REditCard from "./REditCard";


const RecruitmentEditCard = ({ data, fetchData }) => {

  
  return (
    <>
      {data.length > 0 ? (data.map((recruitment) => (
        <REditCard recruitment={recruitment} fetchData={fetchData} />
      ))) : (
        <h1 className="text-xl">No Recruitment currently</h1>
      )}
    </>
  );
};

export default RecruitmentEditCard;
