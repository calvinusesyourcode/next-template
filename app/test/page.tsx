"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"


export default function IndexPage() {
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
                red.innerText = event?.acceleration?.x?.toString();
                green.innerText = event?.acceleration?.y?.toString();
                blue.innerText = event?.acceleration?.z?.toString();
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
        const btn = document.createElement('button');
        btn.innerText = 'Enable Device Motion';
        btn.onclick = requestPermission;
        document.body.appendChild(btn);
    }, []);

    return (
        <div className="relative bg-black overflow-hidden">
            <p id="debug-red" className="text-red-300">-</p>
            <p id="debug-green" className="text-green-300">-</p>
            <p id="debug-blue" className="text-blue-300">-</p>
            <p id="debug-red-2" className="text-red-300">-</p>
            <p id="debug-green-2" className="text-green-300">-</p>
            <p id="debug-blue-2" className="text-blue-300">-</p>
        </div>
    )
}