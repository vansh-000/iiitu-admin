import React, { useState } from 'react';

function ChapterView3({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  
  return (
    <>
      <h2 id="accordion-collapse-heading-1" key={data._id}>
        <button
          type="button"
          className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
          onClick={() => toggleAccordion(1)}
          aria-expanded={activeIndex === 1}
          aria-controls="accordion-collapse-body-1"
        >
          <span className="bg-yellow-300 rounded-lg p-2 text-black">
            {data?.type}{' '}
          </span>{' '}
          <span className="font-satoshi font-extrabold text-[1.1rem]">
            {data?.heading}
          </span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${
              activeIndex === 1 ? '' : 'rotate-180'
            } shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={`${activeIndex === 1 ? '' : 'hidden'}`}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Authors{' '}
            {data.authors.map((aut, index) => (
              <span
                key={index}
                className="font-medium text-black dark:text-white"
              >
                {aut},
              </span>
            ))}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.date && <>Year {data.date}</>}
            {data?.vol && <>Vol {data.vol}</>}
            {data?.Page && <>Page {data.Page}</>}
            {data?.publisher && <>Book {data.publisher}</>}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {data?.indexing && <>Indexing {data.indexing}</>}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.other && <>Publisher {data.other}</>}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.url && <>DOI {data.url}</>}
          </p>
        </div>
      </div>
    </>
  );
}

export default ChapterView3;
