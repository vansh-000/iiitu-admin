import React from 'react'

function Chapter({refAuthors,refDate,refIndexing,refPage,refPublisher,refTitle,refUrl,refVol}) {
  return (
    <div className="p-4 md:p-5 space-y-4">
    <label className="mb-3 contents text-black dark:text-white">
      Title:
    </label>
    <input
      name="title"
      type="text"
      ref={refTitle}
      placeholder="Title Of Project"
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
    Book

    
    <input
      name="title"
      type="text"
      ref={refPublisher}
      placeholder="Name of Book"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
    <label className="mb-3 block text-black dark:text-white">
      Indexing
    
    <input
      name="title"
      type="text"
      ref={refIndexing}
      placeholder="Enter Indexing"
      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
    /></label>
    <label className="mb-3 block text-black dark:text-white">
      URL
    
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

export default Chapter