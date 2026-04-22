import React from 'react'
import senderCheckIcon from '../assets/Image/GamePage/senderCheck.png'
import linkPreviewIcon from '../assets/Image/GamePage/linkPreview.png'
import urgencyDetectorIcon from '../assets/Image/GamePage/urgencyDetector.png'
import askDetectorIcon from '../assets/Image/GamePage/askDetector.png'

function NavigationToolsBar() {
  return (
    <div className='flex items-center justify-between max-w-[30%] h-full bg-white rounded-lg shadow-lg p-3'>
      
      <p>Investigation Tools</p>
      <p>Click each tool to reveal clues</p>

      <div className='flex flex-col items-center bg-white rounded-lg shadow-lg p-3'>

        <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2'>
                <img src={senderCheckIcon} alt="senderCheckIcon" className="w-10 h-10" />
                <p>Sender Check</p>
            </div>
            <p className='text-sm text-gray-500 rounded-lg p-2 bg-gray-100 border border-gray-300' >Domain may not match a real company</p>
        </div>

        <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2'>
                <img src={linkPreviewIcon} alt="linkPreviewIcon" className="w-10 h-10" />
                <p>Sender Check</p>
            </div>
            <p className='text-sm text-gray-500 rounded-lg p-2 bg-gray-100 border border-gray-300' >Domain may not match a real company</p>
        </div>

        <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2'>
                <img src={urgencyDetectorIcon} alt="urgencyDetectorIcon" className="w-10 h-10" />
                <p>Sender Check</p>
            </div>
            <p className='text-sm text-gray-500 rounded-lg p-2 bg-gray-100 border border-gray-300' >Domain may not match a real company</p>
        </div>

        <div className='flex flex-col items-center gap-2'>
            <div className='flex gap-2'>
                <img src={askDetectorIcon} alt="askDetectorIcon" className="w-10 h-10" />
                <p>Sender Check</p>
            </div>
            <p className='text-sm text-gray-500 rounded-lg p-2 bg-gray-100 border border-gray-300' >Domain may not match a real company</p>
        </div>

      </div>
    </div>
  )
}

export default NavigationToolsBar
