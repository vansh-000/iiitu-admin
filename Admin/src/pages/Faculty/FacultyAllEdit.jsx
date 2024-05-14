import React from 'react';
import { useParams } from 'react-router-dom';
import { API, STATIC_FILES } from '../../utils/apiURl';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';

const FacultyAllEdit = () => {
  const idd = useParams();
  const [faculty, setFaculty] = React.useState({});
  const [profileImage, setProfileImage] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [award,setAward]=React.useState('');
  const [research,setResearch]=React.useState('');
  const refProFileImg = React.useRef();
  const refResume=React.useRef();
  const refName=React.useRef();
  const refPhone=React.useRef();
  const refResearch=React.useRef();
  const refResearchInterest=React.useRef();
  const refEducation=React.useRef();
  const refAwardAndHonours=React.useRef();
  const refLinkedin=React.useRef();
  const refGoogleScholar=React.useRef();
  const [profileIMG,setProfileIMG]=React.useState();
  const [resumE,setResumE]=React.useState();
  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${API}/faculty/${idd.id}`);

      setFaculty(response.data);

      let educationString = '';
 
      for (let i = 0; i < response.data.Education.length; i++) {
        if (i === 0) {
          educationString = `${response.data.Education[0].dateOfStart}-${response.data.Education[0].dateOfEnd}:${response.data.Education[0].description}`;
        } else {
          educationString += `\n#${response.data.Education[i].dateOfStart}-${response.data.Education[i].dateOfEnd}:${response.data.Education[i].description}`;
        }
      }
      setEducation(educationString);
      setProfileIMG(`${STATIC_FILES}/${response.data.profileImage.replace(
        /\\/g,
        '/',
      )}`);
      setResumE(`${STATIC_FILES}/${response.data.resume.replace(
        /\\/g,
        '/',
      )}`)

      let award='';
      for(let a=0;a<response.data.AwardAndHonours.length;a++){
        if(a==0){
            award+=`${response.data.AwardAndHonours[a]}`;
        }
        else{
            award+=`\n#${response.data.AwardAndHonours[a]}`;
        }
    }
      setAward(award);
      let research='';
      for(let r=0;r<response.data.Research.length;r++){
        if(r==0){
            research+= `${response.data.Research[r]}`;

        }
        else{
            research += `\n#${response.data.Research[r]}`;
        }
      }
      setResearch(research);
    } catch (err) {
      console.error('error in dedicated faculty', err);
    }
  };

  React.useEffect(() => {
    fetchFaculty();
  }, []);
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };
  const handleOnSubmit=async(e)=>{
    e.preventDefault();
    try {
      // Parsing and appending education data
      const educationLines = refEducation.current.value.split('#');
      const educationData = educationLines.map((line) => {
        const [dateRange, description] = line.split(':', 2);
        const [startYear, endYear] = dateRange.split('-', 2);
        const cleanedEndYear = endYear.replace('\n', ''); // Remove the newline character
        
        return {
          dateOfStart: startYear,
          dateOfEnd: cleanedEndYear,
          description: description.trim(), // Trim to remove any leading/trailing spaces
        };
      });

      const response=await axios.put(`${API}/faculty/editDetails/${idd.id}`,{
        name: refName.current.value,
      
          mobile: refPhone.current.value,
          researchInterest: refResearchInterest.current.value,
          socialLink: [
            { social: 'Linkedin', link: refLinkedin.current.value },
            { social: 'GoogleScholar', link: refGoogleScholar.current.value },
          ],
          Research: refResearch.current.value.split('#'),
          AwardAndHonours: refAwardAndHonours.current.value.split('#'),
          Education: educationData,
      })

      toast.success(`${response.data.message}`)
      if (refResume.current.files[0] || refProFileImg.current.files[0]) {
        
        const data={
            profileImage:refProFileImg.current.files[0],
            resume:refResume.current.files[0],
            oldProfileImage:faculty.profileImage,
            oldResume:faculty.resume
          }
    //    console.log(data);
          const responsee = await axios.put(`${API}/faculty/editFiles/${idd.id}`, 
          
         data
          , {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          toast.success(`${responsee.data.message}`)
         
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Faculty Edit" />
        <form onSubmit={handleOnSubmit}>
        <div className="flex w-full border-l-6 flex-col border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {faculty && faculty.profileImage && (
                <img
                  src={
                    profileImage ||
                    profileIMG
                  }
                  alt="profile"
                  className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center max-h-40"
                />
              )}
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
            </div>
          </div>
              <div>
              <label
              className="mb-3 block text-black dark:text-white"
              htmlFor="resume"
            >
              Resume:
            </label>

            <input
className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"

              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              ref={refResume}
            //   required
            />
              </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Name
            </label>
            <input
              name="title"
              type="text"
              // ref={titleRef}
              ref={refName}
              placeholder="Name"
              defaultValue={faculty.name}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Google Scholer
            </label>
            <input
              name="title"
              type="text"
              // ref={titleRef}
              ref={refGoogleScholar}
              placeholder="Google Scholer Link"
              defaultValue={
                faculty.socialLink && faculty.socialLink[1]
                  ? faculty.socialLink[1].link
                  : ''
              }
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Linkedin
            </label>
            <input
              name="title"
              type="text"
              // ref={titleRef}

              ref={refLinkedin}
              placeholder="LinkedIn Link"
              defaultValue={
                faculty.socialLink && faculty.socialLink[0]
                  ? faculty.socialLink[0].link
                  : ''
              }
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-3 block text-black dark:text-white">
              Research Intrest
            </label>
            <input
              name="title"
              type="text"
              // ref={titleRef}
              ref={refResearchInterest}
              placeholder="Research Intrest (eg.Machine Learning,Internet of Things,Wireless Sensor Network"
              defaultValue={faculty.researchInterest}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Phone Number(+91)
            </label>

            <input
              name="title"
              type="text"
              // ref={titleRef}
              ref={refPhone}
              placeholder="Phone Number (eg.7352xxxx)"
              defaultValue={faculty.mobile}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Education:
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_88_10224">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>

              <textarea
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                id="bio"
                rows={6}
                ref={refEducation}
                placeholder="2021-2026:education#2006-2009:education"
                defaultValue={education}
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Awards and Honers:
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_88_10224">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>

              <textarea
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                id="bio"
                rows={6}
                ref={refAwardAndHonours}
                placeholder="Award1#Award2Award3"
                defaultValue={award}
              />
            </div>
          </div>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Research
            </label>
            <div className="relative">
              <span className="absolute left-4.5 top-4">
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                      fill=""
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_88_10224">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </span>

              <textarea
                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                name="bio"
                ref={refResearch}
                id="bio"
                rows={6}
                placeholder="Research1#Research2#Research3"
                defaultValue={research}
              />
            </div>
            <input
              className="inline-flex items-center justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              type="Submit"
              value="Register"
            />
          </div>
        </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default FacultyAllEdit;
