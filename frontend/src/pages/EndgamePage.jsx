import React from 'react'
import logo from '../assets/Image/WelcomePage/logo.png'
import ScoreDisplay from '../components/ScoreDisplay'
import Leaderboard from '../components/Leaderboard'

function EndgamePage() {
  return (
    <div className='relative z-10 flex flex-col w-full min-h-[100dvh] items-center py-6 sm:py-8 px-3 bg-[#ccffff] pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))]'>
      <img src={logo} alt="logo" className='w-90' />
      <h1 className='text-3xl font-bold'>Game Closed</h1>
      <p>You completed all 10 investigation</p>

      <div className='flex flex-col lg:flex-row items-stretch lg:items-center justify-center w-full max-w-6xl px-2 sm:px-6 gap-6 lg:gap-10 mt-4 sm:mt-8'>
        <div className='w-full lg:w-auto flex justify-center h-fit'>
          <ScoreDisplay
            title={title}
            blurb={blurb}
            badgeId={badgeId}
            totalScore={privacyTotalScore}
            scenariosCleared={scenariosCleared}
            scenariosTotal={totalLevels}
          />
        </div>

        <Leaderboard currentPlayerName={username} />

        <div className='flex flex-col md:flex-row items-center justify-center w-full mt-5 gap-3 md:gap-4 '>
        <div className='bg-[#ddecff] rounded-2xl p-2 w-full md:w-[55%] h-auto'>
          <div className='bg-white rounded-2xl overflow-hidden w-full h-full'>
            <div className='bg-[#017407] w-full h-[40px] p-2 flex items-center'>
              <p className='text-white text-lg sm:text-xl font-bold'>What You Learned</p>
            </div>
            <div className='flex flex-col p-3 gap-2 text-sm sm:text-base'>
              <p>✔ Check sender and real links              .</p>
              <p>✔ Pressure language is a red flag</p>
            </div>
          </div>
        </div>

        <div className='bg-[#ddecff] rounded-2xl p-2 w-full md:w-[40%]'>
          <div className='bg-white rounded-2xl overflow-hidden w-full h-full'>
            <div className='bg-[#1d4ed8] w-full h-[40px] p-2 flex items-center'>
              <p className='text-white text-lg sm:text-xl font-bold'>Key Takeaway</p>
            </div>
            <div className='flex flex-col gap-2 p-3 text-sm sm:text-base'>
              <p>Pause before you trust.
              </p>
              <p>Inspect the clues,
              </p>
              <p>Respond with carefulness</p>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row mt-8 sm:mt-10 gap-3 sm:gap-8 justify-center w-full max-w-xl sm:max-w-none px-4 sm:px-6 pb-8'>
        <a
          href='https://www.google.com'
          download='mock.pdf'
          className='bg-[#ddecff] text-blue-900 px-4 py-3 rounded-md text-base sm:text-lg md:text-xl font-bold flex items-center justify-center gap-2 min-h-[48px] w-full sm:w-auto touch-manipulation no-underline text-center'
        >
          <IoMdDownload aria-hidden /> Download Safety Checklist!
        </a>
        <button
          type='button'
          className='bg-[#ddecff] text-blue-900 px-4 py-3 rounded-md text-base sm:text-lg md:text-xl font-bold min-h-[48px] w-full sm:w-auto touch-manipulation'
          onClick={exitToMenu}
        >
          Exit To Menu
        </button>
      </div>

      </div>
    </div>
  )
}

export default EndgamePage
