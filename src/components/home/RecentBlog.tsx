

"use client"
import React from 'react'
import Image from 'next/image'
import { Calendar, Eye, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";

interface Author {
  name: string
  designation: string
  avatar?: string
}

interface BlogPost {
  id: string | number
  title: string
  coverImage: string
  publishedDate: string
  views: number
  author: Author
  category?: string
  excerpt?: string
}

interface RecentBlogProps {
  data: BlogPost[]
}

const headingObj = {
  budge:"Latest Article",
  heading:"Women’s Health ",
  bold:"Insights",
  paragraph:"Discover trusted articles on pregnancy, gynecology, fertility, laparoscopic care, and complete women’s health."
}

function RecentBlog({ data }: RecentBlogProps) {
  if (!data?.length) return null



  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      
      <SectionHeader headingObj={headingObj} />

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {data.map((item, i) => (
            <div key={i} className="flex-shrink-0">
              <ArticleComponent item={item} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default RecentBlog



function ArticleComponent({ item }: { item: BlogPost }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  return (
    <div className='w-96  cursor-pointer pb-2' >
      <div className='h-80 relative' >
        <Image src={item.coverImage} alt='db' fill className='object-center rounded-lg' />

        <div  className='absolute  inset-0 top-4 flex justify-center items-center left-2 rounded-lg w-24  h-8 bg-(--secondary-color) text-white '>{item.category}</div>
      </div>

      <div className="py-6">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">       <Calendar className="w-4 h-4" />
            <span>{formatDate(item.publishedDate)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{item.views.toLocaleString()} views</span>
          </div>
        </div>

        <div className='' >
          <div className='text-(--secondary-text) font-semibold py-2 text-2xl ' >{item.title}</div>
          <p className='text-gray-700 line-clamp-2 ' >{item.excerpt}</p>
          <div className='flex items-center hover:border-b hover:text-(--primary-text) duration-150 ease-in-out  transition-transform  w-[30%] cursor-pointer py-1' >
            <div className='text-(--primary-text)'>Explore Tips </div>
            <div>
              <ArrowRight size={20} className='text-(--primary-text)' />
              </div>
          </div>
        </div>
      </div>

    </div>

  )
}
