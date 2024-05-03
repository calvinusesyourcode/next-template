"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"


export default function IndexPage() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
    useEffect(() => {
        async function requestPermission() {
                document.getElementById('debug-blue')!.innerText = "hello"
            if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
                document.getElementById('debug-blue')!.innerText = "world"
                const permission = await (DeviceMotionEvent as any).requestPermission();
                if (permission === 'granted') {
                    addDeviceMotionListener();
                } else {
                    console.error('Permission not granted for DeviceMotionEvent');
                }
            } else {
                // Handle regular non-iOS 13+ devices.
                addDeviceMotionListener();
            }
            if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
                const permission = await (DeviceOrientationEvent as any).requestPermission();
                if (permission === 'granted') {
                    addDeviceOrientationListener();
                } else {
                    console.error('Permission not granted for DeviceOrientationEvent');
                }
            } else {
                // Handle regular non-iOS 13+ devices.
                addDeviceOrientationListener();
            }
        }

        function addDeviceMotionListener() {
            window.addEventListener('devicemotion', (event: DeviceMotionEvent) => {
                const red: any = document.getElementById('debug-red');
                const green: any = document.getElementById('debug-green');
                const blue: any = document.getElementById('debug-blue');
                if (!red || !green || !blue) return;
                setX(event?.acceleration?.x || 0)
                setY(event?.acceleration?.y || 0)
                setZ(event?.acceleration?.z || 0)
            });
        }
        function addDeviceOrientationListener() {
            window.addEventListener('deviceorientation', (event: DeviceOrientationEvent) => {
                const red: any = document.getElementById('debug-red-2');
                const green: any = document.getElementById('debug-green-2');
                const blue: any = document.getElementById('debug-blue-2');
                if (!red || !green || !blue) return;
                red.innerText = event?.alpha?.toString();
                green.innerText = event?.beta?.toString();
                blue.innerText = event?.gamma?.toString();
            });
        }

        // Call this function on a user interaction
        const btn = document.getElementById('permission-button');
        btn?.addEventListener('click', requestPermission);

        const canvas = document.getElementById('canvas') as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const width = canvas.width
        const height = canvas.height
        const centerX = width / 2
        const centerY = height / 2

        function draw() {
            ctx.clearRect(0, 0, width, height); // Clear the canvas

            // Draw a circle that moves based on device orientation
            ctx.beginPath();
            ctx.arc(centerX + (x * 20), centerY + (y * 20), 30, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 165, 0, 0.5)'; // Orange color with transparency
            ctx.fill();

            requestAnimationFrame(draw);
        }

        draw()

    }, []);

    return (
        <div className="relative bg-black overflow-hidden" style={{ height: '100svh' }}>
            <div className="absolute top-0 left-0 h-full w-full z-20 bg-blue-900">
                <p id="debug-red" className="text-red-300">-</p>
                <p id="debug-green" className="text-green-300">-</p>
                <p id="debug-blue" className="text-blue-300">-</p>
                <p id="debug-red-2" className="text-red-300">-</p>
                <p id="debug-green-2" className="text-green-300">-</p>
                <p id="debug-blue-2" className="text-blue-300">-</p>
                <button id="permission-button" className="text-white">allow</button>
            </div>
            <canvas id="canvas" style={{ pointerEvents: 'none' }} className="absolute top-0 left-0 z-30 h-full w-full"></canvas>
        </div>
    )
}