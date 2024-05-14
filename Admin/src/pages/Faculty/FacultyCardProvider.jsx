import React from 'react'
import FacultyEditCard from './FacultyEditCard'
const FacultyCardProvider = ({data,fetchData}) => {
    console.log(data);
  return (
    <>
    {data.map((faculty) => (
        <FacultyEditCard faculty={faculty} fetchData={fetchData}/>
      ))}
    </>
  )
}

export default FacultyCardProvider