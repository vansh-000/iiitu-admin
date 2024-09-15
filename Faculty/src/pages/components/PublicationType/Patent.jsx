import { FaStarOfLife } from 'react-icons/fa';
import DatePickerCustom from '../../../components/DatePickerCoustom';

function Patent({
  refAuthors,
  setDate,
  refIndexing,
  refPage,
  refTitle,
  refUrl,
  refVol,
}) {
  console.log(setDate);

  return (
    <div className="p-4 md:p-5 space-y-4 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-h-[60vh] ">
      <label className="mb-3 contents text-black dark:text-white">
        <FaStarOfLife className="inline text-red-600 text-[10px]" />
        Title:
      </label>
      <input
        name="title"
        required
        type="text"
        ref={refTitle}
        placeholder="Title"
        className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <label className="mb-3 flex items-center text-black dark:text-white">
        <div className="block text-xs">
          <FaStarOfLife className="inline text-red-600 text-[10px]" />
          Inventors (For Multiple Inventors use ; to separate):
        </div>
        <input
          name="title"
          required
          type="text"
          ref={refAuthors}
          placeholder="e.g., Rishvant; Singh; Pundir"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Date Of Grant:
        <DatePickerCustom setDate={setDate} />
        {/* <input
          name="title"
          type="text"
          ref={refDate}
          placeholder="eg.2021"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        /> */}
      </label>

      <label className="mb-3 block text-black dark:text-white">
        DOI
        <input
          name="title"
          type="text"
          ref={refUrl}
          placeholder="eg:https://googleScholer/hkjh"
          className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
    </div>
  );
}

export default Patent;
