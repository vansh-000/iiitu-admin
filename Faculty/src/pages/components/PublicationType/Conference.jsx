import { useState } from 'react';
import DatePickerCustom from '../../../components/DatePickerCoustom';
import { FaStarOfLife } from 'react-icons/fa';
const INDEXING = ['SCOPUS', 'SCI/SCIE/ESCI', 'UGC-CARE', 'OTHERS'];

function Conference({
  refAuthors,
  setDate,
  setIndexing,
  refPage,
  refPublisher,
  refTitle,
  refUrl,
  refVol,
  refOther,
}) {
  const [selectedIndexing, setSelectedIndexing] = useState('');
  const [otherIndexing, setOtherIndexing] = useState('');
  const handleIndexingChange = (e) => {
    const value = e.target.value;
    setSelectedIndexing(value);
    if (value !== 'OTHERS') {
      setIndexing(value);
    } else {
      setIndexing(() => '');
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
        <FaStarOfLife className="inline mb-2 text-red-600 text-[0.4rem]" />{' '}
        Title:
        <input
          name="title"
          type="text"
          required
          ref={refTitle}
          placeholder="Title"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 flex flex-col text-black dark:text-white">
        <div className="block text-md">
          <FaStarOfLife className="inline mb-2 text-red-600 text-[0.4rem]" />{' '}
          Authors (For Multiple Authors use ; to seperate):
        </div>
        <input
          name="title"
          type="text"
          required
          ref={refAuthors}
          placeholder="e.g. Manish; Rohan; Ashwini"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Month/Year:
        <DatePickerCustom setDate={setDate} />
        {/* <input
      name="title"
      type="text"
      ref={refDate}
      placeholder="eg.20  21"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    />*/}
      </label>
      <label className="mb-3 block text-black dark:text-white">
        <FaStarOfLife className="inline mb-2 text-red-600 text-[0.4rem]" />{' '}
        Publisher:
        <input
          name="Publisher"
          type="text"
          ref={refOther}
          required
          placeholder="Name of Publisher"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Volume:
        <input
          name="title"
          type="text"
          ref={refVol}
          placeholder="e.g. 0.1, 1.2, 3"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Pages:
        <input
          name="title"
          type="text"
          ref={refPage}
          placeholder="e.g. 22-33, 24"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Conference:
        <input
          name="title"
          type="text"
          ref={refPublisher}
          placeholder="Name of Conference"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        <FaStarOfLife className="inline mb-2 text-red-600 text-[0.4rem]" />{' '}
        Indexing:
        <select
          value={selectedIndexing}
          onChange={handleIndexingChange}
          required
          className={`relative z-20 w-full mt-2 rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            selectedIndexing ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" className="text-body dark:text-bodydark">
            Select Indexing
          </option>
          {INDEXING.map((idx, index) => (
            <option
              key={index}
              value={idx}
              className="text-body dark:text-bodydark"
            >
              {idx}
            </option>
          ))}
        </select>
        {selectedIndexing === 'OTHERS' && (
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
        DOI:
        <input
          name="title"
          type="text"
          ref={refUrl}
          placeholder="e.g. https://googleScholer/hkjh"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
    </div>
  );
}

export default Conference;
