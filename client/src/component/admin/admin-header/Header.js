import React from 'react'

const Header = () => {
  return (
    <div><header className="bg-slate-800 text-white p-4 flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-semibold">Blurock</h1>
    </div>
    <div className='hidden'>
      <button
        className="bg-white text-blue-500 px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </div>
  </header></div>
  )
}

export default Header