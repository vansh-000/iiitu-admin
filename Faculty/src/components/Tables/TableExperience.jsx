import React from 'react';
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
      { position: '', organisation: '', years: 0 },
    ]);
  };

  const handleDelete = (index) => {
    const updatedExperience = experience.filter((_, ind) => ind !== index);
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
                Years
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
                      <input
                        type="text"
                        value={edu.position}
                        placeholder="Position"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => handleEdit(index, 'position', e.target.value)}
                      />
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">{edu.position}</h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[50%]">
                    {edit ? (
                      <input
                        type="text"
                        value={edu.organisation}
                        placeholder="Organisation Name"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => handleEdit(index, 'organisation', e.target.value)}
                      />
                    ) : (
                      <p className="text-black dark:text-white">{edu.organisation}</p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-center w-[20%]">
                    {edit ? (
                      <input
                        type="number"
                        value={edu.years}
                        placeholder="Years"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) => handleEdit(index, 'years', e.target.value)}
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">{edu.years}</h5>
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
