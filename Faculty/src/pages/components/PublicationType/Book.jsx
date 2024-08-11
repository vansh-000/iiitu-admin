import { useState } from 'react';
const INDEXING = ["SCOPUS", "SCI/SCIE", "ESCI", "WEWOS", "UGC-CARE", "OTHERS"];

function Book({
  refAuthors,
  refDate,
  setIndexing,
  refPage,
  refTitle,
  refUrl,
  refVol,
  refOther
}) {
  const [selectedIndexing, setSelectedIndexing] = useState('');
  const [otherIndexing, setOtherIndexing] = useState('');
  const handleIndexingChange = (e) => {
    const value = e.target.value;
    setSelectedIndexing(value);
    if (value !== "OTHERS") {
      setIndexing(value);
    }
    else{
      setIndexing(()=>"")
    }
  };
  const handleOtherIndexingChange = (e) => {
    const value = e.target.value;
    setOtherIndexing(value);
    setIndexing(value);
  };
  return (
    <div className="p-4 md:p-5 space-y-4 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-h-[60vh] overflow-y-scroll">
    <label className="mb-3 contents text-black dark:text-white">
      Title:
    </label>
    <input
      name="title"
      type="text"
      ref={refTitle}
      placeholder="Title"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />
    <label className="mb-3 block text-black dark:text-white">
    Authors(For Multiple Authors use ; to seperate):
    
    <input
      name="title"
      type="text"
      ref={refAuthors}
      placeholder="eg:Rishvant;Anurag;Pundir"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
<label className="mb-3 block text-black dark:text-white">
      Year
    
    <input
      name="title"
      type="text"
      ref={refDate}
      placeholder="eg.2021"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
      <label className="mb-3 block text-black dark:text-white">
        Publisher:
        <input
          name="Publisher"
          type="text"
          ref={refOther}
          placeholder="Name of Publisher"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
    <label className="mb-3 block text-black dark:text-white">
      Vol
    
    <input
      name="title"
      type="text"
      ref={refVol}
      placeholder="eg.0.1,1.2,3"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
    <label className="mb-3 block text-black dark:text-white">
      Pages
    
    <input
      name="title"
      type="text"
      ref={refPage}
      placeholder="eg.22-33,24"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
          <label className="mb-3 block text-black dark:text-white">
        Indexing:
        <select
          value={selectedIndexing}
          onChange={handleIndexingChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            selectedIndexing ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" className="text-body dark:text-bodydark">
            Select Indexing
          </option>
          {INDEXING.map((idx, index) => (
            <option key={index} value={idx} className="text-body dark:text-bodydark">
              {idx}
            </option>
          ))}
        </select>

        {selectedIndexing === "OTHERS" && (
          <input
            name="otherIndexing"
            type="text"
            value={otherIndexing}
            onChange={handleOtherIndexingChange}
            placeholder="Name of other indexing"
            className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        )}
      </label>
    <label className="mb-3 block text-black dark:text-white">
      DOI
    
    <input
      name="title"
      type="text"
      ref={refUrl}
      placeholder="eg:https://googleScholer/hkjh"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
  </div>
  )
}

export default Book;
