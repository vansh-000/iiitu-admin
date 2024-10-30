import { FaStarOfLife } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';

const TableAwards = ({ edit, Award, setAward }) => {
  const handleEdit = (index, field, value) => {
    const updatedAward = [...Award];
    updatedAward[index][field] = value;
    setAward(updatedAward);
  };

  const handleAddAward = () => {
    setAward([
      ...Award,
      {
        title: '',
        year: '',
        organisation: '',
      },
    ]);
  };

  const handleDelete = (index) => {
    const updatedAward = Award.filter((_, ind) => ind != index);
    setAward(updatedAward);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Awards and Honours
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white text-center w-[10%]">
                Name of Award
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[15%]">
                Year of Award
              </th>
              <th className="py-4 px-2 font-medium text-black dark:text-white text-center w-[15%]">
                Organisation
              </th>
            </tr>
          </thead>
          <tbody>
            {Award.map((awd, index) => (
              <tr key={index}>
                <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                  {edit ? (
                    <>
                      <FaStarOfLife className="text-[0.5rem] text-red-600" />
                      <input
                        type="text"
                        value={awd.title}
                        placeholder="Name of Award"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'title', e.target.value)
                        }
                      />
                    </>
                  ) : (
                    <p className="text-black dark:text-white">{awd.title}</p>
                  )}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                  {edit ? (
                    <input
                      type="text"
                      value={awd.year}
                      placeholder="Year of Award"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={(e) =>
                        handleEdit(index, 'year', e.target.value)
                      }
                    />
                  ) : (
                    <p className="text-black dark:text-white">{awd.year}</p>
                  )}
                </td>
                <td className="w-full flex border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="w-full font-medium text-black dark:text-white">
                    {edit ? (
                      <div className="flex">
                        <input
                          type="text"
                          value={awd.organisation}
                          placeholder="Organisation"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'organisation', e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <p className="text-black dark:text-white">
                        {awd.organisation}
                      </p>
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
            onClick={handleAddAward}
          >
            Add Award <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableAwards;
