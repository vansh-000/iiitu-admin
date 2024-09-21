import React, { useState } from 'react';
import { API, STATIC_FILES } from '../../utils/apiURl';
import { Link } from 'react-router-dom';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const TableFile = ({ File, setFile, recId }) => {
  const handleEdit = (index, field, value) => {
    const updatedFile = [...File];
    updatedFile[index][field] = value;
    setFile(updatedFile);
  };

  const handleAddFile = (e) => {
    e.preventDefault();
    setFile([...File, { DocName: '', Docs: null, DocPath: '', _id: null }]);
  };

  const handleFileChange = (index, files) => {
    if (files.length > 0) {
      const updatedFile = [...File];
      updatedFile[index].Docs = files[0]; // Update only if new file is selected
      setFile(updatedFile);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedFile = [...File];

      // Make the delete request with correct configuration
      const response = await axios.delete(
        `${API}/recruitmentDoc/${updatedFile[index]._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          data: {
            recruitmentId: recId, // Send recruitmentId in the data field
          },
        },
      );

      console.log(response);

      // Remove file from state after successful deletion
      updatedFile.splice(index, 1);
      setFile(updatedFile);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (index) => {
    try {
      const updatedFile = [...File];
      const formData = new FormData();
      formData.append('DocName', updatedFile[index].DocName);
      formData.append('Docs', updatedFile[index].Docs);
      formData.append('recruitmentId', recId);

      if (!updatedFile[index]?._id) {
        // POST for new document
        const response = await axios.post(`${API}/recruitmentDoc`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          toast.success('File is Saved');
        }
      } else {
        // PUT for existing document update
        const response = await axios.put(
          `${API}/recruitmentDoc/${updatedFile[index]._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        if (response.status === 201) {
          toast.success('File is Saved');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 mb-4 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-xl font-bold mb-4 text-black dark:text-white">
          File
        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                File
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                File Name
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {File &&
              File.map((file, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <input
                      id={`file-input-${index}`}
                      accept="application/*"
                      type="file"
                      onChange={(e) => handleFileChange(index, e.target.files)}
                      className="w-fit cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                    />
                    {/* Show the existing file name or a link if it exists */}
                    {file?.DocPath && (
                      <div className="mt-2">
                        <Link
                          to={StaticLinkProvider(file.DocPath)} // Ensure correct URL formatting
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          View Current File
                        </Link>
                      </div>
                    )}
                  </td>
                  <td className="text-center border-b border-gray-300 py-5 px-4 dark:border-strokedark">
                    <input
                      type="text"
                      value={file.DocName}
                      placeholder="University"
                      onChange={(e) =>
                        handleEdit(index, 'DocName', e.target.value)
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="text-center border-b border-gray-300 py-5 px-4 dark:border-strokedark">
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 hover:text-red-700 mr-3"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleSave(index)}
                      className="text-green-500 hover:text-green-700"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button
          onClick={handleAddFile}
          className="mt-4 mr-4 mb-4 inline-block rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark transition"
        >
          Add File
        </button>
        *Please Save Before Adding or Closing, else file will not save.
      </div>
    </div>
  );
};

export default TableFile;
