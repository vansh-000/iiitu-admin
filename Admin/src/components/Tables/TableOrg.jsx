import React, { useState } from 'react';
// import LinkPickerDefault from '../Forms/LinkPicker/LinkPickerDefault';

const TableOrg = ({ OrgDesc, setOrgDesc }) => {
  const handleEdit = (index, field, value) => {
    const upLinkdLink = [...OrgDesc];
    upLinkdLink[index][field] = value;
    setOrgDesc(upLinkdLink);
  };

  const handleAddLink = (e) => {
    e.preventDefault();
    // console.log(OrgDesc);
    setOrgDesc([...OrgDesc, { descName: '', desc
: '' }]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-center text-xl font-bold mb-4 text-black dark:text-white">
          Organization Description

        </h1>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Organization Description
 Name
              </th>
              <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                desc

              </th>
            </tr>
          </thead>
          <tbody>
            {OrgDesc &&
              OrgDesc.map((link, index) => (
                <tr key={index}>
                  <td className="border-b border-gray-300 py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <input
                      type="text"
                      value={link.desc
}
                      placeholder="OrgDesc eg. "
                      onChange={(e) => handleEdit(index, 'desc', e.target.value)}
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                  <td className="text-center border-b border-gray-300 py-5 px-4 dark:border-strokedark">
                    <input
                      type="text"
                      value={link.descName}
                      placeholder="descName eg.Registeration"
                      onChange={(e) =>
                        handleEdit(index, 'descName', e.target.value)
                      }
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        <button
          onClick={handleAddLink}
          className="my-4 inline-block rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark transition"
        >
          Add OrgDesc
        </button>
      </div>
    </div>
  );
};

export default TableOrg;
