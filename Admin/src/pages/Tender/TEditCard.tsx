import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, STATIC_FILES } from '../../utils/apiURl';
import axios from 'axios';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import toast from 'react-hot-toast';

const TEditCard = ({ tender, fetchData, index }) => {
    const [editable, setEditable] = useState(false);
    const [editedData, setEditedData] = useState({});
    const refDesc = useRef<HTMLInputElement>(null);
    const refTenderDoc = useRef<HTMLInputElement>(null);
    const refAnnexure = useRef<HTMLInputElement>(null);
    const startDateRefs = useRef(null);
    const endDateRefs = useRef({});
    const navigate = useNavigate();
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
            const TenderDoc = refTenderDoc.current?.files[0];
            const annexure = refAnnexure.current?.files[0];
            const response = await axios.put(`${API}/tender/${editedData._id}`, {
                service: refDesc.current?.value,
                TenderDoc: TenderDoc,
                startDate: startDate,
                endDate: endDate,
                annexure: annexure
            }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            //   console.log(response);
            toast.success(response.data.message);
            fetchData();
        } catch (err) {
            if (err.response.status === 401) {
                return navigate('/signin');
            }
            toast.error(`Error: ${err}`);
        }
        setEditable(false);
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${API}/tender/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success(response.data.message);
            fetchData();
        } catch (err) {
            console.log("error", err);
            if (err.response.status === 401) {
                return navigate('/signin');
            }
            toast.error(`Error: ${err}`);
        }
    };

    return (
        <div className="flex mx-2 w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9" key={tender._id}>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    {editable ? (
                        <input type="text" defaultValue={tender.service} ref={refDesc} />
                    ) : (
                        tender.service
                    )}
                </h5>
                <p className="leading-relaxed text-[#D0915C] mt-4">
                    Start Date:{formatDate(tender.startDate)}
                    {editable && (
                        <DatePickerOne refDate={startDateRefs} />
                    )}
                </p>
                <p className="leading-relaxed text-[#D0915C] mt-4">
                    End Date:{formatDate(tender.endDate)} {editable && (
                        <DatePickerOne refDate={endDateRefs} />
                    )}
                </p>
                <div className="flex flex-row flex-wrap gap-x-4 gap-y-2 mt-4">
                    {editable ? <><label htmlFor="tenderDoc" className="mb-3 block text-black dark:text-white mt-4">Attach Tender Doc</label>
                        <input
                            id="tenderDoc"
                            accept=".pdf"
                            type="file"
                            ref={refTenderDoc}
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        /></> : <Link
                            to={`${STATIC_FILES}/${tender.TenderDoc.replace(
                                /\\/g,
                                '/'
                            )}` || tender.TenderDoc}
                            className="w-[170px] inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                        Tender Doc
                    </Link>
                    }
                    {editable ? <><label htmlFor="annexure" className="mb-3 block text-black dark:text-white mt-4">Attach Annexure</label>
                        <input
                            id="annexure"
      
                            ref={refAnnexure}
                            accept=".pdf"
                            type="file"
                            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                        /></> : <Link
                            to={`${STATIC_FILES}/${tender.annexure.replace(
                                /\\/g,
                                '/'
                            )}` || tender.annexure}
                            className="w-[170px] inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                        Annexure
                    </Link>
                    }
                    {/* </div> */}

                    {/* Edit and Delete buttons */}
                    {/* <div className="flex gap-4 mt-4"> */}
                    <button className="w-[170px] inline-flex items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" onClick={editable ? handleSave : () => handleEdit(tender, index)}>
                        {editable ? 'Save' : 'Edit'}
                    </button>
                    <button onClick={() => handleDelete(tender._id)} className="w-[170px] inline-flex items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TEditCard;