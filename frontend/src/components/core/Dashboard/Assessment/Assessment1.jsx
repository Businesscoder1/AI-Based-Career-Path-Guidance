import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';
import IconBtn from "../../../Common/IconBtn"

const Assessment1 = () => {
  const [formData, setFormData] = useState({
    cgpa: '',
    courseStatus: '',
    academicAchievement: '',
    personalInterest: '',
    internship: '',
    certificates: '',
    leadership: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCgpaChange = (e) => {
    const value = e.target.value;
    if (value === '' || (value >= 0 && value <= 10)) {
      setFormData((prevData) => ({ ...prevData, cgpa: value }));
      setError('');
    } else {
      setError('CGPA must be between 0.0 and 10.0');
    }
  };

  const courseStatusOptions = [
    { label: 'In Progress', value: 'In_Progress' },
    { label: 'Completed', value: 'Completed' },
  ];

  const achievementOptions = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
  ];

  const yesNoOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const personalInterestOptions = [
    'Traveling',
    'Coding',
    'Gaming',
    'Reading',
    'Sports',
    'Music',
  ];

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(setAssessmentData({ step: 'assessment1', data: formData }));
    navigate('/dashboard/Assessment-page-2');
  };

  return (
    <form
      onSubmit={handleNext}
      className="my-10 text-white flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12"
    >
      <div>
        <h2 className='font-bold text-3xl text-yellow-100'>Lets Start The  Assessement by knowing your Skills</h2>
      </div>
      {/* CGPA Input */}
      <div className="flex flex-col w-full ">
        <label className="mb-1 text-pure-greys-100 font-bold text-lg">CGPA</label>
        <input
          placeholder="Enter CGPA (0.0 - 10.0)"
          value={formData.cgpa}
          onChange={handleCgpaChange}
          name="cgpa"
          type="number"
          step="0.1"
          min="0"
          max="10"
          className="form-style"
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      {/* Course Status Radio */}
      <div className="flex flex-col w-full">
        <label className="mb-1 font-bold text-pure-greys-100 text-lg  ">Course Status</label>
        <div className="flex space-x-4 p-2">
          {courseStatusOptions.map((option) => (
            <label key={option.value} className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                name="courseStatus"
                value={option.value}
                checked={formData.courseStatus === option.value}
                onChange={handleOnChange}
                className=" focus:ring-0 focus:ring-offset-0 checked:bg-yellow-300"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Academic Achievements */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-pure-greys-100 font-bold text-lg">Academic Achievements</label>
        <div className="flex space-x-4">
          {achievementOptions.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="academicAchievement"
                value={option.value}
                checked={formData.academicAchievement === option.value}
                onChange={handleOnChange}
                className=" focus:ring-0 focus:ring-offset-0 checked:bg-yellow-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Personal Interest Dropdown */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-pure-greys-100  font-bold text-lg">Personal Interest</label>
        <select
          value={formData.personalInterest}
          onChange={handleOnChange}
          name="personalInterest"
          className="form-style"
        >
          <option value="">Select Personal Interest</option>
          {personalInterestOptions.map((interest, index) => (
            <option key={index} value={interest}>
              {interest}
            </option>
          ))}
        </select>
      </div>

      {/* Internship Experience */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-pure-greys-100 font-bold text-lg">Internship Experience</label>
        <div className="flex space-x-4">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="internship"
                value={option.value}
                checked={formData.internship === option.value}
                onChange={handleOnChange}
                className=" focus:ring-0 focus:ring-offset-0 checked:bg-yellow-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-pure-greys-100 font-bold text-lg">Certificates</label>
        <div className="flex space-x-4">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="certificates"
                value={option.value}
                checked={formData.certificates === option.value}
                onChange={handleOnChange}
                className=" focus:ring-0 focus:ring-offset-0 checked:bg-yellow-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Leadership Experience */}
      <div className="flex flex-col w-full">
        <label className="mb-1 text-pure-greys-100 font-bold text-lg">Leadership Experience</label>
        <div className="flex space-x-4">
          {yesNoOptions.map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="leadership"
                value={option.value}
                checked={formData.leadership === option.value}
                onChange={handleOnChange}
                className=" focus:ring-0 cursor-pointer focus:ring-offset-0 checked:bg-yellow-500"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="px-4 py-2  rounded-md bg-gray-700 hover:bg-gray-500 text-white"
        >
          Cancel
        </button>
        <IconBtn type="submit" text="Next" />
      </div>
    </form>
  );
};

export default Assessment1;
