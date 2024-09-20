import { useRef } from 'react';
import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Journal from '../../pages/components/PublicationType/Journal';
import Conference from '../../pages/components/PublicationType/Conference';
import Chapter from '../../pages/components/PublicationType/Chapter';
import Book from '../../pages/components/PublicationType/Book';
import Patent from '../../pages/components/PublicationType/Patent';
import { API } from '../../utils/apiURl';
import axios from 'axios';
import JournalView from '../../pages/components/PublicationType/JournalView';
import ConferenceView from '../../pages/components/PublicationType/ConferenceView';
import ChapterView from '../../pages/components/PublicationType/ChapterView';
import BookView from '../../pages/components/PublicationType/BookView';
import PaitentView from '../../pages/components/PublicationType/PaitentView';
const TYPE = ['Journal', 'Conference', 'Book', 'Chapter', 'Patent'];

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import JournalView2 from '../../pages/components/PublicationType/JournalView2';
import JournalView3 from '../../pages/components/PublicationType/JournalView3';
import PublicationProvider from './PublicationProvider';

const TablePublications = ({ edit, Publication, setPublication }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [data, setData] = useState();
  const [isOpenView, setIsOpenView] = useState(false);
  const refTitle = useRef();
  const refAuthors = useRef();
  const [date, setDate] = useState();
  const refVol = useRef();
  const refPage = useRef();
  const refOther = useRef();
  const refPublisher = useRef();
  const [indexing, setIndexing] = useState();
  const refUrl = useRef();
  const [selected, setSelected] = useState('Journal');
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/publication/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 200) {
        const updatedPublication = Publication.filter((pub) => pub._id !== id);
        setPublication(updatedPublication);
        setIsOpenView(!isOpenView);
      }
    } catch (err) {
      console.error(err);
    }
  };
  // const handleClose = () => {
  //   setIsOpenView(!isOpenView);
  // };
  const handleAddPublication = () => {
    setIsOpen(!isOpen);
  };
  const handleAddPublicationLink = async (e) => {
    try {
      e.preventDefault()
      const heading = refTitle?.current?.value;
      const authors = refAuthors?.current?.value;
      const vol = refVol?.current?.value;
      const page = refPage?.current?.value;
      const publisher = refPublisher?.current?.value;
      const other = refOther?.current?.value;
      const url = refUrl?.current?.value;
      const authorsFinal = authors.split(';');
      if (!heading) {
        return toast.error('Title is required');
      }

      const newPublication = {
        type: selected,
        heading: heading,
        authors: authorsFinal,
        date,
        vol,
        Pages: page,
        publisher,
        indexing: indexing,
        url,
        other,
        writer: JSON.parse(localStorage.getItem('user')).id,
      };

      const response = await axios.post(`${API}/publication`, newPublication, {
        headers: {
          'Content-Type': 'application/json', // Use JSON content type
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPublication([...Publication, response.data.Publication]);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error(error);
      toast.error('Failed to add publication'); // Display an error message if the request fails
    }
  };

  // const handleViewPublication = async (pub) => {
  //   try {
  //     setIsOpenView(!isOpenView);
  //     setData(pub);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto ">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-bold text-[1.5rem] text-center text-black dark:text-white">
                  Publications
                </th>
              </tr>
            </thead>
            <tbody>
            {/* <JournalView2/> */}
            
              {Publication.map((pub, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      <PublicationProvider data={pub} handleDelete={handleDelete}/>
                      {/* <JournalView3 data={pub}/> */}
                      {/* <button
                        onClick={() => handleViewPublication(pub)}
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        View Publication
                      </button> */}
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {edit && (
            <button
              className="mt-2 flex flex-row items-center gap-1 bg-primary text-white rounded-md px-4 py-2"
              onClick={handleAddPublication}
            >
              Add Publication <IoMdAddCircleOutline />
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
              
            
              {data?.type === 'Journal' && <JournalView data={data} />}
              {data?.type === 'Conference' && <ConferenceView data={data} />}
              {data?.type === 'Chapter' && <ChapterView data={data} />}
              {data?.type === 'Book' && <BookView data={data} />}
              {data?.type === 'Patent' && <PaitentView data={data} />}
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
                  to={`publication/${data?._id}`}
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
            <form onSubmit={handleAddPublicationLink} className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                {/* <div className="flex flex-wrap p-1.5 w-72 rounded-lg bg-gray-200 shadow-sm text-sm"> */}
                {TYPE.map((ty, index) => (
                  <label key={index} className="flex-1 text-center">
                    <input
                      type="radio"
                      name="radio"
                      value={`${ty}`}
                      checked={selected === ty}
                      onChange={() => setSelected(ty)}
                      className="hidden"
                    />
                    <span
                      className={`flex items-center bg-gray justify-center  py-2 cursor-pointer transition-all duration-150 ease-in-out ${
                        selected === ty
                          ? 'bg-white font-semibold'
                          : 'text-gray-700'
                      }`}
                    >
                      {ty}
                    </span>
                  </label>
                ))}
              </div>
              {selected === 'Journal' && (
                <Journal
                  refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther}
                />
              )}
              {selected === 'Conference' && (
                <Conference
                  refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther}
                />
              )}
              {selected === 'Chapter' && (
                <Chapter
                  refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther}
                />
              )}
              {selected === 'Book' && (
                <Book
                  refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther}
                />
              )}
              {selected === 'Patent' && (
                <Patent
                  refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                />
              )}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  // onClick={handleAddPublicationLink}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Add
                </button>
                <button
                  onClick={handleAddPublication}
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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

export default TablePublications;
