import React from 'react'
import DatePickerCustom from '../../../components/DatePickerCoustom'
import DatePickerCustomDefault from '../../../components/DatePickerCoustomDefault';

function PatentEdit({
    data,
    handleEdit,
    refAuthors,
    setDate,
    setIndexing,
    refPage,
    refPublisher,
    refTitle,
    refUrl,
    refVol,
    refOther
}) {
    const AutorsDummy=data?.authors?.toString();
    const Autors=AutorsDummy.replace(/,/g,';');
  return (<form onSubmit={handleEdit}>
    <div>
    <label className="mb-3 contents text-black dark:text-white">
  Title:
</label>
<input
  name="title"
  type="text"
  ref={refTitle}
  defaultValue={data?.heading}
  placeholder="Title"
  className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
/>  
    </div>
    <div><label className="mb-3 block text-black dark:text-white">
    Inventors(For Multiple Inventors use ; to seperate):


<input
  name="title"
  type="text"
  ref={refAuthors}
  defaultValue={Autors}
  placeholder="eg:Shatrughan;Anurag;Mrityunjay"
  className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
/></label></div>
    <div><label className="mb-3 block text-black dark:text-white">
  Year<DatePickerCustomDefault setDate={setDate} Dat={data?.date} />
</label></div>
    <div><label className="mb-3 block text-black dark:text-white">
  DOI

<input
  name="title"
  type="text"
  ref={refUrl}
  defaultValue={data?.url}
  placeholder="eg:https://googleScholer/hkjh"
  className="ml-2 mt-2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
/></label></div>
    <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
      Update Publication
    </button>
    </form>
  )
}

export default PatentEdit