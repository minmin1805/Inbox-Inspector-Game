import React from 'react'
import Header from '../components/Header'

import checkIcon from '../assets/Image/GamePage/checkIcon.png'
import senderCheckIcon from '../assets/Image/GamePage/senderCheck.png'
import linkPreviewIcon from '../assets/Image/GamePage/linkPreview.png'
import urgencyDetectorIcon from '../assets/Image/GamePage/urgencyDetector.png'
import askDetectorIcon from '../assets/Image/GamePage/askDetector.png'

import phishingIcon from '../assets/Image/GamePage/phishingIcon.png'
import sketchyIcon from '../assets/Image/GamePage/sketchyIcon.png'
import legitIcon from '../assets/Image/GamePage/legitIcon.png'
import DMWindow from '../components/DMWindow'
import EmailWindow from '../components/EmailWindow'

function GamePage() {
  return (
    <div>
      <Header />
      <div className='flex flex-col items-center justify-center h-dvh'>
        <div className='p-3 flex'>
          {/* left bar */}
          <div>
            <span className='flex items-center gap-2'>
              <img src={checkIcon} alt="checkIcon" className='w-10 h-10' />
              Incoming Email</span>

              {/* DMWindow or EmailWindow, but will use EmailWindow for mockup*/}
              <EmailWindow />
          </div>

          {/* right bar */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default GamePage
