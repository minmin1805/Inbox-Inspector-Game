import React from 'react'
import { useNavigate } from 'react-router-dom'
function InstructionPage() {
  const navigate = useNavigate();

  const handleStartInvestigation = () => {
    navigate('/game');
  }

  return (
    <div className='flex flex-col items-center justify-center h-dvh'>
      <h1>InstructionPage</h1>
      <button className='bg-blue-500 text-white p-2 rounded-md' onClick={handleStartInvestigation}>Start Investigation</button>
    </div>
  )
}

export default InstructionPage
