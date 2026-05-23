import React from 'react'
import { ArrowUpRight } from 'lucide-react'

function Consultation() {
  return (
    <div>
         <div className="rounded-2xl bg-[linear-gradient(135deg,var(--primary-text-color),var(--primary-color))] p-7 text-center text-white shadow-xl md:p-10">
            <h2 className="font-[var(--font-primary)] text-2xl font-black md:text-3xl">
              Need expert pregnancy care?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-8 text-white/70">
              Book a consultation with Dr. Kusum Lata Bhardwaj for complete pregnancy guidance tailored to your health needs.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/919289140812"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-black text-[var(--primary-color)]"
              >
                Book appointment <ArrowUpRight size={17} />
              </a>
             
                
            
            </div>
          </div>
    </div>
  )
}

export default Consultation