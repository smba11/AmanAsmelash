"use client"

import { useEffect, useState } from "react"

export default function CloudWatchContact() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 })
  const [blink, setBlink] = useState(false)

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    const offsetX = (cursor.x / window.innerWidth - 0.5) * 28
    const offsetY = (cursor.y / window.innerHeight - 0.5) * 12
    setEyePos({ x: offsetX, y: offsetY })
  }, [cursor])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBlink(true)
      window.setTimeout(() => setBlink(false), 180)
    }, 3200)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto flex aspect-[7/5] w-full max-w-md items-center justify-center overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] backdrop-blur-xl dark:bg-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,hsl(var(--primary)/0.2),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.12),transparent)]" />
      <div className="relative h-48 w-80 max-w-full">
        <img
          src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/cloud.jpg"
          alt="Cartoon cloud watching the cursor"
          className="h-full w-full object-contain drop-shadow-[0_20px_34px_rgba(0,0,0,0.22)]"
        />

        {["left", "right"].map((side, index) => (
          <div
            key={side}
            className="absolute flex items-end justify-center overflow-hidden"
            style={{
              top: "42%",
              left: index === 0 ? "31%" : "53%",
              width: 28,
              height: blink ? 5 : 38,
              borderRadius: blink ? "999px" : "50% / 60%",
              backgroundColor: blink ? "black" : "white",
              transition: "all 150ms ease",
            }}
          >
            {!blink && (
              <div
                className="rounded-full bg-black"
                style={{
                  width: 15,
                  height: 15,
                  marginBottom: 5,
                  transform: `translate(${eyePos.x}px, ${eyePos.y}px)`,
                  transition: "transform 80ms ease-out",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
