"use client";
import React from 'react';

const Logo = () => (
  <svg
    width="200"
    height="60"
    viewBox="0 0 200 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="cursor-pointer"
  >
    {/* Rocket Chair Icon */}
    <path
      d="M40 30L25 45V25L40 10L55 25V45L40 30Z"
      fill="#B88E2F"
      stroke="#2A2A2A"
      strokeWidth="2"
    />
    <path
      d="M40 25L35 30H45L40 25Z"
      fill="#2A2A2A"
    />
    <path
      d="M30 35L25 45H35L30 35Z"
      fill="#2A2A2A"
    />
    <path
      d="M50 35L55 45H45L50 35Z"
      fill="#2A2A2A"
    />
    
    {/* Text Logo */}
    <text
      x="70"
      y="35"
      fontFamily="'Poppins', sans-serif"
      fontSize="24"
      fontWeight="600"
      fill="#2A2A2A"
    >
      RocketSeater
    </text>
    <text
      x="70"
      y="50"
      fontFamily="'Poppins', sans-serif"
      fontSize="14"
      fontWeight="300"
      fill="#B88E2F"
    >
      Luxury Comfort
    </text>
  </svg>
);

export default Logo;