import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ProjectView2({ data,handleDelete }) {
    console.log(data);
    
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
          <span> {data?.title}</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${
              activeIndex === 1 ? 'rotate-180' : ''
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
  Investigator:
  {data?.investigator?.map((aut, index) => (
    <span
      key={index}
      className="font-medium text-black dark:text-white"
    >
      {aut}
      {index < data.investigator.length - 1 && ", "}
    </span>
  ))}
</p>

          <p className="mb-2 text-gray-500 dark:text-gray-400">
          Co-Investigator:
            {data?.coInvestigator?.map((coIn, index) => (
              <span
                key={index}
                className="font-medium text-black dark:text-white"
              >
                {coIn} {index < data.coInvestigator.length - 1 && ", "}
              </span>
            ))}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.fundingAgency && <>Funding Agency: {data?.fundingAgency} ,</>}
            {data?.duration && <>Duration: {data.duration} ,</>}
            {data?.amount && <>Amount: {data.amount} ,</>}
            {data?.other&&(<>Publisher: {data.other} </>)}
          </p>

          <p className="text-gray-500 dark:text-gray-400">
            {data?.status && <>Status {data.status}</>}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.type && <>Type {data.type}</>}
          </p>
          {/* <p className="text-gray-500 dark:text-gray-400">
            {data?.publisher && <>Conference {data.publisher}</>}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.url && <>DOI {data.url}</>}
          </p> */}
        </div>
      </div>
      <div className="flex  items-center gap-x-4 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
                onClick={() => handleDelete(data?._id)}
              class="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-red-800 bg-red-400 hover:bg-red-600"
            >
              <svg
                viewBox="0 0 1.625 1.625"
                class="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                height="15"
                width="15"
              >
                <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
              </svg>
              <svg
                width="16"
                fill="none"
                viewBox="0 0 39 7"
                class="origin-right duration-500 group-hover:rotate-90"
              >
                <line
                  stroke-width="4"
                  stroke="white"
                  y2="5"
                  x2="39"
                  y1="5"
                ></line>
                <line
                  stroke-width="3"
                  stroke="white"
                  y2="1.5"
                  x2="26.0357"
                  y1="1.5"
                  x1="12"
                ></line>
              </svg>
              <svg width="16" fill="none" viewBox="0 0 33 39" class="">
                <mask fill="white" id="path-1-inside-1_8_19">
                  <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                </mask>
                <path
                  mask="url(#path-1-inside-1_8_19)"
                  fill="white"
                  d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                ></path>
                <path stroke-width="4" stroke="white" d="M12 6L12 29"></path>
                <path stroke-width="4" stroke="white" d="M21 6V29"></path>
              </svg>
            </button>
            {/* <button
                //   onClick={handleClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  Cancel
                </button> */}
            {/* /* From Uiverse.io by vinodjangid07 */}
            <Link 
            to={`project/${data?._id}`}
              className="w-[55px] h-[55px] bg-[rgb(93,93,116)] flex items-center justify-center shadow-[0px_5px_10px_rgba(0,0,0,0.123)] cursor-pointer relative overflow-hidden transition-all duration-300 rounded-[20px] border-none
  before:content-[''] before:w-[200%] before:h-[200%] before:bg-[rgb(102,102,141)] before:absolute before:z-[1] before:transition-all before:duration-300 before:blur-[10px] before:rounded-full before:scale-0 hover:before:scale-100 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.336)]
  after:content-[''] after:w-[25px] after:h-[1.5px] after:absolute after:left-[-5px] after:bg-white after:z-[2] after:origin-left after:transition-transform after:duration-500 after:ease-out after:rounded-sm after:scale-x-0 after:bottom-[19px] hover:after:origin-right hover:after:scale-x-100 hover:after:left-0"
            >
              
              <svg
                height="1em"
                viewBox="0 0 512 512"
                className="h-[17px] fill-[white] z-[3] transition-all duration-[0.2s] origin-bottom hover:rotate-[-15deg] hover:translate-x-[5px]"
              >
                <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
              </svg>
            </Link>
{/* 
            <Link
              //   to={`publication/${data?._id}`}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-blue-800 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Edit
            </Link> */}
          </div>
    </>
  );
}

export default ProjectView2;
