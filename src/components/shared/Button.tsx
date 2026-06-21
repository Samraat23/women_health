"use client"
import React from 'react'
import {motion} from "framer-motion"

function Cbutton({ name }: { name: string }) {
  return (
    <div>
         <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-(--primary-color) text-(--primary-foreground) p-4 cursor-pointer font-medium rounded-xl shadow-md"
        >
          {name}
        </motion.button>
    </div>
  )
}

export default Cbutton
