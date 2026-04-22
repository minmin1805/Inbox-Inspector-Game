import React from "react";
import logo from "../assets/Image/WelcomePage/logo.png";
import { useNavigate } from "react-router-dom";
const NEONBLUE = "#ccffff";

function WelcomePage() {
  const navigate = useNavigate();
  const handleStartInvestigation = () => {
    navigate('/instruction');
  }
  return (
    <div 
    style={{
        backgroundColor: NEONBLUE,
    }}
    className="min-h-[100dvh] flex flex-col items-center px-4 sm:px-5 py-8 sm:py-14 pb-[max(2rem,env(safe-area-inset-bottom))]">
      <header className='flex items-center justify-between w-full'>
        <img src={logo} alt="logo" className="w-full max-w-xs sm:max-w-sm" />
        <p>Terms of Service</p>
      </header>

      <div className="text-center text-3xl font-bold">
        Train your instincts.
        <br />
        Inspect before you trust
      </div>

      <div className="text-center text-2xl ">
      Read suspicious emails and DMs, collect clues with limited scans, choose a safe verdict. and write a safe reply.
      </div>

      <div className="flex flex-col items-center justify-center p-5 mt-10 bg-white rounded-md shadow-md">
        Your namne or nickname:

        <input type="text" placeholder="Type your name here..." className="w-full max-w-xs sm:max-w-sm rounded-md p-2 border border-gray-300" />

        <button onClick={handleStartInvestigation} className="w-full max-w-xs sm:max-w-sm rounded-md p-2 bg-[#54cbe5] text-white">Start Investigation</button>
      </div>

      <div className='flex gap-5 mt-20'>

        <div className='flex flex-col items-center justify-center bg-white rounded-md shadow-md p-5'>
          <p>Scan clues</p>
          <ul>
            <li>Check sender</li>
            <li>Spot urgency</li>
          </ul>

        </div>

        <div className='flex flex-col items-center justify-center bg-white rounded-md shadow-md p-5'>
          <p>Choose verdict</p>
          <ul>
            <li>Pick Phishing or Legit</li>
            <li>Base on clues</li>
          </ul>

        </div>

        <div className='flex flex-col items-center justify-center bg-white rounded-md shadow-md p-5'>
          <p>Write a safe reply</p>
          <ul>
            <li>No password, ID, or photos</li>
            <li>Don't use risky words</li>
          </ul>

        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
