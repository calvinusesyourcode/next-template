"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
    useEffect(() => {
        async function requestPermission() {
                document.getElementById('debug-blue')!.innerText = "hello"
                const permission = await DeviceMotionEvent.requestP
            if (typeof DeviceMotionEvent.requestPermission === 'function') {
                document.getElementById('debug-blue')!.innerText = "world"
                const permission = await DeviceMotionEvent.requestPermission();
                if (permission === 'granted') {
                    addDeviceMotionListener();
                } else {
                    console.error('Permission not granted for DeviceMotionEvent');
                }
            } else {
                // Handle regular non-iOS 13+ devices.
                addDeviceMotionListener();
            }
        }

        function addDeviceMotionListener() {
            window.addEventListener('devicemotion', (event: DeviceMotionEvent) => {
                const red = document.getElementById('debug-red');
                const green = document.getElementById('debug-green');
                const blue = document.getElementById('debug-blue');
                if (!red || !green || !blue) return;
                red.innerText = event.accelerationIncludingGravity?.x.toString();
                green.innerText = event.accelerationIncludingGravity?.y.toString();
                blue.innerText = event.accelerationIncludingGravity?.z.toString();
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
        </div>
    )
}