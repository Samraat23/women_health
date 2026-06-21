
import React, { useEffect } from 'react'
import { useState } from 'react';

const text = ["Gynecologist",
    "Ex-AIIMS Specialist",
    "Laparoscopic Surgeon",
    "Women's Health Expert",
     "Endometroisis Excision Expert"
    ,];
function TextAnimation() {

    const [current, setCurrent] = useState(0)

    useEffect(() => {

        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % text.length)
        }, 2000)

        return () => clearInterval(interval);

    }, [])

    return (
        <div>
            <h1 className="text-black text-5xl"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Dr. Kusum Lata Bharduwaj
            </h1>
            <p className="text-sm text-slate-500 mb-5 text-center">
                MBBS, MD (OBG) &nbsp;·&nbsp; Ex-AIIMS, New Delhi
            </p>
            <div className="flex border text-(--primary-text) border-(--primary-text)  mx-auto h-12 w-80 overflow-hidden rounded-md">
                <div
                    className="flex flex-col w-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateY(-${current * 48}px)` }}
                >
                    {text.map((word, i) => (
                        <div
                            key={i}
                            className="h-12 bg-(--primary-text) text-white flex items-center justify-center text-xl font-semibold flex-shrink-0"
                        >
                            {word}
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default TextAnimation