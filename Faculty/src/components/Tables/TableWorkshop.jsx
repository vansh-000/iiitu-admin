import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaStarOfLife } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

// Helper function to format dates
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return ''; // return empty if date is invalid
  return date.toLocaleDateString('en-GB'); // Converts to 'dd-mm-yyyy'
};

const TableWorkshop = ({edit, Workshop, setWorkshop}) => {
  const handleEdit = (index, field, value) => {
    const updatedWorkshop = [...Workshop];
    updatedWorkshop[index][field] = value;
    setWorkshop(updatedWorkshop);
  };

  const handleAddWorkshop = () => {
    setWorkshop([
      ...Workshop,
      {
        type: '',
        title: '',
        venue: '',
        from: '',
        to: '',
        designation: '',
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedWorkshop = Workshop.filter((_, ind) => ind !== index);
    setWorkshop(updatedWorkshop);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Workshops
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white text-center w-[15%]">
                Type
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[35%]">
                Title
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[15%]">
                Venue
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[8%]">
                From
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[8%]">
                To
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[20%]">
                Designation
              </th>
              {edit && (
                <th className="py-4 px-4 text-black dark:text-white w-[5%]"></th>
              )}
            </tr>
          </thead>

          <tbody>
            {Workshop.length > 0 &&
              Workshop.map((edu, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.type}
                          placeholder="International/National/Academic"
                          className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'type', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <h5 className="font-medium text-black dark:text-white">
                        {edu.type}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.title}
                          placeholder="Workshop Name"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'title', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <p className="text-black dark:text-white">
                        {edu.title}
                      </p>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={edu.venue}
                          placeholder="IIITU"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'venue', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.venue}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="date"
                        value={edu.from}
                        placeholder="01/01/2024"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'from', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {formatDate(edu.from)}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="date"
                        value={edu.to}
                        placeholder="10/01/2024"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'to', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {formatDate(edu.to)}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="text"
                        value={edu.designation}
                        placeholder="Name"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'designation', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {edu.designation}
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
            onClick={handleAddWorkshop}
          >
            Add Workshop <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableWorkshop;
