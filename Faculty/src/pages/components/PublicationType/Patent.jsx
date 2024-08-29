import DatePickerCustom from "../../../components/DatePickerCoustom";

function Patent({
  refAuthors,
  setDate,
  refIndexing,
  refPage,
  refTitle,
  refUrl,
  refVol,
})

{

  console.log(setDate);
  
  return (
    <div className="px-5 py-2">
      <label className="mb-3 contents text-black dark:text-white">Title:</label>
      <input
        name="title"
        type="text"
        ref={refTitle}
        placeholder="Title"
        className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      <label className="mb-3 block text-black dark:text-white">
        Inventors(For Multiple Inventors use ; to seperate):
        <input
          name="title"
          type="text"
          ref={refAuthors}
          placeholder="eg:Rishvant;Anurag;Pundir"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Date Of Grant:<DatePickerCustom setDate={setDate}/>
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
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
    </div>
  );
}

export default Patent;
