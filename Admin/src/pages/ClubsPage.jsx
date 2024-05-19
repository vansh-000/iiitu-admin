import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast ,{Toaster} from 'react-hot-toast';
import { API } from '../../../Faculty/src/utils/apiURl';
import { useNavigate, useParams } from 'react-router-dom';
const Clubs = () => {
    const { name } = useParams();
    const [data, setData] = useState();
    const [club, setClub] = useState();
    const navigate = useNavigate();
    const token=localStorage.getItem('token')
    const [socialLinks, setSocialLinks] = useState([
        {
            socialMedia: 'Facebook',
            link: ''
        }, {
            socialMedia: 'Instagram',
            link: ''
        }, {
            socialMedia: 'Twitter',
            link: ''
        }, {
            socialMedia: 'Linkedin',
            link: ''
        }, {
            socialMedia: 'Github',
            link: ''
        }, {
            socialMedia: 'Youtube',
            link: ''
        }
    ]);
    useEffect(() => {
        const foundClub = data?.find(club => club.Name === name);
        if (foundClub) {
            setClub(foundClub);
        }
    }, [data, name]);

    const [images, setImages] = useState([]);
    const nameRef = useRef();
    const linkRef = useRef();
    const descriptionRef = useRef();
    const facultyRef = useRef();
    const presidentRef = useRef();
    const handleEmpty = () => {
        nameRef.current.value = '';
        linkRef.current.value = '';
        descriptionRef.current.value = '';
        facultyRef.current.value = '';
        presidentRef.current.value = '';
        socialLinks.current.value = [
            {
                socialMedia: 'Facebook',
                link: ''
            }, {
                socialMedia: 'Instagram',
                link: ''
            }, {
                socialMedia: 'Twitter',
                link: ''
            }, {
                socialMedia: 'Linkedin',
                link: ''
            }, {
                socialMedia: 'Github',
                link: ''
            }, {
                socialMedia: 'Youtube',
                link: ''
            }
        ]
        setImages([]);
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const link = linkRef.current.value;
        const description = descriptionRef.current.value;
        const facultyId = facultyRef.current.value;
        const president = presidentRef.current.value;
        try {
            const formData = new FormData();
            images.forEach((image) => {
                formData.append("Logo", image);
            });
            formData.append("Name", name);
            formData.append("Link", link);
            formData.append("Description", description);
            formData.append("facultyIncharge", facultyId);
            formData.append("president", president);
            socialLinks.forEach((item, index) => {
                formData.append(`socialLinks[${index}][socialMedia]`, item.socialMedia);
                formData.append(`socialLinks[${index}][link]`, item.link);
            });
            await axios.put(`${API}/clubs/${club._id}`, formData, {
                headers: {
                    "Authorization":`Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });
            toast.success(`${name} Club updated successfully!`);
            handleEmpty();
            fetchData();
        }
        catch (err) {
            console.log("Error:", err);
        }
    }

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSocialLinks = [...socialLinks];
        updatedSocialLinks[index] = { ...updatedSocialLinks[index], [name]: value };
        setSocialLinks(updatedSocialLinks);
    };
    
    return (
        <DefaultLayout>
            <Breadcrumb pageName={`Edit ${name} Club Details`} />
            <Toaster />
            <form onSubmit={handleAdd}>
                <div>
                    <label className="mb-3 block text-black dark:text-white">
                        Name
                    </label>
                    <input
                        name="name"
                        type="text"
                        ref={nameRef}
                        placeholder="Name"
                        required
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className='mt-4'>
                    <label className="mb-3 block text-black dark:text-white">
                        Website Link
                    </label>
                    <input
                        name="websiteLink"
                        ref={linkRef}
                        type="text"
                        placeholder="Website Link"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className='mt-4'>
                    <label className="mb-3 block text-black dark:text-white">
                        Description
                    </label>
                    <input
                        name="description"
                        ref={descriptionRef}
                        type="text"
                        placeholder="Description"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className='mt-4'>
                    <label className="mb-3 block text-black dark:text-white">
                        Faculty Id
                    </label>
                    <input
                        name="facultyId"
                        ref={facultyRef}
                        required
                        type="text"
                        placeholder="Faculty Id"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className='mt-4'>
                    <label className="mb-3 block text-black dark:text-white">
                        President
                    </label>
                    <input
                        name="president"
                        ref={presidentRef}
                        required
                        type="text"
                        placeholder="President"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                </div>
                <div className='mt-4'>
                    <label className="mb-3 block text-black dark:text-white">
                        Social Links
                    </label>
                    <div className="flex flex-wrap gap-4">
                        <input
                            name="facebook"
                            type="text"
                            placeholder="Facebook"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                            name="instagram"
                            type="text"
                            placeholder="Instagram"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                            name="twitter"
                            type="text"
                            placeholder="Twitter"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                            name="linkedin"
                            type="text"
                            placeholder="Linkedin"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                            name="github"
                            type="text"
                            placeholder="Github"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                        <input
                            name="youtube"
                            type="text"
                            placeholder="Youtube"
                            onChange={(e) => handleInputChange(0, e)}
                            className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                    </div>
                </div>
                <button
                    className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Update Club
                </button>
            </form>
        </DefaultLayout>
    );
};

export default Clubs;