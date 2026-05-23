"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import SectionHeader from "@/app/(dynamiccomponent)/SectionHeader"

interface FAQProps {
  data: any
}

export default function Faq({ data }: FAQProps) {
  const [active, setActive] = useState<string | null>("1") // first open

  const toggle = (id: string) => {
    setActive(active === id ? null : id)
  }

  const headingObj = {
    heading:"Frequently Asked ",
    bold:"Questions",
    paragraph:"Find answers to common questions about women's health, pregnancy care, and gynecological treatments."
  }

  return (
    <section className=" py-20">
      <div className="max-w-4xl mx-auto px-4">

      <SectionHeader headingObj={headingObj} />

        {/* Accordion */}
        <div className="space-y-4">
          {data.questions.map((item: any) => {
            const isOpen = active === item.id

            return (
              <div
                key={item.id}
                className="bg-[#e5e7eb] rounded-xl px-6 py-5 cursor-pointer transition"
                onClick={() => toggle(item.id)}
              >
                {/* Question */}
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-(--secondary-text)">
                    {item.question}
                  </h3>

                  <ChevronDown
                    className={`transition-transform text-(--secondary-text) duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 mt-3" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-700 text-sm">
                    {item.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

