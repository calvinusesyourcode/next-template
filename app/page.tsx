"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
    let URLs = [
        "a-matrix-of-code-cascading-in.png",
        "a-mysterious-glow-surrounds-a-mushroom.png",
        "a-person-looking-curiously-into-a.png",
        "a-determined-hacker-types-furiously-on.png",
        "a-digital-avatar-appears-looking-distressed.png",
        "a-dramatic-reunion-of-two-lovers.png",
        "a-mysterious-figure-appears-in-a.png",
        "a-mysterious-figure-illuminated-by-the.png",
        "a-mysterious-figure-whispers-into-the.png",
        "a-single-leaf-falls-on-a.png",
        "a-transformative-energy-begins-to-surround.png",
        "close-up-of-intense-eyes-blinking-rapidly.png",
        "handing-over-a-shiny-golden-meme.png",
        "misty-mountains-of-serbia-in-the.png",
        "sunrays-pierce-through-the-dense-foliage.png",
        "the-adventurer-returns-with-a-changed.png",
        "the-avatars-chains-break-digitally-symbolizing.png",
        "were-hinted-that-the-shadow-could.png",
        "zoom-in-on-the-avatars-face.png",
    ]
    const [visibleScenes, setVisibleScenes] = useState<any>(new Set([]))
    const [loadedScenes, setLoadedScenes] = useState(3)
    const [currentScene, setCurrentScene] = useState(0)

    
    useEffect(() => {
        URLs = URLs.slice(0,3).concat(URLs.slice(3).sort(() => Math.random() - 0.5))
        function update() {
            setLoadedScenes((loadedScenes: any) => {
                const sceneNumber = loadedScenes || 3
                if (sceneNumber >= URLs.length) return sceneNumber
                const div = document.querySelector(`#scene${sceneNumber}`)
                const img = div?.querySelector('img')
                if (!img) return sceneNumber
                img.src = URLs[sceneNumber]
                document.getElementById('debug-blue')!.innerText = `loaded: ${sceneNumber.toString()}`
                return sceneNumber + 1
            })
        }
        function adjustFrame() {
            const container = document.getElementById('container')
            if (!container) return

            const scrollPosition = container.scrollTop
            const height = window.innerHeight
            const sceneNumber = Math.max(0, Math.min(Math.floor(scrollPosition / height), URLs.length - 1))
            setCurrentScene(sceneNumber)
            document.getElementById('debug-red')!.innerText = `current: ${sceneNumber.toString()}`

            const div = document.querySelector(`#scene${sceneNumber}`)
            if (!div) return
            setVisibleScenes((oldVisibleScenes: any) => {
                if (oldVisibleScenes.has(sceneNumber)) return oldVisibleScenes
                document.getElementById('debug-green')!.innerText = `visible: ${oldVisibleScenes.size.toString()}`
                update()
                return new Set(oldVisibleScenes.add(sceneNumber))
            })
        }
        adjustFrame()
        document.getElementById('container')!.addEventListener('scroll', () => {
            adjustFrame()
        })
  }, [])


    return (
        <div className="relative bg-black overflow-hidden" style={{ height: '100svh'}}>
            <div id="container" className="relative top-0 left-0 container grid items-center gap-0 h-screen z-20 overflow-y-scroll" style={{ scrollSnapType: 'y mandatory' }}>
                {(URLs).map((url: any, i: any) => (
                    <div
                        key={i}
                        id={`scene${i}`}
                        style={{ scrollSnapAlign: 'start' }}
                        className="h-screen"
                    >
                        <img
                            alt=""
                            src={i < 3 ? url : null}
                            className={`h-screen`}
                        /> 
                    </div>
                ))}
            </div>
            <div id="ui" className={`absolute top-0 left-0 w-screen min-h-screen flex bg-opacity-0  z-50 pointer-events-none p-4 ${currentScene > 0 && currentScene < URLs.length - 2 ? "justify-end items-start" : "justify-center items-center"}`}>
                <div className="flex flex-col gap-0 w-fit justify-center items-left bg-black bg-opacity-50 rounded-lg py-2 px-6 text-xl text-left ">
                    {currentScene === 0 && (
                        <p>
                            testing css scroll snap at 2am...
                        </p>
                    )}
                    {currentScene >= URLs.length - 2 && (
                        <p>
                            want to make videos with photos like these? sounds like you need a meme cannon. wink wink.
                        </p>
                    )}
                    <p id="debug-red" className="text-red-300">-</p>
                    <p id="debug-green" className="text-green-300">-</p>
                    <p id="debug-blue" className="text-blue-300">-</p>
                </div>
            </div>
        </div>
    )
}
