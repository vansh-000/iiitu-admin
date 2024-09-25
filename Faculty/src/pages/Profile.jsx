import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaOrcid } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import { BsGlobe2 } from 'react-icons/bs';
import TableThree from '../components/Tables/TableEducation';
import TableResearch from '../components/Tables/TableResearch';
import TableAwards from '../components/Tables/TableAwards';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import TablePublications from '../components/Tables/TablePublications';
import TableProjects from '../components/Tables/TableProjects';
import TableOther from '../components/Tables/TableOther';
import { StaticLinkProvider } from '../utils/StaticLinkProvider';
import { FaRegEdit } from 'react-icons/fa';
import TableExperience from '../components/Tables/TableExperience';
import TableSupervision from '../components/Tables/TableSupervision';
import TableWorkshop from '../components/Tables/TableWorkshop';

const Profile = () => {
  const nevigat = useNavigate();
  const [faculty, setFaculty] = useState({});
  const [clubName, setClubName] = useState();
  const [editable, setEditable] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [education, setEducation] = useState([]);
  const [other, setOther] = useState([]);
  const [award, setAward] = useState([]);
  const [publication, setPublication] = useState([]);
  // const [journal, setJournal] = useState([]);
  // const [journal, setJournal] = useState([]);
  const [project, setProject] = useState([]);
  const [research, setResearch] = useState([]);

  const [experience, setExperience] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [supervision, setSupervision] = useState([]);

  const refProFileImg = useRef();
  const refResume = useRef();
  const refName = useRef();
  const refPhone = useRef();
  const refDesignation = useRef();
  const refResearchInterest = useRef();
  const refLinkedin = useRef();
  const refGoogleScholar = useRef();
  const refOrcid = useRef();
  const refWeb = useRef();
  const userData = JSON.parse(localStorage.getItem('user'));
  const ClubName = localStorage.getItem('ClubName');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API}/faculty/facultyProfile/${userData?.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );
      if (response.status === 200) {
        console.log(response.data);
        setFaculty(response?.data);
        setEducation(response?.data?.Education);
        setAward(response?.data?.AwardAndHonours);
        setPublication(response?.data?.Publications);
        setResearch(response?.data?.Research);
        setProject(response?.data?.Projects);
        setOther(response?.data?.other);
        setExperience(response?.data?.Experience);
        setWorkshop(response?.data?.Workshop),
        setSupervision(response?.data?.Supervision);

      }
    } catch (err) {
      console.log('Error', err);
      if (
        !localStorage.getItem('token') ||
        !localStorage.getItem('token') ||
        err.response.status === 401 ||
        err.response.status === 404
      ) {
        nevigat('/');
      }
    }
  };

  const fetchClub = async () => {
    try {
      const response = await axios.get(`${API}/clubs/faculty/${userData?.id}`);
      setClubName(response.data.data.Name);
      localStorage.setItem('ClubName', response.data.data._id);
    } catch (err) {
      if (err.response.status === 404) {
        localStorage.removeItem('ClubName');
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchClub();
  }, []);

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const newEducation = education.filter((edu) => edu.description !== '');
      const newExperience = experience.filter(
        (edu) => edu.organisation !== '' || edu.position !== '',
      );
      const newSupervision = supervision.filter(
        (e) => e.program !== '' || e.topic !== '' || e.scholar !== ''
      );
      const newWorkshop = workshop.filter(
        (e)=> e.title !== '' || e.type !== '' || e.venue !== ''
      )
      const newAward = award.filter((awa) => awa !== '');
      // const newJournal = journal.filter((jor) => jor !== '');
      // const newProject = project.filter((pro) => pro.Title !== '');
      const newResearch = research.filter((res) => res !== '');
      const newOther = other.filter((oth) => oth !== '');
      const userID = JSON.parse(localStorage.getItem('user')).id;
      const data = {
        name: refName.current.value,

        mobile: refPhone.current.value,
        researchInterest: refResearchInterest.current.value,
        socialLink: [
          { social: 'Linkedin', link: refLinkedin.current.value },
          { social: 'GoogleScholar', link: refGoogleScholar.current.value },
          { social: 'Orcid', link: refOrcid.current.value },
          { social: 'Website', link: refWeb.current.value },
        ],
        Research: newResearch,
        AwardAndHonours: newAward,
        Education: newEducation,
        Experience: newExperience,
        Supervision: newSupervision,
        Workshop: newWorkshop,
        other: newOther,
        // Journals: newJournal,
        // Journals: newJournal,
        // Projects: newProject,
      };
      // console.log(newProject);

      const response = await axios.put(
        `${API}/faculty/editDetails/${userID}`,
        data,
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
          `${API}/faculty/editFiles/${userID}`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        );
        toast.success(`${responsee.data.message}`);
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
  const handleClubEvents = () => {
    nevigat('/events');
  };
  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    const phoneRegex = /^\d{10}$/; // Regex for 10-digit phone number

    if (!phoneRegex.test(phoneNumber)) {
      return toast.error(
        'Invalid phone number. Please enter a 10-digit phone number.',
      );
      // You can display an error message or disable form submission here
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Save and edit buttons */}
        <div className="flex flex-row gap-4 absolute">
          <button
            onClick={editable ? handleSave : handleEdit}
            className={`w-20 text-white ml-2 my-2 p-1 rounded sm:p-2 sm:ml-4 sm:my-4 ${
              editable
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {editable ? (
              'Save'
            ) : (
              <span className="flex items-center justify-center gap-1">
                <FaRegEdit />
                Edit
              </span>
            )}
          </button>

          {editable && (
            <button
              onClick={() => setEditable(false)}
              className="w-20 bg-red-500 hover:bg-red-600 text-white my-2 p-1 rounded sm:p-2 sm:my-4"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Profile section */}
        <div className="md:flex md:flex-row md:gap-20 md:pl-36 md:pt-8 px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          {/* Profile Image */}
          <div className="relative mx-auto md:mx-0">
            {faculty?.profileImage && (
              <img
                src={profileImage || StaticLinkProvider(faculty?.profileImage)}
                alt="profile"
                className="object-cover mx-auto w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 mt-10 rounded-full border-4 border-white shadow-lg"
              />
            )}

            {editable && (
              <label
                htmlFor="profile"
                className="absolute bottom-2 right-[40%] md:bottom-[60%] md:right-4 bg-primary text-white p-2 rounded-full cursor-pointer z-20 flex items-center justify-center shadow-lg transition-all hover:bg-primary-dark"
              >
                <svg
                  className="fill-current"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638Z"
                    fill="currentColor"
                  />
                </svg>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  accept="image/*"
                  className="sr-only"
                  ref={refProFileImg}
                  onChange={handleProfileImageChange}
                />
              </label>
            )}
          </div>

          <div className="mt-14 flex flex-col items-center">
            {ClubName && (
              <button
                onClick={handleClubEvents}
                className="cursor-pointer mb-4 bg-gray-800 px-3 py-2 bg-green-600 rounded-md text-white tracking-wider shadow-xl animate-bounce hover:animate-none"
              >
                {clubName} Events
              </button>
            )}
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {editable ? (
                <input
                  name="name"
                  type="text"
                  ref={refName}
                  defaultValue={faculty.name}
                  placeholder="Enter Name"
                  className="w-[90%] mx-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                faculty.name
              )}
            </h3>
            {editable ? (
              <div>
                {faculty.resume && (
                  <label className="block text-black dark:text-white text-start text-[1rem] mt-2 mb-1">
                    For Change Resume{' '}
                    <Link
                      to={StaticLinkProvider(faculty.resume)}
                      target="_blanck"
                      className="text-blue-500 cursor-pointer "
                    >
                      Exiting Resume
                    </Link>
                  </label>
                )}
                <input
                  className="w-auto cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  ref={refResume}
                />
              </div>
            ) : (
              faculty.resume && (
                <Link
                  to={StaticLinkProvider(faculty.resume)}
                  className="w-fit flex flex-col items-center justify-center gap-1 text-[1.1rem] text-[#0000EE] underline px-4 dark:border-stroke border-strokedark xsm:flex-row"
                >
                  View Resume
                </Link>
              )
            )}
            <div className="mx-auto mt-4.5 mb-5.5 grid max-w-[300px] sm:max-w-[500px] grid-cols-4 gap-2 rounded-md border border-stroke p-2.5 shadow-1 dark:border-strokedark dark:bg-[#37404F]">
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
                faculty.socialLink && (
                  <Link
                    to={faculty.socialLink[0]?.link}
                    className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"
                  >
                    <FaLinkedin className="text-2xl" />
                  </Link>
                )
              )}
              {editable ? (
                <input
                  name="title"
                  type="text"
                  ref={refGoogleScholar}
                  placeholder="Google Scholar Link"
                  defaultValue={
                    faculty.socialLink && faculty?.socialLink[1]
                      ? faculty.socialLink[1].link
                      : ''
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                faculty.socialLink && (
                  <Link
                    to={faculty.socialLink[1]?.link}
                    className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"
                  >
                    <SiGooglescholar className="text-2xl" />
                  </Link>
                )
              )}
              {editable ? (
                <input
                  name="title"
                  type="text"
                  ref={refOrcid}
                  placeholder="Orcid Link"
                  defaultValue={
                    faculty.socialLink && faculty?.socialLink[2]
                      ? faculty.socialLink[2].link
                      : ''
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                faculty.socialLink && (
                  <Link
                    to={faculty?.socialLink[2]?.link}
                    className="flex flex-col items-center justify-center gap-2 border-r border-stroke px-4 dark:border-strokedark xsm:flex-row"
                  >
                    <FaOrcid className="text-2xl" />
                  </Link>
                )
              )}
              {editable ? (
                <input
                  name="title"
                  type="text"
                  ref={refWeb}
                  placeholder="Website Link"
                  defaultValue={
                    faculty.socialLink && faculty?.socialLink[3]
                      ? faculty.socialLink[3].link
                      : ''
                  }
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              ) : (
                faculty.socialLink && (
                  <Link
                    to={faculty?.socialLink[3]?.link}
                    className="flex flex-col items-center justify-center gap-2 px-4 xsm:flex-row"
                  >
                    <BsGlobe2 className="text-2xl" />
                  </Link>
                )
              )}
            </div>

            <div className="mx-auto max-w-180">
              <ul className="mt-4.5 text-black dark:text-white">
                <li className="text-[1.1rem]  flex items-center h-auto max-h-max">
                  <span className="text-nowrap">Research Intrest:</span>
                  {editable ? (
                    <textarea
                      name="Research"
                      ref={refResearchInterest}
                      placeholder="Research Interest"
                      defaultValue={faculty.researchInterest}
                      className="ml-2 h-34 text-wrap w-full max-w-90 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary resize-none"
                      rows="4"
                    ></textarea>
                  ) : (
                    <span className="pl-3">{faculty.researchInterest}</span>
                  )}
                </li>
                <li className="text-[1.1rem] mt-2">
                  Phone: +91-
                  {editable ? (
                    <input
                      name="title"
                      type="text"
                      ref={refPhone}
                      placeholder="e.g., 7352xxxx"
                      defaultValue={faculty.mobile}
                      pattern="^\d{10}$"
                      title="Please enter a valid 10-digit phone number."
                      className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  ) : (
                    faculty.mobile
                  )}
                </li>
                <li className="text-[1.1rem] mt-2">
                  {!editable && (
                    <>
                      {' '}
                      Designation:
                      <span className="pl-3">{faculty?.designation}</span>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {education && (
        <TableThree
          edit={editable}
          Education={education}
          setEducation={setEducation}
        />
      )}

      {experience && (
        <TableExperience
          edit={editable}
          experience={experience}
          setExperience={setExperience}
        />
      )}

      {research && (
        <TableResearch
          edit={editable}
          Research={research}
          setResearch={setResearch}
        />
      )}

      {supervision && (
        <TableSupervision
          edit ={editable}
          Supervision= {supervision}
          setSupervision={setSupervision}
        />
      )}
      {award && (
        <TableAwards edit={editable} Award={award} setAward={setAward} />
      )}
      {publication && (
        <TablePublications
          edit={editable}
          Publication={publication}
          setPublication={setPublication}
        />
      )}
      {project && (
        <TableProjects
          edit={editable}
          Project={project}
          setProject={setProject}
        />
      )}

      {
        workshop &&
        (
          <TableWorkshop
            edit={editable}
            Workshop={workshop}
            setWorkshop={setWorkshop}
          />
        )
      }
      {other && (
        <TableOther edit={editable} Other={other} setOther={setOther} />
      )}
      {editable && (
        <button
          onClick={editable ? handleSave : () => handleEdit()}
          className={`${
            editable
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white right-0 hover:bg-opacity-90 absolute p-2 m-4 md:m-6 2xl:mt-5 2xl:mr-10 rounded sm:px-5 sm:py-2`}
        >
          {editable ? 'Save' : 'Edit'}
        </button>
      )}
    </DefaultLayout>
  );
};

export default Profile;
