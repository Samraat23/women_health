"use client"
import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  name: string;
  bg?: string;
  width?: string;
  height?: string;
  color?: string;
}

function CustomeButton({
  name,
  bg,
  width,
  height,
  color,
}: ButtonProps) {
  return (
    <div>
      <motion.button
        whileHover={{
          scale: 1.05,
          backgroundColor: "#fbbf24",
          color: "#16a34a",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="text-xl font-[poppins] rounded-md py-2 shadow-md cursor-pointer"
        style={{
          backgroundColor: bg,
          width: width,
          height: height,
          color: color || "white",
        }}
      >
        {name}
      </motion.button>
    </div>
  );
}

export default CustomeButton;