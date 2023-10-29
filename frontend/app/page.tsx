"use client"

import { useState } from "react"
import axios from "axios"
import Image from "next/image"
export default function Home() {
  const [text, setText] = useState("")
  const [file, setFile] = useState(null)
  const [speedReadText, setSpeedReadText] = useState("")

  const getBionicReader = async function(type: String) {
    if (type=="pdf") {
        
        const pdfFile = new FormData()
        pdfFile.append('file', file)
        axios.post(`${process.env.NEXT_PUBLIC_URL}/speedread`,pdfFile).then(res=> {
            setSpeedReadText(res.data.bionicRead)
        })
        
    } else {
        console.log(`${process.env.NEXT_PUBLIC_URL}`)
    const data = await fetch(`${process.env.NEXT_PUBLIC_URL}`, {method: "POST", mode: "cors", headers: {'Content-Type': 'application/json'},body: JSON.stringify({content: text})}).then(res=> res.json())
    setSpeedReadText(data.bionicRead)
}
  }
  
  return (
    <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a href="#" className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span className="text-xs bg-primary-600 rounded-full text-white px-4 py-1.5 mr-3">New</span> <span className="text-sm font-medium">SuperVision V1 is out! See what{'\''}s new</span> 
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">SuperVision</h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Speed Read Anything with Just a Click</p>
        <div className="flex items-center justify-center text-white"><form>
  <label className="block flex items-center justify-center">
    <input type="file" accept="application/pdf" className="block w-full text-sm text-white-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-500 file:text-white
      hover:file:bg-blue-600
    " onChange={e=> setFile(e.target.files[0])}/>
    <div><button style={{width: "11em"}} onClick={(e)=> { e.preventDefault()
        getBionicReader("pdf")}} className="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
<span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
<span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
<span className="relative text-white">SpeedRead PDF</span>
</button></div>
  </label>
</form></div>
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
    {(speedReadText) ? <div
  className="block rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 my-10" style={{width: 500}}>
  <div className="p-6" style={{height: "500px", overflowY: "scroll"}}>

    <h5
      className="mb-1 text-xl font-medium leading-2 text-neutral-800 dark:text-neutral-50" style={{letterSpacing: 0, lineHeight: "40px", color: "#c5bbbb"}} dangerouslySetInnerHTML={{__html: speedReadText}}>
    </h5>
    
  </div>
</div> : null}
        </div>
        <div className="px-4 mt-5 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <span className="font-semibold text-gray-400 uppercase">BUILT FOR</span>
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
                <a href="#" className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400">
                    <Image src="https://htm-4-images.s3.amazonaws.com/img/HTMLOGHO__NEW-bg.webp" alt="hackthemountains"/>
                </a>         
            </div>
        </div> 
    </div>
</section>

  )
}
