import React from 'react'

const Btn = ({title, style, handleClick}) => {
  return (
    <button 
      type='button'
      className={`px-2 py-2 text-white font-medium capitalize text-base bg-[#4acd8d] rounded-xl ${style}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default Btn