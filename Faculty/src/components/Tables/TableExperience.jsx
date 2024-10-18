import React, { useState } from 'react';
import { FaStarOfLife } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

const TableExperience = ({ edit, experience, setExperience }) => {
  const handleEdit = (index, field, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][field] = value;
    setExperience(updatedExperience);
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        position: '',
        organisation: '',
        startDate: '',
        endDate: '',
        isPresent: false,
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedExperience = experience.filter((_, ind) => ind !== index);
    setExperience(updatedExperience);
  };

  const handleCheckboxChange = (index) => {
    const updatedExperience = [...experience];
    updatedExperience[index].isPresent = !updatedExperience[index].isPresent;
    if (updatedExperience[index].isPresent) {
      updatedExperience[index].endDate = 'Present';
    } else {
      updatedExperience[index].endDate = '';
    }
    setExperience(updatedExperience);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Experience
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white text-center w-[25%]">
                Position
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center w-[50%]">
                Organisation
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center w-[20%]">
                Start Date
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white text-center w-[20%]">
                End Date
              </th>
              {edit && (
                <th className="py-4 px-4 text-black dark:text-white w-[5%]"></th>
              )}
            </tr>
          </thead>
          <tbody>
            {experience.length > 0 &&
              experience.map((edu, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[25%]">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.position}
                          placeholder="Position"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'position', e.target.value)
                          }
                          required
                        />
                      </>
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">
                        {edu.position}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[50%]">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.organisation}
                          placeholder="Organisation Name"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'organisation', e.target.value)
                          }
                          required
                        />
                      </>
                    ) : (
                      <p className="text-black dark:text-white">
                        {edu.organisation}
                      </p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[20%]">
                    {edit ? (
                      <input
                        type="month"
                        value={edu.startDate}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'startDate', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.startDate}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[20%]">
                    {edit ? (
                      <>
                        {!edu.isPresent && (
                          <input
                            type="month"
                            value={edu.endDate}
                            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            onChange={(e) =>
                              handleEdit(index, 'endDate', e.target.value)
                            }
                          />
                        )}
                        <div className="flex items-center gap-1 justify-center mt-1">
                          <input
                            type="checkbox"
                            checked={edu.endDate}
                            onChange={() => handleCheckboxChange(index)}
                            className="cursor-pointer size-4"
                          />
                          <span>Going on</span>
                        </div>
                      </>
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.endDate}
                      </h5>
                    )}
                  </td>
                  {edit && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[5%]">
                      <IoClose
                        onClick={() => handleDelete(index)}
                        className="text-[1.5rem] text-red-600 dark:text-red-500 cursor-pointer"
                      />
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        {edit && (
          <button
            className="mt-2 flex items-center gap-1 bg-primary text-white rounded-md px-4 py-2"
            onClick={handleAddExperience}
          >
            Add Experience <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableExperience;
