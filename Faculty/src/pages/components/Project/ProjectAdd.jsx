import React from 'react'
const STATUS=["Ongoing", "Completed"];
const TYPE=["Research", "Consultancy"];
function ProjectAdd({
    refTitle,
    refInvestigator,
    refCoInvestigator,
    refFundingAgency,
    refDuration,
    refAmount,
    setStatus,
    setType
}) {
    const [selectedStatus, setSelectedStatus] = React.useState('');
    const [selectedType, setSelectedType] = React.useState('');
    const handleStatusChange = (e) => {
        const value = e.target.value;
        setSelectedStatus(value);
        setStatus(value);
    };
    const handleTypeChange = (e) => {
        const value = e.target.value;
        setSelectedType(value);
        setType(value);
    };
  return (
    <>
    <div className="p-4 md:p-5 space-y-4 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-h-[60vh] overflow-y-scroll">
      <label className="mb-3 block text-black dark:text-white">
        Title:
        <input
          name="title"
          type="text"
          ref={refTitle}
          placeholder="Title"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Investigator (For Multiple Investigator use ; to separate):
        <input
          name="Investigator"
          type="text"
          ref={refInvestigator}
          placeholder="eg: Rishvant; Anurag; Pundir"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Co-Investigator (For Multiple Co-Investigator use ; to separate):
        <input
          name="Co-Investigator"
          type="text"
          ref={refCoInvestigator}
          placeholder="eg: Rishvant; Anurag; Pundir"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Funding Agency
        <input
          name="FundingAgency"
          type="text"
          ref={refFundingAgency}
          placeholder="Enter Funding Agency"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Duration
        <input
          name="Duration"
          type="text"
          ref={refDuration}
          placeholder="Enter Duration"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Amount
        <input
          name="amount"
          type="text"
          ref={refAmount}
          placeholder="eg.12333"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Status
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            selectedStatus ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Status
          </option>
          {STATUS.map((sta, index) => (
            <option key={index} value={sta} className="text-body dark:text-bodydark">
              {sta}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Type
        <select
          value={selectedType}
          onChange={handleTypeChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            selectedType ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Type
          </option>
          {TYPE.map((typ, index) => (
            <option key={index} value={typ} className="text-body dark:text-bodydark">
              {typ}
            </option>
          ))}
        </select>
      </label>
    </div>
    
    </>
  )
}

export default ProjectAdd