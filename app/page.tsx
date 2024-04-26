"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
    const [visibleScenes, setVisibleScenes] = useState(new Set())

    const hoverdiv = document.createElement('div')
    hoverdiv.className = "absolute top-0 left-0 w-screen min-h-screen flex justify-center items-center z-50 bg-opacity-0 pointer-events-none "
  
  useEffect(() => {
    function adjustFrame() {
      const scrollPosition = document.getElementById('container')!.scrollTop
      const height = window.innerHeight
      const sceneNumber = Math.floor(scrollPosition / height)
      // const div = document.querySelector(`#scene[key="${sceneNumber}"]`)
      const div: any = document.querySelector(`#scene${sceneNumber}`)
      if (!div) return
      setVisibleScenes(prev => new Set(prev.add(sceneNumber)))
      document.getElementById('debug')!.innerText = sceneNumber.toString()
      document.getElementById('debug2')!.innerText = scrollPosition.toString()
    //   div!.innerText = `scrollPosition: ${scrollPosition}, height: ${height}`
    }
    adjustFrame()
    document.getElementById('container')!.addEventListener('scroll', () => {
      adjustFrame()
    })
  }, [])


    return (
        <div className="relative bg-black">
            <div id="container" className="relative top-0 left-0 container grid items-center gap-0 h-screen z-20 overflow-y-scroll" style={{ scrollSnapType: 'y mandatory' }}>
            {([
                "coolmeme0.png",
                "coolmeme1.png",
                "coolmeme2.png",
            ]).map((url, i) => (
                <div
                    key={i}
                    id={`scene${i}`}
                    className={`bg-blue-${i+1}00 h-screen transition-opacity opacity-0 duration-2000 ${visibleScenes.has(i) ? 'opacity-100' : 'opacity-0'}`}
                    style={{ scrollSnapAlign: 'start', backgroundImage: `url('${url}')`, backgroundSize: 'cover', backgroundPosition: 'center'}}
                />
            ))}
            </div>
            <div id="ui" className="absolute top-0 left-0 w-screen min-h-screen flex justify-center items-center z-50 bg-opacity-0 pointer-events-none">
            <p id="debug" className="text-center w-full text-3xl"></p>
            <p id="debug2" className="text-center w-full text-3xl"></p>
            
            </div>
        </div>
    )
}
