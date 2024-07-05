import { API } from "../../utils/apiURl";
import axios from "axios";
import { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ResearchCardProvider from "./ResearchCardProvider";
const EditResearch = () => {
  const [data, setData] = useState([]);
  const fetchResearch = async () => {
    try {
    
      let response = await axios.get(`${API}/research`);
      if (response.status === 200) {
        // console.log(response.data.research);
        setData(response.data.research);
      }
      //   setFetchDone(true);
    } catch (err) {
      console.error("Error in research", err);
      //   setFetchDone(false);
    }
  };
  useEffect(() => {
    fetchResearch();
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Research" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <ResearchCardProvider data={data} fetchData={fetchResearch} />
        </div>
      </div>
    </DefaultLayout>
  )
}

export default EditResearch;