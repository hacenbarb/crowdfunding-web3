import React, {useEffect} from 'react'
import { loader } from "../assets";
const Loader = () => {
  function stopScroling() {
    document.body.style.overflow = "hidden";
  }
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = "auto"}
  })
  return (
    <div className="absolute top-0 left-0 bg-[rgba(0,0,0,.7)] z-10 w-full h-full flex flex-col items-center justify-center">
    <img
      src={loader}
      alt="loading"
      className="object-contain w-[150px] h-[150px]"
    />
    <p className='text-sm text-slate-500'>please wait a few moments..</p>
  </div>
  )
}

export default Loader