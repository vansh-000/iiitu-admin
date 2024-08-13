import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API, STATIC_FILES } from '../../utils/apiURl';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import TableEducation from '../../components/Tables/TableEducation';
import TableResearch from '../../components/Tables/TableResearch';
import TableAwards from '../../components/Tables/TableAwards';
import TableProjects from '../../components/Tables/TableProjects';

const FacultyAllEdit = () => {
  const idd = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = React.useState({});
  const [profileImage, setProfileImage] = React.useState('');
  const [education, setEducation] = useState([]);
  const [research, setResearch] = useState([]);
  const [award, setAward] = useState([]);
  const [project, setProject] = useState([]);
  const refProFileImg = React.useRef();
  const refResume = React.useRef();
  const refName = React.useRef();
  const refPhone = React.useRef();
  const refResearchInterest = React.useRef();
  const refLinkedin = React.useRef();
  const refGoogleScholar = React.useRef();
  const refOrcid = React.useRef();
  const refWebsite=React.useRef();
  const [profileIMG, setProfileIMG] = React.useState();
  const fetchFaculty = async () => {
    try {
      const response = await axios.get(`${API}/faculty/${idd.id}`);
      setFaculty(response.data);
      setAward(response.data.AwardAndHonours);
      setEducation(response.data.Education);
      setProject(response.data.Projects);
      setResearch(response.data.Research);
      setProfileIMG(response.data.profileImage);
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
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
            const newEducation = education.length === 0 ? [] : education.filter((edu) => edu.description !== '');
            const newAward = award.length === 0 ? [] : award.filter((awa) => awa !== '');
            // const newPublication = publication.length === 0 ? [] : publication.filter((pub) => pub !== '');    
            // const newJournal = journal.length === 0 ? [] : journal.filter((jor) => jor !== '');
            const newProject = project.length === 0 ? [] : project.filter((pro) => pro.Title !== '');
            const newResearch = research.length === 0 ? [] : research.filter((res) => res !== '');   
      const response = await axios.put(
        `${API}/faculty/editDetails/${idd.id}`,
        {
          name: refName.current.value,

          mobile: refPhone.current.value,
          researchInterest: refResearchInterest.current.value,
          socialLink: [
            { social: 'Linkedin', link: refLinkedin.current.value },
            { social: 'GoogleScholar', link: refGoogleScholar.current.value },
            { social: 'Orcid', link: refOrcid.current.value },{ social:'Website',link: refWebsite.current.value}

          ],
          AwardAndHonours: newAward,
          Education: newEducation,
          Projects: newProject,
          Research: newResearch,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      toast.success(`${response.data.message}`);
      if (refResume.current.files[0] || refProFileImg.current.files[0]) {
        const data = {
          profileImage: refProFileImg.current.files[0],
          resume: refResume.current.files[0],
          oldProfileImage: faculty.profileImage,
          oldResume: faculty.resume,
        };
        const responsee = await axios.put(
          `${API}/faculty/editFiles/${idd.id}`,

          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'multipart/form-data',
            },
          },
        );
        toast.success(`${responsee.data.message}`);
      }
    } catch (err) {
      console.log(err);
      
      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };
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
                    src={profileImage ?profileImage: profileIMG}
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
                    accept="image/*"
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
                Orcid
              </label>
              <input
                name="title"
                type="text"
                // ref={titleRef}

                ref={refOrcid}
                placeholder="Orcid Link"
                defaultValue={
                  faculty.socialLink && faculty.socialLink[2]
                    ? faculty.socialLink[2].link
                    : ''
                }
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Website
              </label>
              <input
                name="title"
                type="text"
                // ref={titleRef}

                ref={refWebsite}
                placeholder="Website Link"
                defaultValue={
                  faculty.socialLink && faculty.socialLink[3]
                    ? faculty.socialLink[3].link
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

            {education && (
              <TableEducation
                Education={education}
                setEducation={setEducation}
              />
            )}
            {research && (
              <TableResearch Research={research} setResearch={setResearch} />
            )}
            {award && <TableAwards Award={award} setAward={setAward} />}
            {/* {publication && (
              <TablePublications
                Publication={publication}
                setPublication={setPublication}
              />
            )}
            {journal && (
              <TableJournals Journal={journal} setJournal={setJournal} />
            )} */}
            {project && (
              <TableProjects Project={project} setProject={setProject} />
            )}
            <div>
              <input
                className="inline-flex items-center mt-4 justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 hover:cursor-pointer"
                type="Submit"
                value="Save"
              />
            </div>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
};

export default FacultyAllEdit;
