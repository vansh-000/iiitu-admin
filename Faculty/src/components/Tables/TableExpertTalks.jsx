import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { FaStarOfLife } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  if (isNaN(date)) return '';
  return date.toLocaleDateString('en-GB');
};

const TableExpertTalks = ({ edit, ExpertTalk, setExpertTalk }) => {
  const handleEdit = (index, field, value) => {
    const updatedExpertTalk = [...ExpertTalk];
    updatedExpertTalk[index][field] = value;
    setExpertTalk(updatedExpertTalk);
  };

  const handleAddExpertTalk = () => {
    setExpertTalk([
      ...ExpertTalk,
      {
        title: '',
        organization: '',
        date: '',
        eventName: '',
      },
    ]);
    setCustomInputVisible([...customInputVisible, false]);
  };

  const handleDelete = (index) => {
    const updatedExpertTalk = ExpertTalk.filter((_, ind) => ind !== index);
    setExpertTalk(updatedExpertTalk);
    setCustomInputVisible(customInputVisible.filter((_, ind) => ind !== index));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-[1.2rem] font-bold mb-4 text-black dark:text-white">
          Expert Talks Organized
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 font-medium text-black dark:text-white text-center w-[25%]">
                Title of Talk
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[30%]">
                Organisation
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[15%]">
                Date of talk
              </th>
              <th className="py-4 font-medium text-black dark:text-white text-center w-[25%]">
                Event Name
              </th>
              {edit && (
                <th className="py-4 px-4 text-black dark:text-white w-[5%]"></th>
              )}
            </tr>
          </thead>

          <tbody>
            {ExpertTalk.length > 0 &&
              ExpertTalk.map((talk, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="text"
                        value={talk.title}
                        placeholder="Title of Talk"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'title', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {talk.title}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <>
                        <FaStarOfLife className="text-[0.5rem] text-red-600" />
                        <input
                          type="text"
                          value={talk.organization}
                          placeholder="Organization"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) =>
                            handleEdit(index, 'organization', e.target.value)
                          }
                        />
                      </>
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {talk.organization}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="date"
                        value={talk.date}
                        placeholder="Date of talk"
                        className="w-full max-w-[150px] rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'date', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {formatDate(talk.date)}
                      </h5>
                    )}
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 text-center dark:border-strokedark">
                    {edit ? (
                      <input
                        type="text"
                        value={talk.eventName}
                        placeholder="Name of event"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={(e) =>
                          handleEdit(index, 'eventName', e.target.value)
                        }
                      />
                    ) : (
                      <h5 className="text-black dark:text-white">
                        {talk.eventName}
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
            onClick={handleAddExpertTalk}
          >
            Add Expert Talk <IoMdAddCircleOutline />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableExpertTalks;
