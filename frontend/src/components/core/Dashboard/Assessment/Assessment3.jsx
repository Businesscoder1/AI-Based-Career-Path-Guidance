import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitAssessment } from '../../../../services/operations/assessmentAPI';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';
import IconBtn from '../../../Common/IconBtn';
const Assessment3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);

  const ratingsList = [
    'Python',
    'Java',
    'C++',
    'JavaScript',
    'C#',
    'PHP',
    'Ruby',
    'Swift',
    'Go',
    'Rust',
    'Others',
    'Interest_In_Software_Dev',
    'Interest_In_Database_Management',
    'Interest_In_Networking_Skills',
    'Interest_In_WebDevelopment',
  ];

  const [ratings, setRatings] = useState({});
  const formData = useSelector((state) => state.assessment.formData);

  const handleRatingChange = (skill, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [skill]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setAssessmentData({ step: 'assessment3', data: { ratings } }));

    const finalFormData = { ...formData, assessment3: { ratings }, email: user?.email };
    dispatch(submitAssessment(finalFormData, navigate));
  };

  const handleBack = () => {
    navigate('/dashboard/Assessment-page-2');
  };

  const Slider = ({ skillName, value, onChange }) => {
    return (
      <div className="relative w-full p-2 mb-4">
        <label className="block text-lg p-1  font-bold text-white mb-2">{skillName}</label>
        <input
          type="range"
          min="0"
          max="10"
          value={value || 0}
          onChange={(e) => onChange(skillName, Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none bg-gray-300 cursor-pointer"
          style={{
            background: `linear-gradient(to right, #facc15 ${value * 10}%, #d1d5db ${value * 10}%)`,
          }}
        />
        <span
          className="absolute -top-0.5 left-0 text-sm font-semibold text-yellow-300"
          style={{ left: `calc(${value * 10}% - 10px)` }}
        >
          {value}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="my-10 text-white flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <h1 className="text-3xl font-semibold text-center text-yellow-100 mb-8">
        Evaluate Your Proficiency in Programming and Technical Skills
      </h1>

      {ratingsList.map((skill) => (
        <Slider
          key={skill}
          skillName={skill}
          value={ratings[skill]}
          onChange={handleRatingChange}
        />
      ))}

      <div className="flex justify-end w-full mt-6 space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-700 rounded-md text-white font-medium hover:bg-gray-600"
        >
          Back
        </button>
        <IconBtn type="submit" text="Submit"/>
      </div>
    </form>
  );
};

export default Assessment3;
