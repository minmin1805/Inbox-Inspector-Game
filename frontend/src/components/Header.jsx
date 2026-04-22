import React from 'react'


import logo from '../assets/Image/WelcomePage/logo.png'


function Header() {
  return (
    <div className='flex items-center justify-between w-full bg-[#afdfff] p-4'>
      <img src={logo} alt="logo" className='w-90' />
      <h1 className='text-3xl font-bold'>Case 3/10</h1>
      <div className='px-4 py-2 bg-gray-300 text-black rounded-md text-2xl font-bold hover:bg-gray-400 cursor-pointer'>How to play?</div>
    </div>
  )
}

export default Header
