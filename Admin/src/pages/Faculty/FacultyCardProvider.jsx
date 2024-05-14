import React from 'react'
import FacultyEditCard from './FacultyEditCard'
const FacultyCardProvider = ({data,fetchData}) => {
  return (
    <>
    {data.map((faculty) => (
        <FacultyEditCard faculty={faculty} fetchData={fetchData}/>
      ))}
    </>
  )
}

export default FacultyCardProvider