import React from 'react'
import { FaStarOfLife } from 'react-icons/fa';
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
      <FaStarOfLife className='inline text-red-600 text-[10px]'/>Title:
        <input
          name="title"
          type="text"
          required
          ref={refTitle}
          placeholder="Title"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
      <FaStarOfLife className='inline text-red-600 text-[10px]'/>Investigator (For Multiple Investigator use ; to separate):
        <input
          name="Investigator"
          type="text"
          required
          ref={refInvestigator}
          placeholder="eg: Shatrughan; Ashwini; Mrityunjay"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Co-Investigator (For Multiple Co-Investigator use ; to separate):
        <input
          name="Co-Investigator"
          type="text"
          ref={refCoInvestigator}
          placeholder="eg: Shatrughan; Ashwini; Mrityunjay"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
      <FaStarOfLife className='inline text-red-600 text-[10px]'/>Status
        <select
          value={selectedStatus}
          required
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
      <FaStarOfLife className='inline text-red-600 text-[10px]'/> Type
        <select
          value={selectedType}
          required
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