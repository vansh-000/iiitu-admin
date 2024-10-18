import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { FaStarOfLife } from 'react-icons/fa';
import { EDUCATION_DEGREE_OPTIONS } from '../../utils/constants';

const TableThree = ({ edit, Education, setEducation }) => {
  const [customInputVisible, setCustomInputVisible] = useState(
    Array(Education.length).fill(false),
  );

  const handleEdit = (index, field, value) => {
    const updatedEducation = [...Education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  const handleAddEducation = () => {
    setEducation([
      ...Education,
      { yearOfCompletion: '', degree: '', specialisation: '', description: '' },
    ]);
    setCustomInputVisible([...customInputVisible, false]);
  };

  const handleDelete = (index) => {
    const updatedEducation = Education.filter((_, ind) => ind !== index);
    setEducation(updatedEducation);
    setCustomInputVisible(customInputVisible.filter((_, ind) => ind !== index));
  };

  const handleDegreeChange = (index, value) => {
    if (value === 'Other') {
      const updatedVisibility = [...customInputVisible];
      updatedVisibility[index] = true;
      setCustomInputVisible(updatedVisibility);
      handleEdit(index, 'degree', '');
    } else {
      const updatedVisibility = [...customInputVisible];
      updatedVisibility[index] = false;
      setCustomInputVisible(updatedVisibility);
      handleEdit(index, 'degree', value);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Education
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Degree
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Specialisation
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Year of Completion
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                University/College
              </th>
            </tr>
          </thead>
          <tbody>
            {Education.map((edu, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {edit ? (
                    <>
                      <FaStarOfLife className="text-[0.5rem] text-red-600" />
                      <select
                        value={edu.degree}
                        className="max-w-[180px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleDegreeChange(index, e.target.value)
                        }
                        required
                      >
                        <option value="" disabled>
                          Select Degree
                        </option>
                        {EDUCATION_DEGREE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                      {customInputVisible[index] && (
                        <input
                          type="text"
                          value={edu.degree}
                          placeholder="Enter degree"
                          className="max-w-[180px] mt-2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'degree', e.target.value)
                          }
                        />
                      )}
                    </>
                  ) : (
                    <h5 className="font-medium text-black dark:text-white">
                      {edu.degree}
                    </h5>
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {edit ? (
                    <input
                      type="text"
                      value={edu.specialisation}
                      placeholder="Specialisation"
                      className="max-w-[180px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) =>
                        handleEdit(index, 'specialisation', e.target.value)
                      }
                    />
                  ) : (
                    <h5 className="font-medium text-black dark:text-white">
                      {edu.specialisation}
                    </h5>
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {edit ? (
                    <input
                      type="text"
                      value={edu.yearOfCompletion}
                      placeholder="Year of Completion"
                      className="max-w-[200px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) =>
                        handleEdit(index, 'yearOfCompletion', e.target.value)
                      }
                    />
                  ) : (
                    <h5 className="font-medium text-black dark:text-white">
                      {edu.yearOfCompletion}
                    </h5>
                  )}
                </td>
                <td className="w-full flex items-center text-center border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {edit ? (
                    <div className="w-full flex gap-1">
                      <FaStarOfLife className="text-[0.5rem] text-red-600" />
                      <input
                        type="text"
                        value={edu.description}
                        placeholder="University (e.g. IIIT Una)"
                        onChange={(e) =>
                          handleEdit(index, 'description', e.target.value)
                        }
                        className="w-full rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  ) : (
                    <p className="w-full text-black dark:text-white">
                      {edu.description}
                    </p>
                  )}
                  {edit && (
                    <div className="text-center border-b border-[#eee] dark:border-strokedark">
                      <IoClose
                        onClick={() => handleDelete(index)}
                        className="text-[1.5rem] text-red-600 dark:text-red-500 cursor-pointer"
                      />
                    </div>
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
