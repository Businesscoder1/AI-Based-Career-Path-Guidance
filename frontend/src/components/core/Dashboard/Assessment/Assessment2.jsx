import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAssessmentData } from '../../../../slices/assessmentSlice';
import IconBtn from "../../../Common/IconBtn"
const Assessment2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const skills = [
    'Communication Skills',
    'Problem Solving',
    'Teamwork',
    'Time Management',
    'Adaptability',
  ];

  const [skillRatings, setSkillRatings] = useState({});

  const handleSkillChange = (skill, value) => {
    setSkillRatings((prevRatings) => ({
      ...prevRatings,
      [skill]: value,
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    dispatch(setAssessmentData({ step: 'assessment2', data: { skillRatings } }));
    navigate('/dashboard/Assessment-page-3'); // Ensure this path matches your route
  };

  const handleBack = () => {
    navigate('/dashboard/Assessment-page-1'); // Ensure this path matches your route
  };

  const Slider = ({ skill, value, onChange }) => {
    return (
      <div className="relative p-2 w-full">
        <span
          className="absolute -top-4 left-0 text-sm font-semibold text-yellow-300"
          style={{ left: `calc(${value * 10}% - 10px)` }}
        >
          {value}
        </span>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none bg-gray-300 cursor-pointer"
          style={{
            
            background: `linear-gradient(to right, #facc15 ${value * 10}%, #d1d5db ${value * 10}%)`,
          }}
        />
      </div>
    );
  };

  return (
    <form onSubmit={handleNext} className="my-10 text-white flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
      <h1 className="text-3xl  font-semibold text-center text-yellow-100 mb-8">
        Know, Rate Yourself In Soft-Skills
      </h1>

      {skills.map((skill) => (
        <div key={skill} className="w-full">
          <label className="block text-lg p-2 font-bold text-white mb-2">{skill}</label>
          <Slider
            skill={skill}
            value={skillRatings[skill] || 0}
            onChange={(value) => handleSkillChange(skill, value)}
          />
        </div>
      ))}

      <div className="flex justify-end w-full mt-6 space-x-4">
        <button
          type="button"
          onClick={handleBack}
          className="px-4 py-2 bg-gray-700 rounded-md text-white font-medium hover:bg-gray-600"
        >
          Back
        </button>
       <IconBtn type="submit" text="Next"/>
      </div>
    </form>
  );
};

export default Assessment2;
