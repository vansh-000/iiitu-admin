import RecruitmentEditCard from "./RecruitmentEditCard"
import { API } from "../../utils/apiURl";
import axios from "axios";
import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
const RecruitmentEdits=()=>{
    const [data, setData]=useState([]);
    const fetchRecruitment = async () => {
        try {
    
          let response = await axios.get(`${API}/recuitment`);
          if (response.status === 200) {
            setData(response.data);
            console.log(response.data);
          }
        //   setFetchDone(true);
        } catch (err) {
          console.error("Error in Recruitment", err);
        //   setFetchDone(false);
        }
      };
    useEffect(()=>{
        fetchRecruitment();
    },[])
    return (
      <DefaultLayout>
        <Breadcrumb pageName="Edit Recruitment"/>
        <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
        <RecruitmentEditCard data={data} fetchData={fetchRecruitment}/>
        </div>
        </div>
      </DefaultLayout>
    )
}
export default RecruitmentEdits;