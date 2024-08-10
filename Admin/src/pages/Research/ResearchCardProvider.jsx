import ResearchEditCard from './ResearchEditCard';

const ResearchCardProvider = ({ data, fetchData }) => {
  return (
    <>
      {data.length > 0 ? (
        data.map((research, index) => (
          <ResearchEditCard
            research={research}
            fetchData={fetchData}
            index={index}
          />
        ))
      ) : (
        <h1 className="text-xl">No Research currently</h1>
      )}
    </>
  );
};

export default ResearchCardProvider;
