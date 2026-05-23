"use client"

import React from "react"
import { motion } from "framer-motion"
import { DotIcon } from "lucide-react"

interface DoctorDetail {
  id: number
  title: string
  subTitle: string
}

interface DetailBorderProps {
  doctorDetail: DoctorDetail[]
}

function DetailBordder({ doctorDetail }: DetailBorderProps) {
  return (
    <div className="bg-[#4865ff] flex items-center text-white h-16 overflow-hidden relative">
      
      <motion.div
        className="flex gap-10"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 60,
          repeat: Infinity,
        }}
      >
        {/* Duplicate data for seamless infinite loop */}
        {[...doctorDetail, ...doctorDetail].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 min-w-max px-6"
          >
            <DotIcon size={28} className="text-rose-400" />
            <p className="text-lg font-medium whitespace-nowrap">
              {item.subTitle}
            </p>
          </div>
        ))}
      </motion.div>

    </div>
  )
}

export default DetailBordder