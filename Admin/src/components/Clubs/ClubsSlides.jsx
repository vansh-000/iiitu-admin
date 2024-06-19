import { useState } from 'react';
import ClubCard from './ClubCard';
import { STATIC_FILES } from '../../utils/apiURl';

function ClubsSlides({data, handleDelete}) {
  const [index, setIndex] = useState(-1);

  const modifiedEvents = data?.map(d => ({
    ...d,
    src: `${STATIC_FILES}/${d?.Logo?.replace(/\\/g, '/')}` // Append uploads/server/ to the image path
  }));

  modifiedEvents?.forEach(d => {
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