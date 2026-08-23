

"use client"
import React from 'react'
import Image from 'next/image'
import { Calendar, Eye, ArrowRight } from 'lucide-react'
import { motion } from "framer-motion";
import SectionHeader from "@/components/shared/SectionHeader";
import Link from 'next/link';
import { getArticleHref } from '@/lib/topicRoutes';

interface Author {
  name: string
  designation: string
  avatar?: string
}

interface BlogPost {
  id: string | number
  slug?: string
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
    <section className="mx-auto max-w-7xl px-4 py-12 md:py-20">
      
      <SectionHeader headingObj={headingObj} />

      <div className="overflow-hidden">
        <motion.div
          className="flex w-max gap-5 md:gap-10"
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
    <div className='w-[78vw] max-w-80 cursor-pointer pb-2 sm:w-96 sm:max-w-none' >
      <div className='relative h-56 sm:h-80' >
        <Image src={item.coverImage} alt='db' fill sizes="(min-width: 640px) 384px, 78vw" className='rounded-lg object-cover object-center' />

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
          <div className='py-2 text-xl font-semibold text-(--secondary-text) sm:text-2xl' >{item.title}</div>
          <p className='text-gray-700 line-clamp-2 ' >{item.excerpt}</p>
          {/* /articles/<slugified-title> had no page behind it, so every card
              landed on a blank route. */}
          <Link href={getArticleHref(item.slug, item.title)}>
          <div className='flex items-center hover:border-b hover:text-(--primary-text) duration-150 ease-in-out  transition-transform  w-[30%] cursor-pointer py-1' >
        
            <div className='text-(--primary-text)'>Explore Tips </div>
            <div>
              <ArrowRight size={20} className='text-(--primary-text)' />
              </div>
           

          </div>
          </Link>
        </div>
      </div>

    </div>

  )
}
