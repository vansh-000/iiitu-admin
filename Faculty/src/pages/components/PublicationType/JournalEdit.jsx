import React from 'react'

function JournalEdit() {
  return (
   <>
     <form onSubmit={handleEdit}>
        <div>
          <label htmlFor='title' className="mb-3 block text-black dark:text-white">Title</label>
          <input
            name="title"
            id='title'
            type="text"
            ref={titleRef}
            defaultValue={data?.title}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
        <label htmlFor='facultyID' className="mb-3 block text-black dark:text-white">Faculty Id</label>
          <input
            name="title"
            id='facultyID'
            type="text"
            ref={facultyRef}
            defaultValue={data?.faculty._id}
            placeholder="Faculty ID"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      </div>
      <div className="mt-4">
        <label htmlFor='children' className="mb-3 block text-black dark:text-white">|Children</label>
          <input
            name="title"
            id='children'
            type="text"
            ref={childrenRef}
            defaultValue={data?.children.toString()}
            placeholder="Childern Id seperated with ,"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Organization
        </button>
      </form>
   </>
  )
}

export default JournalEdit