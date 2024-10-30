import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaStarOfLife } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import {
  SUPERVISION_DEGREE_OPTIONS,
  SUPERVISION_STATUS_OPTIONS,
} from '../../utils/constants';

const TableSupervision = ({ edit, Supervision, setSupervision }) => {
  const handleEdit = (index, field, value) => {
    const updatedSupervision = [...Supervision];
    updatedSupervision[index][field] = value;
    setSupervision(updatedSupervision);
  };

  const handleAddSupervisors = () => {
    setSupervision([
      ...Supervision,
      {
        program: '',
        scholar: '',
        topic: '',
        status: '',
        year: '',
        co_super: '',
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedSupervision = Supervision.filter((_, ind) => ind !== index);
    setSupervision(updatedSupervision);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Research Supervision
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white text-center w-[10%]">
                Program Name
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[15%]">
                Scholar Name
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[35%]">
                Research Topic
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[10%]">
                Status
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[10%]">
                Year of Completion
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[15%]">
                Co-Supervisors
              </th>
            </tr>
          </thead>

          <tbody>
            {Supervision.length > 0 &&
              Supervision.map((edu, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <select
                          value={edu.program}
                          className="max-w-[180px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'program', e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Select Program
                          </option>
                          {SUPERVISION_DEGREE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">
                        {edu.program}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.scholar}
                          placeholder="Scholar Name"
                          className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'scholar', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <p className="text-black dark:text-white">
                        {edu.scholar}
                      </p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.topic}
                          placeholder="Research Topic"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'topic', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.topic}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <select
                        value={edu.status}
                        className="max-w-[180px] rounded-lg border-[1.5px] mr-1 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'status', e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        {SUPERVISION_STATUS_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.status}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="text"
                        value={edu.year}
                        placeholder="2024"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'year', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">{edu.year}</h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="text"
                        value={edu.co_super}
                        placeholder="Name"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'co_super', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.co_super}
                      </h5>
                    )}
                  </td>

                  {edit && (
                    <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
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
            onClick={handleAddSupervisors}
          >
            Add Supervision <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableSupervision;
