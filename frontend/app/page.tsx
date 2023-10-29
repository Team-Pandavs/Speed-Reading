"use client"
import { useState } from "react"
export default function Home() {
  const [text, setText] = useState("")
  const [speedReadText, setSpeedReadText] = useState("")
  const getBionicReader = async function() {
    const data = await fetch("http://localhost:4000", {method: "POST",     headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },body: JSON.stringify({content: text})}).then(res=> res.json())
    setSpeedReadText(data.bionicRead)
    
  }
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">SuperVision V1 is out! See what's new</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">SuperVision</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Speed Read Anything with Just a Click</p>
        

        <div className="flex flex-col justify-center m-auto items-center m-10">
<textarea placeholder="Get Started Now" className='text-black p-5 m-5' style={{width: 500}} onChange={(e)=> setText(e.target.value)} id="normalText" name="normalText" rows="10" cols="50"/>
<div className="relative inline-flex  group">
        <div
            className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <button onClick={getBionicReader} title="Get Started Now"
            className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button">Speed Read
        </button>
        
    </div>
    <div><p dangerouslySetInnerHTML={{__html: speedReadText}}></p></div>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">BUILT FOR</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <img src="https://htm-4-images.s3.amazonaws.com/img/HTMLOGHO__NEW-bg.webp"/>
                </a>         
            </div>
        </div> 
    </div>
</section>

  )
}
