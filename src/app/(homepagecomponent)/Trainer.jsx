

"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {Scissors} from "lucide-react"
import Link from "next/link";

function Trainer({ d }) {
  const item = (delay) => ({
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      },
    },
  });

  return (
    <section className=" min-h-screen ">

      {/* ===== TEXT ===== */}
      <motion.div
       variants={item(0.1)}
       initial="hidden"
       whileInView="show"
        className="text-center max-w-3xl  mx-auto mb-14"
      >
       <div className="flex w-130 mx-auto  border p-3  bg-pink-50  border-pink-200    rounded-3xl  items-center justify-center" >
       <span ><Scissors  size={20} className="text-black " /></span>
       <p className=" text-xs font-medium text-slate-700  px-2  tracking-[3px] uppercase ">
          {d.subtitle} 
        </p>
       </div>

        <h1 className=" my-5  text-(--primary-text) text-4xl md:text-5xl font-bold ">
          {d.title}
        </h1>

        <p className="text-(--secondary-text)">{d.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button size="lg" className="px-8 py-6 text-base md:text-lg cursor-pointer hover:scale-105 font-medium text-white bg-(--primary-color) shadow-lg">
                          Book Appointment
                        </Button>
                       <Link  href={'https://themedicity.com/dr-kusum-lata/'} target="_blank" >
                       <Button size="lg" variant="outline" className="px-8 cursor-pointer py-6 text-base md:text-lg border-(--primary-color) hover:scale-105 text-(--secondary-color) hover:bg-pink-50">
                          {d.secondaryCta}
                        </Button>
                       </Link>
                      </div>
      </motion.div>

      {/* ===== MOSAIC ===== */}
      <div className="mx-4">
        <div className="flex items-center justify-center gap-3 h-150">

          {/* Far Left */}
          <motion.div
            variants={item(0.1)}
            initial="hidden"
            whileInView="show"
            className="hidden border-4 border-(--primary-text) lg:block w-[18%] h-[50%] self-center rounded-2xl overflow-hidden relative"
          >
            <Image src={d.images[0].img} alt="" fill className="object-cover scale-105" />
          </motion.div>

          {/* Left Stack */}
          <div className="hidden md:flex w-[18%] h-[80%] flex-col gap-3 self-center">
            
            <motion.div
              variants={item(0.2)}
              initial="hidden"
              whileInView="show"
              className="relative border-4 border-(--primary-text) h-1/2 rounded-2xl overflow-hidden"
            >
              <Image src={d.images[1].img} alt="" fill className="object-cover scale-120 " />
            </motion.div>

            <motion.div
              variants={item(0.35)}
              initial="hidden"
              whileInView="show"
              className="relative border-4 border-(--primary-text) h-1/2 rounded-2xl overflow-hidden"
            >
              <Image src={d.images[2].img} alt="" fill className="object-cover scale-105" />
            </motion.div>

          </div>

          {/* Center */}
          <motion.div
            variants={item(0.5)}
            initial="hidden"
            whileInView="show"
            className="w-[26%]  border-4 border-(--primary-text) h-full rounded-2xl overflow-hidden shadow-xl relative"
          >
            <Image src={d.images[3].img} alt="" fill className="object-cover scale-110 " />
          </motion.div>

          {/* Right Stack */}
          <div className="hidden md:flex w-[18%] h-[80%] flex-col gap-3 self-center">
            
            <motion.div
              variants={item(0.65)}
              initial="hidden"
              whileInView="show"
              className="relative border-4 border-(--primary-text) h-1/2 rounded-2xl overflow-hidden"
            >
              <Image src={d.images[4]?.img || d.images[1].img} alt="" fill className="object-cover scale-110 " />
            </motion.div>

            <motion.div
              variants={item(0.8)}
              initial="hidden"
              whileInView="show"
              className="relative border-4 border-(--primary-text) h-1/2 rounded-2xl overflow-hidden"
            >
              <Image src={d.images[5]?.img || d.images[2].src} alt="" fill className="object-cover scale-110" />
            </motion.div>

          </div>

          {/* Far Right */}
          <motion.div
            variants={item(0.95)}
            initial="hidden"
            whileInView="show"
            className="hidden border-4 border-(--primary-text) lg:block w-[18%] h-[50%] self-center rounded-2xl overflow-hidden relative"
          >
            <Image src={d.images[6].img} alt="" fill className="object-cover scale-105" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Trainer;