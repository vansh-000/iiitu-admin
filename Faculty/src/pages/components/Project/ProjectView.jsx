import React from 'react'

function ProjectView({data}) {
    console.log(data);
    
  return (
    <div className="p-4 md:p-5 space-y-4 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-h-[60vh] overflow-y-scroll">
    <label className="mb-3 contents text-black dark:text-white">Title:</label>
    <h5 className="font-medium text-black dark:text-white">
      {data?.type}
    </h5>
    <label className="mb-3 block text-black dark:text-white">
    Investigator:{' '}
      {data?.investigator?.map((inv, index) => (
        <h5 key={index} className="font-medium text-black dark:text-white">
          {inv},
        </h5>
      ))}
    </label>
    <label className="mb-3 block text-black dark:text-white">
    Co-Investigator:{' '}
      {data?.coInvestigator?.map((coi, index) => (
        <h5 key={index} className="font-medium text-black dark:text-white">
          {coi},
        </h5>
      ))}
    </label>
    <label className="mb-3 block text-black dark:text-white">
    Funding Agency
      <h5 className="font-medium text-black dark:text-white">{data.fundingAgency}</h5>
    </label>
    <label className="mb-3 block text-black dark:text-white">
    Duration
      <h5 className="font-medium text-black dark:text-white">{data.duration}</h5>
    </label>
    <label className="mb-3 block text-black dark:text-white">
    Amount
      <h5 className="font-medium text-black dark:text-white">{data.amount}</h5>
    </label>
    <label className="mb-3 block text-black dark:text-white">
      Status
      <h5 className="font-medium text-black dark:text-white">
        {data.status}
      </h5>
    </label>
  </div>
  )
}

export default ProjectView