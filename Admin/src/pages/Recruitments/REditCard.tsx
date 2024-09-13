import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, STATIC_FILES } from '../../utils/apiURl';
import axios from 'axios';
// import TableDate from "../../components/Tables/TableDate.jsx"
import TableEditFile from '../../components/Tables/TableEditFile.jsx';
import toast from 'react-hot-toast';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider.jsx';

const REditCard = ({ recruitment, fetchData }) => {
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [addFile, setAddFile] = useState(false);
  // console.log(recruitment);

  const [date, setDate] = useState(recruitment?.Date);
  const [file, setFile] = useState(recruitment?.Docs);
  const [link, setLink] = useState(recruitment?.Link);

  const navigate = useNavigate();
  const refDesc = useRef<HTMLInputElement>(null);
  // const refRecruitmentDoc = useRef<HTMLInputElement>(null);
  // const refAppLink = React.useRef<HTMLInputElement>(null);
  // const refAppForm = React.useRef();
  // const startDateRefs = useRef(null);
  // const endDateRefs = useRef({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  const handleEdit = (recruitment) => {
    setEditedData(recruitment);
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      // Append files for Docs and DocName
      // file.forEach((item) => {
      //   if (item && item.Docs && item.DocName) {
      //     if (item.Docs instanceof File) {
      //       formData.append('Docs', item.Docs);
      //     }
      //     formData.append('DocName', item.DocName);
      //   }
      // });

      // Append date information directly as objects, not as a string
      const sendDate = date.filter(
        (dat) => dat.DateName !== '' && dat.Date !== null,
      );
      const LinkList = link.filter(
        (link) => link.URL !== '' && link.LinkName !== '',
      );
      const data = {
        service: refDesc.current!.value,
        Date: sendDate,
        LinkList: LinkList,
      };

      // Append application link
      // formData.append('ApplicationLink', refAppLink?.current?.value);

      const response = await axios.put(
        `${API}/recruitment/${editedData._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      toast.success(response.data.message);
      fetchData();
    } catch (err) {
      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
    setEditable(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/recruitment/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success(response.data.message);
      fetchData();
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <div
      className="flex mx-2 w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9"
      key={recruitment._id}
    >
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
          {editable ? (
            <input
              type="text"
              defaultValue={recruitment.service}
              ref={refDesc}
            />
          ) : (
            recruitment.service
          )}
        </h5>
        <p className="leading-relaxed text-[#D0915C]">
          {/* Start Date:{formatDate(recruitment.startDate)} */}
          {/* {editable ?  <TableDate Date={date} setDate={setDate}/>: */}
          {/* <> */}
          {date?.map((date) => (
            <div className="flex gap-2">
              <p>
                {date?.DateName} : {formatDate(date?.Date)}
              </p>
            </div>
          ))}
          {/* </>} */}
        </p>
        {/* <p className="leading-relaxed text-[#D0915C]">
          End Date:{formatDate(recruitment.endDate)}{' '}
          {editable && <DatePickerOne refDate={endDateRefs} />}
        </p> */}
        <div className='flex flex-row flex-wrap gap-2 mb-2'>
          {!addFile &&
            file?.map((file) => (
              <Link
                to={StaticLinkProvider(file?.DocPath)}
                target="_blank"
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                {file?.DocName}
              </Link>
            ))}
        </div>
        <>
          {link?.map((li) => (
            <Link
              to={li.URL}
              target="_blank"
              className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              {li.LinkName}
            </Link>
          ))}
        </>
        {addFile && (
          <TableEditFile
            File={file}
            setFile={setFile}
            recId={recruitment._id}
          />
        )}
        {/* <p className="leading-relaxed text-[#D0915C]">
          <div>
            {editable ? (
              <>
                <label
                  htmlFor="description"
                  className="mb-3 block text-black dark:text-white"
                >
                  Application Link
                </label>
                <input
                  id="description"
                  type="text"
                  defaultValue={recruitment.ApplicationLink}
                  ref={refAppLink}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </>
            ) : (
              <Link
                to={recruitment.ApplicationLink}
                className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Application Link
              </Link>
            )}
          </div>
        </p> */}
        {/* {editable ? (
          <>
            <label
              htmlFor="RecruitmentDoc"
              className="mb-3 block text-black dark:text-white"
            >
              Attach recruitment Doc
            </label>
            <input
              id="RecruitmentDoc"
              accept=".pdf"
              type="file"
              ref={refRecruitmentDoc}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </>
        ) : (
          <Link
            to={recruitment.RecruitmentDoc}
            className="inline-flex mt-2 items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Recruitment Doc
          </Link>
        )} */}

        <button
          className="inline-flex items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          onClick={editable ? handleSave : () => handleEdit(recruitment)}
        >
          {editable ? 'Save' : 'Edit'}
        </button>
        <button
          onClick={() => handleDelete(recruitment._id)}
          className="inline-flex ml-2 items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Delete
        </button>
        <button
          onClick={() => {
            setAddFile((prev) => !prev);

            if (addFile === true) {
              fetchData();
            }
          }}
          className="inline-flex ml-2 items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {addFile ? 'Done' : 'Add File'}
        </button>
      </div>
    </div>
  );
};

export default REditCard;
