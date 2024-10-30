import { useState } from 'react';
import { useRef } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import ProjectAdd from '../../pages/components/Project/ProjectAdd';
import axios from 'axios';
import { API } from '../../utils/apiURl';

import ProjectView2 from '../../pages/components/Project/ProjectView2';
const TableProjects = ({ edit, Project, setProject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const refTitle = useRef();
  const refInvestigator = useRef();
  const refCoInvestigator = useRef();
  const refFundingAgency = useRef();
  const refDuration = useRef();
  const refYearOfGrant = useRef();
  const refAmount = useRef();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);

  const handleAddProjectLink = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const invest = refInvestigator?.current?.value;
      const coInvest = refCoInvestigator?.current?.value;
      const investigator = invest.split(';');
      const coInvestigator = coInvest.split(';');

      const newProject = {
        title: refTitle?.current?.value,
        investigator: investigator,
        coInvestigator: coInvestigator,
        fundingAgency: refFundingAgency?.current?.value,
        duration: refDuration?.current?.value,
        yearOfGrant: refYearOfGrant?.current?.value,
        amount: refAmount?.current?.value,
        status: status,
        type: type,
        writer: JSON.parse(localStorage.getItem('user')).id,
      };
      const response = await axios.post(`${API}/project`, newProject, {
        headers: {
          'Content-Type': 'application/json', // Use JSON content type
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLoading(false);
      setProject([...Project, response.data.Project]);
      setIsOpen(!isOpen);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  const handleAddProject = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/project/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        const updatedProject = Project.filter((pro) => pro._id !== id);
        setProject(updatedProject);
        setIsOpenView(!isOpenView);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // const handleViewProject = (pro) => {
  //   setData(pro);
  //   setIsOpenView(!isOpenView);
  // };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-[1.2rem] text-center text-black dark:text-white">
                  Projects
                </th>
              </tr>
            </thead>
            <tbody>
              {Project.map((pro, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <ProjectView2 data={pro} handleDelete={handleDelete} />
                    {/* <button
                      onClick={() => handleViewProject(pro)}
                      className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                    >
                      View Project
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {edit && (
            <button
              className="mt-2 flex items-center gap-1 bg-primary text-white rounded-md px-4 py-2"
              onClick={handleAddProject}
            >
              Add Project <IoMdAddCircleOutline />
            </button>
          )}
        </div>
      </div>
      {/* {isOpenView && (
        <div className="fixed inset-0 z-99999 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-center text-black text-xl text-center p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                {data?.type}
              </div>

              <ProjectView data={data} />

              <div className="flex  items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={() => handleDelete(data?._id)}
                  className="text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-700 dark:hover:bg-red-900 dark:focus:ring-blue-800"
                  type="button"
                >
                  Delete
                </button>
                <button
                  onClick={handleClose}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button"
                >
                  Cancel
                </button>
                <Link
                  to={`project/${data?._id}`}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-blue-800 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {isOpen && (
        <div className="fixed inset-0 z-99999 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <form
              onSubmit={handleAddProjectLink}
              className="relative bg-white rounded-lg shadow dark:bg-gray-700"
            >
              <ProjectAdd
                refTitle={refTitle}
                refInvestigator={refInvestigator}
                refCoInvestigator={refCoInvestigator}
                refFundingAgency={refFundingAgency}
                refDuration={refDuration}
                refYearOfGrant={refYearOfGrant}
                refAmount={refAmount}
                setStatus={setStatus}
                setType={setType}
              />

              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600 transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary max-h-[60vh] overflow-y-scroll">
                <button
                  // onClick={}
                  className="w-24 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  ) : (
                    <span>Add</span>
                  )}
                </button>
                <button
                  onClick={handleAddProject}
                  className="w-24 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-black dark:border-gray-600 dark:hover:text-black dark:hover:bg-gray-700"
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TableProjects;
