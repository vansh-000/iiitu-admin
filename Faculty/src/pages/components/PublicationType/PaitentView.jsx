
function PaitentView({data}) {
  return (
    <div className="p-4 md:p-5 space-y-4 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
      <label className="mb-3 contents text-black dark:text-white">Title:</label>
      <h5 className="font-medium text-black dark:text-white">
        {data?.heading}
      </h5>
      <label className="mb-3 block text-black dark:text-white">
      Inventors:{' '}
        {data.authors.map((aut, index) => (
          <h5 key={index} className="font-medium text-black dark:text-white">
            {aut},
          </h5>
        ))}
      </label>
   
      <label className="mb-3 block text-black dark:text-white">
        Indexing
        <h5 className="font-medium text-black dark:text-white">
          {data.indexing}
        </h5>
      </label>
      <label className="mb-3 block text-black dark:text-white">
        DOI
        <h5 className="font-medium text-black dark:text-white">{data.url}</h5>
      </label>
    </div>
  )
}

export default PaitentView