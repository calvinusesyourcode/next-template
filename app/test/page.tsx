"use client"

import Link from "next/link"
import { useEffect, useState, useRef } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"


export default function IndexPage() {
    const x = useRef(0)
    const y = useRef(0)
    const z = useRef(0)
    const x2 = useRef(0)
    const y2 = useRef(0)
    const z2 = useRef(0)
    const sliderRef = useRef(null)
    useEffect(() => {
        async function requestPermission() {
            if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
                const permission = await (DeviceMotionEvent as any).requestPermission();
                if (permission === 'granted') {
                    addDeviceMotionListener()
                }
                else console.error('Permission not granted for DeviceMotionEvent')
            } else addDeviceMotionListener()
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    addDeviceOrientationListener();
                }
                else console.error('Permission not granted for DeviceOrientationEvent');
            } else addDeviceOrientationListener()
        }

        function addDeviceMotionListener() {
            window.addEventListener('devicemotion', (event: DeviceMotionEvent) => {
                x2.current = event?.acceleration?.x || 0
                y2.current = event?.acceleration?.y || 0
                z2.current = event?.acceleration?.z || 0
            });
            document.getElementById('permission-button')!.style.display = 'none'
        }
        function addDeviceOrientationListener() {
            window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
                x.current = event?.alpha || 0
                y.current = event?.beta || 0
                z.current = event?.gamma || 0
            });
            document.getElementById('permission-button')!.style.display = 'none'
        }

        const btn = document.getElementById('permission-button')
        btn?.addEventListener('click', requestPermission)

        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const width = canvas.width
        const height = canvas.height
        const centerX = width / 2
        const centerY = height / 2

        function draw() {
            ctx.clearRect(0, 0, width, height)
            ctx.font = '16px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText(`X1: ${x.current.toFixed(2)}`, 10, 20);
            ctx.fillText(`X2: ${x2.current.toFixed(2)}`, 10, 80);
            ctx.fillStyle = 'green';
            ctx.fillText(`Y1: ${y.current.toFixed(2)}`, 10, 40);
            ctx.fillText(`Y2: ${y2.current.toFixed(2)}`, 10, 100);
            ctx.fillStyle = 'blue';
            ctx.fillText(`Z1: ${z.current.toFixed(2)}`, 10, 60);
            ctx.fillText(`Z2: ${z2.current.toFixed(2)}`, 10, 120);
            ctx.beginPath()
            ctx.arc(centerX + (x.current || 0), centerY + (y.current || 0), 30, 0, 2 * Math.PI)
            ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'
            ctx.fill()
            console.log("g")
            requestAnimationFrame(draw)
        }

        draw()

    }, []);

    return (
        <div className="relative bg-black overflow-hidden" style={{ height: '100svh' }}>
            <div className="absolute top-0 left-0 h-full w-full z-20 bg-blue-900">
                <button id="permission-button" className="text-white p-4 outline-white outline-2">allow</button>
                {/* <input
                    type="range"
                    min="-100"
                    max="100"
                    value={x.current}
                    ref={sliderRef}
                    onChange={(e) => x.current = parseInt(e.target.value)}
                    className="slider"
                /> */}
            </div>
            <canvas id="canvas" style={{ pointerEvents: 'none' }} className="absolute top-0 left-0 z-30 h-full w-full"></canvas>
        </div>
    )
}