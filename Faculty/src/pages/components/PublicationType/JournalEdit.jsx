
import React, { useEffect, useState } from 'react';
import DatePickerCustom from '../../../components/DatePickerCoustom';
import DatePickerCustomDefault from '../../../components/DatePickerCoustomDefault';

const INDEXING = ["SCOPUS", "SCI/SCIE", "ESCI", "WEWOS", "UGC-CARE", "OTHERS"];
function JournalEdit({data,handleEdit,refAuthors,
    setDate,
    setIndexing,
    refPage,
    refPublisher,
    refTitle,
    refUrl,
    refVol,
    refOther}) {
      const AutorsDummy=data?.authors?.toString();
    const Autors=AutorsDummy.replace(/,/g,';');
      
      const [selectedIndexing, setSelectedIndexing] = useState('');
      const [otherIndexing, setOtherIndexing] = useState('');
    useEffect(()=>{
      const milaIndexing = data?.indexing && INDEXING.includes(data.indexing);
      if (milaIndexing) {
          setSelectedIndexing(data?.indexing);
      } else {
          setSelectedIndexing("OTHERS");
          setOtherIndexing(data?.indexing);
      }
    },[])
      
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
   <>
     <form onSubmit={handleEdit}>
        <div>
        <label className="mb-3 block text-black dark:text-white">
        Title:
        <input
          name="title"
          type="text"
          ref={refTitle}
          defaultValue={data?.heading}
          placeholder="Title"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
        </div>
        <div className="mt-4">
        <label className="mb-3 block text-black dark:text-white">
        Authors (For Multiple Authors use ; to separate):
        <input
          name="authors"
          type="text"
          ref={refAuthors}
          defaultValue={Autors}
          placeholder="eg: Shatrughan; Anurag; Mrityunjay"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      </div>
      <div className="mt-4">
      <label className="mb-3 block text-black dark:text-white">
      Year<DatePickerCustomDefault setDate={setDate} Dat={data?.date} />
      </label>
      </div>
      <div>
      <label className="mb-3 block text-black dark:text-white">
        Journal Name:
        <input
          name="Journal Name"
          type="text"
          ref={refOther}
          defaultValue={data?.other}
          placeholder="Name of Journal"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      </div>
      <div>
      <label className="mb-3 block text-black dark:text-white">
        Volume:
        <input
          name="volume"
          type="text"
          ref={refVol}
          defaultValue={data?.vol}
          placeholder="eg. 0.1, 1.2, 3"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      </div>
      <div><label className="mb-3 block text-black dark:text-white">
        Pages:
        <input
          name="pages"
          type="text"
          ref={refPage}
          defaultValue={data?.Pages}
          placeholder="eg. 22-33, 24"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label></div>
      <div><label className="mb-3 block text-black dark:text-white">
        Publisher:
        <input
          name="publisher"
          type="text"
          ref={refPublisher}
          defaultValue={data?.publisher}
          placeholder="Name of Publisher"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label></div>
      <div>
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
      </div>
      <div>
      <label className="mb-3 block text-black dark:text-white">
        DOI:
        <input
          name="url"
          type="text"
          ref={refUrl}
          defaultValue={data?.url}
          placeholder="eg: https://googleScholar/hkjh"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Publication
        </button>
      </form>
   </>
  )
}

export default JournalEdit