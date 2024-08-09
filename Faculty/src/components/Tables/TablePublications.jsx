import { useRef } from 'react';
import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import Journal from '../../pages/components/PublicationType/Journal';
import Conference from '../../pages/components/PublicationType/Conference';
import Chapter from '../../pages/components/PublicationType/Chapter';
import Patient from '../../pages/components/PublicationType/Patient';
import Book from '../../pages/components/PublicationType/Book';
import { API } from '../../utils/apiURl';
import axios from 'axios'
const TYPE = ['Journal', 'Conference', 'Book', 'Chapter', 'Patient'];
const TablePublications = ({ edit, Publication, setPublication }) => {
  const [isOpen, setIsOpen] = useState(false);
  const refTitle = useRef();
  const refAuthors = useRef();
  const refDate = useRef();
  const refVol = useRef();
  const refPage = useRef();
  const refPublisher = useRef();
  const refIndexing = useRef();
  const refUrl=useRef();
  const [selected, setSelected] = useState('Journal');
  const handleEdit = (index, value) => {
    const updatedPublication = [...Publication];
    updatedPublication[index] = value;
    setPublication(updatedPublication);
  };

  const handleAddPublication = () => {
    setIsOpen(!isOpen);
  };
  const handleAddPublicationLink = async () => {
    try {
      const heading = refTitle?.current?.value;;
      const authors = refAuthors?.current?.value;;
      const date = refDate?.current?.value;;
      const vol = refVol?.current?.value;;
      const page = refPage?.current?.value;;
      const publisher = refPublisher?.current?.value;
      const indexing = refIndexing?.current?.value;
      const url = refUrl?.current?.value;
      const authorsFinal=authors.split(';');
if(!heading){
 return console.log("Title is req");
}
      const newPublication = { type:selected,heading, authors:authorsFinal, date, vol, Pages:page, publisher, indexing, url,writer:localStorage.getItem('UserID') };
 console.log(newPublication);
 const response =await axios.post(`${API}/publication`,newPublication);
 console.log(response)
      setIsOpen(!isOpen);
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto ">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-center text-black dark:text-white">
                  Publications
                </th>
              </tr>
            </thead>
            <tbody>
              {Publication.map((pub, index) => (
                <tr key={index}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {edit ? (
                        <input
                          type="text"
                          value={pub}
                          placeholder="Publication"
                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          onChange={(e) => handleEdit(index, e.target.value)}
                        />
                      ) : (
                        pub
                      )}
                    </h5>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {edit && (
            <button
              onClick={handleAddPublication}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Add Publication
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-99999 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
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
              {selected==="Journal"&&<Journal refAuthors={refAuthors} refTitle={refTitle} refDate={refDate} refIndexing={refIndexing} refPage={refPage} refPublisher={refPublisher}  refUrl={refUrl} refVol={refVol}/>}
              {selected==="Conference"&&<Conference refAuthors={refAuthors} refTitle={refTitle} refDate={refDate} refIndexing={refIndexing} refPage={refPage} refPublisher={refPublisher}  refUrl={refUrl} refVol={refVol}/>}
              {selected==="Chapter"&&<Chapter refAuthors={refAuthors} refTitle={refTitle} refDate={refDate} refIndexing={refIndexing} refPage={refPage} refPublisher={refPublisher}  refUrl={refUrl} refVol={refVol}/>}
              {selected==="Book"&&<Book refAuthors={refAuthors} refTitle={refTitle} refDate={refDate} refIndexing={refIndexing} refPage={refPage} refPublisher={refPublisher}  refUrl={refUrl} refVol={refVol}/>}
              {selected==="Patient"&&<Patient refAuthors={refAuthors} refTitle={refTitle} refDate={refDate} refIndexing={refIndexing} refPage={refPage} refPublisher={refPublisher}  refUrl={refUrl} refVol={refVol}/>}
              <div className="flex  items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  onClick={handleAddPublicationLink}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TablePublications;
