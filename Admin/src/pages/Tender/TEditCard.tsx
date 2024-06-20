import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { API, STATIC_FILES } from '../../utils/apiURl';
import axios from 'axios';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';

const TEditCard = ({ tender, fetchData, index }) => {
    const [editable, setEditable] = useState(false);
    const [editedData, setEditedData] = useState({});
    const refDesc = useRef<HTMLInputElement>(null);
    const refTenderDoc = useRef<HTMLInputElement>(null);
    const refAnnexure = useRef<HTMLInputElement>(null);
    const startDateRefs = useRef(null);
    const endDateRefs = useRef({});

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(-2);
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}-${formattedMonth}-${year}`;
    };

    const handleEdit = (tender, index) => {
        setEditedData(tender);
        setEditable(true);
    };

    const handleSave = async () => {
        try {
            const startDate = startDateRefs.current?.value || editedData.startDate;
            const endDate = endDateRefs.current?.value || editedData.endDate;
            const TenderDoc=refTenderDoc.current?.files[0];
            const annexure=refAnnexure.current?.files[0];
            const response=await axios.put(`${API}/tender/${editedData._id}`, {
                service:refDesc.current?.value,
                TenderDoc:TenderDoc,
                startDate:startDate,
                endDate:endDate,
                annexure:annexure
            },{
                headers: {
                     "Authorization":`Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
                }
              });
            alert(response.data.message);
            fetchData();
        } catch (err) {
            console.error(err);
        }
        setEditable(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API}/tender/${id}`,);
            alert(response.data.message);
            fetchData();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9" key={tender._id}>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    {editable ? (
                        <input type="text" defaultValue={tender.service} ref={refDesc} />
                    ) : (
                        tender.service
                    )}
                </h5>
                <p className="leading-relaxed text-[#D0915C]">
                    Start Date:{formatDate(tender.startDate)}
                    {editable && (
                        <DatePickerOne refDate={startDateRefs} />
                    )}
                </p>
                <p className="leading-relaxed text-[#D0915C]">
        End Date:{formatDate(tender.endDate)} {editable &&(
           <DatePickerOne refDate={endDateRefs} />
        )}
      </p>
      {editable?<><label htmlFor="tenderDoc" className="mb-3 block text-black dark:text-white">Attach Tender Doc</label>
      <input
        id="tenderDoc"
        accept=".pdf"
        type="file"
        ref={refTenderDoc}
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      /></>:<Link
      to={`${STATIC_FILES}/${tender.TenderDoc.replace(
        /\\/g,
        '/'
      )}` || tender.TenderDoc}
      className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      Tender Doc
    </Link>}
      {editable?<><label htmlFor="annexure" className="mb-3 block text-black dark:text-white">Attach Annexure</label>
      <input
        id="annexure"
      
        ref={refAnnexure}
        accept=".pdf"
        type="file"
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      /></>:<Link
      to={`${STATIC_FILES}/${tender.annexure.replace(
        /\\/g,
        '/'
      )}` || tender.annexure}
      className="inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
    >
      Annexure
    </Link>}

                {/* Similar logic for End Date */}

                {/* Attach Tender Doc and Attach Annexure inputs */}

                {/* Edit and Delete buttons */}
                <button className="inline-flex items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={editable ? handleSave : () => handleEdit(tender, index)}>
                    {editable ? 'Save' : 'Edit'}
                </button>
                <button onClick={() => handleDelete(tender._id)} className="inline-flex items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TEditCard;
