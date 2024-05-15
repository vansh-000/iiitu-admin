import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
// import userSix from '../images/user/user-06.png';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import TableThree from '../components/Tables/TableEducation';
import TableResearch from '../components/Tables/TableResearch';
import TableAwards from '../components/Tables/TableAwards';
import { API, STATIC_FILES } from '../../../Admin/src/utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import toast from 'react-hot-toast';
const Profile = () => {
  const nevigat = useNavigate();
  const [faculty, setFaculty] = useState({});
  const [editable, setEditable] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [education, setEducation] = useState([]);
  const [award, setAward] = useState([]);
  const [research, setResearch] = useState([]);
  const refProFileImg = useRef();
  const refResume = useRef();
  const refName = useRef();
  const refPhone = useRef();
  const refResearchInterest = useRef();
  const refLinkedin = useRef();
  const refGoogleScholar = useRef();
  const fetchData = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${API}/faculty/facultyProfile/${userData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.status === 200) {
        setFaculty(response.data);
        setEducation(response.data.Education);
        setAward(response.data.AwardAndHonours);
        setResearch(response.data.Research);
      }
    } catch (err) {
      console.log('Error', err);
     
      if (!localStorage.getItem('token')||err.response.status === 401 || err.response.status === 404) {
        nevigat('/auth/signin');
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const newEducation = education.filter((edu) => edu.description !== '');
      const newAward = award.filter((awa) => awa !== '');
      const newResearch = research.filter((res) => res !== '');
      const userID=JSON.parse(localStorage.getItem('user')).id;
      const data={
        name: refName.current.value,
      
          mobile: refPhone.current.value,
          researchInterest: refResearchInterest.current.value,
          socialLink: [
            { social: 'Linkedin', link: refLinkedin.current.value },
            { social: 'GoogleScholar', link: refGoogleScholar.current.value },
          ],
          Research:newResearch,
          AwardAndHonours:newAward,
          Education: newEducation,
      }
      const response=await axios.put(`${API}/faculty/editDetails/${userID}`,data,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
    )
      toast.success(`${response.data.message}`)
      if (refResume.current.files[0] || refProFileImg.current.files[0]) {
        const data={
            profileImage:refProFileImg.current.files[0],
            resume:refResume.current.files[0],
            oldProfileImage:faculty.profileImage,
            oldResume:faculty.resume
          }
          const responsee = await axios.put(`${API}/faculty/editFiles/${userID}`, 
         data
          , {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          toast.success(`${responsee.data.message}`)
         
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setEditable(false);
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <button
          onClick={editable ? handleSave : () => handleEdit()}
          className="bg-primary text-white hover:bg-opacity-90 absolute mx-2 my-2 p-1 rounded sm:p-2 sm:mx-4 sm:my-4"
        >
          {editable ? 'Save' : 'Edit'}
        </button>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {faculty && faculty.profileImage && (
                <img
                  src={
                    profileImage ||
                    `${STATIC_FILES}/${faculty.profileImage.replace(
                      /\\/g,
                      '/',
                    )}`
                  }
                  alt="profile"
                />
              )}
              {editable && (
                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>

                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    className="sr-only"
                    ref={refProFileImg}
                    onChange={handleProfileImageChange}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {editable ? (
                <input
                  name="name"
                  type="text"
                  ref={refName}
                  defaultValue={faculty.name}
                  placeholder="Enter Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                faculty.name
              )}
            </h3>
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-94 grid-cols-3 rounded-md border border-stroke py-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
              {editable ? (
                <input
                  name="title"
                  type="text"
                  ref={refLinkedin}
                  placeholder="Linkedin Link"
                  defaultValue={
                    faculty.socialLink && faculty.socialLink[0]
                      ? faculty.socialLink[0].link
                      : ''
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                <Link className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <FaLinkedin className="text-2xl" />
                </Link>
              )}
              {editable ? (
                <input
                  name="title"
                  type="text"
                  // ref={titleRef}
                  ref={refGoogleScholar}
                  placeholder="Google Scholar Link"
                  defaultValue={
                    faculty.socialLink && faculty.socialLink[1]
                      ? faculty.socialLink[1].link
                      : ''
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                <Link className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  <SiGooglescholar className="text-2xl" />
                </Link>
              )}
              {editable ? (
                <input
                  className="w-auto cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  ref={refResume}
                
                />
              ) : (
                <Link className="flex flex-col items-center justify-center gap-1 text-black dark:text-white border-r border-stroke px-4 dark:border-strokedark xsm:flex-row">
                  Resume
                </Link>
              )}
            </div>

            <div className="mx-auto max-w-180">
              <ul className="mt-4.5 text-black dark:text-white">
                <li>
                  Research Intrest:
                  {editable ? (
                    <input
                      name="Resreach"
                      type="text"
                      // ref={titleRef}
                      ref={refResearchInterest}
                      placeholder="Research Intreast"
                      defaultValue={faculty.researchInterest}
                      className="w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  ) : (
                    faculty.researchInterest
                  )}
                </li>
                <li>
                  Phone:
                  {editable ? (
                    <input
                      name="title"
                      type="text"
                      // ref={titleRef}
                      ref={refPhone}
                      placeholder="Phone Number (eg.7352xxxx)"
                      defaultValue={faculty.mobile}
                      className="w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  ) : (
                    faculty.mobile
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* {console.log(faculty.Education)} */}
      {education && (
        <TableThree
          edit={editable}
          Education={education}
          setEducation={setEducation}
        />
      )}
      {research && (
        <TableResearch
          edit={editable}
          Research={research}
          setResearch={setResearch}
        />
      )}
      {award && (
        <TableAwards edit={editable} Award={award} setAward={setAward} />
      )}
    </DefaultLayout>
  );
};

export default Profile;
