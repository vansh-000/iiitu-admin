import React from 'react';
import { FaStarOfLife } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';

const TableOther = ({ edit, Other, setOther }) => {
  const handleEdit = (index, value) => {
    const updatedOther = [...Other];
    updatedOther[index] = value;
    setOther(updatedOther);
  };

  const handleAddOther = () => {
    setOther([...Other, '']);
  };

  const handleDelete = (index) => {
    const updatedOther = Other.filter((_, ind) => ind != index);
    setOther(updatedOther);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-bold text-[1.2rem] text-center text-black dark:text-white">
                Miscellaneous
              </th>
            </tr>
          </thead>
          <tbody>
            {Other.map((rech, index) => (
              <tr key={index}>
                <td className="w-full flex border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="w-full font-medium text-black dark:text-white">
                    {edit ? (
                      <div className="flex">
                        <input
                          type="text"
                          value={rech}
                          placeholder="Miscellaneous"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) => handleEdit(index, e.target.value)}
                        />
                      </div>
                    ) : (
                      rech
                    )}
                  </h5>
                  {edit && (
                    <div className="text-center border-b border-[#eee] py-3 px-1 dark:border-strokedark">
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
            onClick={handleAddOther}
          >
            Add Miscellaneous <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableOther;
