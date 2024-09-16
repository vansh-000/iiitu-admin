import React, { useState } from 'react';
import { IoCloseCircleOutline } from 'react-icons/io5';

const NewsModal = ({ setModal, onSubmit }) => {
  const [formData, setFormData] = useState({
    heading: '',
    image: '',
    doc: '',
    description: '',
    startDate: '',
    endDate: '',
    Link: '',
    isLatest: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1001] bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[320px] sm:w-full h-[80%] overflow-y-scroll max-w-md transform transition-all duration-300 ease-in-out animate-slide-in-up">
        <div className="flex justify-end">
          <IoCloseCircleOutline
            onClick={() => setModal(false)}
            className="text-gray-500 hover:text-themeblue1 text-[2rem] cursor-pointer transition-colors duration-200"
          />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          News Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="heading"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Heading
            </label>
            <input
              type="text"
              id="heading"
              placeholder="Enter the heading"
              value={formData.heading}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="image"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Image URL
            </label>
            <input
              type="text"
              id="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="doc"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Document URL
            </label>
            <input
              type="text"
              id="doc"
              placeholder="Enter document URL"
              value={formData.doc}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="startDate"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="endDate"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Link"
              className="block text-md sm:text-lg font-medium text-gray-700 mb-2"
            >
              Link
            </label>
            <input
              type="text"
              id="Link"
              placeholder="Enter a link"
              value={formData.Link}
              onChange={handleChange}
              className="w-full text-[0.9rem] sm:text-[1rem] px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              type="checkbox"
              id="isLatest"
              checked={formData.isLatest}
              onChange={handleChange}
              className="h-5 w-5 text-themeblue1 border-gray-300 rounded focus:ring-2 focus:ring-themeblue1 transition-shadow"
            />
            <label
              htmlFor="isLatest"
              className="ml-2 text-md sm:text-lg font-medium text-gray-700"
            >
              Is Latest
            </label>
          </div>
          <button
            type="submit"
            className="bg-themered1 text-white font-medium text-md sm:text-lg px-4 py-3 rounded-lg w-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-transform transform hover:scale-[1.02]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsModal;
