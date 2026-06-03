import React from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/icons/arrowIcon.svg';
import './BackBtn.css';

const BackButton = ({ className = 'backBtn' }) => {
  const navigate = useNavigate();

  return (
    <button className={className} onClick={() => navigate(-1)}>
      <img src={arrow} alt="back" />
    </button>
  );
};

export default BackButton;