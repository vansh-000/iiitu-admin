import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';

const TableThree = ({ edit, Education, setEducation }) => {
  const handleEdit = (index, field, value) => {
    const updatedEducation = [...Education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...Education,
      { dateOfStart: '', dateOfEnd: '', description: '' },
    ]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-xl font-bold mb-4 text-black dark:text-white">
          Education
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Year
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                University/College
              </th>
            </tr>
          </thead>
          <tbody>
            {Education.map((edu, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  {edit ? (
                    <>
                      <input
                        type="text"
                        value={edu.dateOfStart}
                        placeholder="Date of Start"
                        className="max-w-[150px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'dateOfStart', e.target.value)
                        }
                      />
                      -
                      <input
                        type="text"
                        value={edu.dateOfEnd}
                        placeholder="Date of End"
                        className="max-w-[150px] rounded-lg border-[1.5px] ml-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'dateOfEnd', e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <h5 className="font-medium text-black dark:text-white">
                      {edu.dateOfStart}-{edu.dateOfEnd}
                    </h5>
                  )}
                </td>
                <td className="text-center border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {edit ? (
                    <input
                      type="text"
                      value={edu.description}
                      placeholder="University"
                      onChange={(e) =>
                        handleEdit(index, 'description', e.target.value)
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  ) : (
                    <p className="text-black dark:text-white">
                      {edu.description}
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {edit && (
          <button
            className="mt-2 flex flex-row items-center gap-1 bg-primary text-white rounded-md px-4 py-2"
            onClick={handleAddEducation}
          >
            Add Education <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableThree;
