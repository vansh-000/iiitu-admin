import ClubCard from './ClubCard';

function ClubsSlides({ data, handleDelete }) {
  const modifiedEvents = data?.map((d) => ({
    ...d,
    src: d.Logo,
  }));

  modifiedEvents?.forEach((d) => {
    delete d.d;
  });

  return (
    <>
      <ClubCard
        data={data}
        onClick={(currentIndex) => setIndex(currentIndex)}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default ClubsSlides;
