import React from 'react'

import pdfImage from '../assets/Image/GamePage/pdfImage.png'
import clickHereButton from '../assets/Image/GamePage/clickHereButton.png'

function EmailWindow() {
  return (
    <div className='max-w-[60%] h-full bg-white rounded-lg shadow-lg p-3'>
      <div>
        <p>From: Summer Jobs Hiring</p>
        <p>To: you@example.com</p>
        <p>Subject: URGENT! Confirm your spot - pay training fee today</p>

        <p>CCongratulations! You’re selected for our paid training program.
        To reserve your seat, pay a $120 training fee within 2 hours. Please look over the document attached in this email and  click the button below to pay for your fee'</p>
      </div>
    </div>
  )
}

export default EmailWindow
