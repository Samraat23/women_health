"use client"
import React from 'react'
import { motion } from "framer-motion";
import Kusum from "../(assets)/kusummam.jpg"
import Image from 'next/image';
import { slugify } from '@/components/blogs/Slugify';

function NavbarPregnancyItem({Menu}:any) {

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className=" overflow-hidden   "
    >
      <div className='flex justify-between gap-6 '>
        {/* Image Section with Enhanced Styling */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='relative w-[20%] h-80 rounded-2xl overflow-hidden shadow-xl group'
        >
          <div className='absolut inset-0 z-10  transition-opacity duration-500' />
          <Image 
            src={Kusum} 
            alt='Women Health Care' 
            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
          />
          <div className='absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 via-black/40 to-transparent z-20'>
            <h3 className='text-white font-semibold text-lg'>Complete Women's Healthcare</h3>
            <p className='text-white/80 text-sm'>Compassionate care at every stage</p>
          </div>
        </motion.div>

        {/* Content Section with Enhanced Cards */}
        <div className='w-[78%] flex justify-between  gap-4'>
          {Menu.subMenu.map((category:any) => (
            <motion.div 
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * category.id, duration: 0.5 }}
              className='flex flex-col gap-2  group'
            >
              {/* Category Header with Gradient */}
              <div className='relative pb-3 mb-2'>
                <h1 className={`text-lg font-bold font- text-primary  group-hover:scale-105 transition-transform text-white  duration-300`}>
                  {category.name}
                </h1>
                <div className={`absolute bottom-0 left-0 h-1 w-12  bg-pink_color rounded-full group-hover:w-full transition-all duration-500`} />
              </div>

              {/* Links with Enhanced Hover Effects */}
              <div className='flex flex-col gap-2'>
                {category.links.map((link:any, linkIndex:any) => (
                  <motion.a
                    key={linkIndex}
                    href={slugify(link)}
                    whileHover={{ x: 6, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative  text-md font-medium transition-all duration-300  hover:text-primary text-white group/link`}
                  >
                    <span className='relative z-10 flex items-center gap-2'>
                      <span className='w-1.5 h-1.5 rounded-full bg-gray-400 group-hover/link:scale-125 transition-transform' />
                      {link}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

  
    </motion.div>
  )
}

export default NavbarPregnancyItem