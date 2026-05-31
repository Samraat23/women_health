"use client";

import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  GraduationCap,
  MapPin,
  Microscope,
  ShieldCheck,
} from "lucide-react";

import { AnimBox } from "../../../../utils/AnimBox";
import doctorPhoto from "../../(assets)/kusummam.jpg";

const badges = [
  {
    icon: GraduationCap,
    label: "Academic Training",
    body: "Strong clinical foundation from leading institutions",
  },
  {
    icon: Building2,
    label: "Hospital Experience",
    body: "Exposure to complex cases and structured protocols",
  },
  {
    icon: Microscope,
    label: "Surgical Planning",
    body: "Measured decisions for comfort, safety, and recovery",
  },
];

function AboutSection() {
  return (
    <section className="bg-[var(--background)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <AnimBox from="left">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[34px] border border-white/70 bg-white p-3 shadow-[0_28px_70px_rgba(27,20,99,0.14)]">
                <div className="relative h-[520px] overflow-hidden rounded-[26px] bg-[var(--background)] sm:h-[620px]">
                  <Image
                    src={doctorPhoto}
                    alt="Dr. Kusum Lata"
                    fill
                    sizes="(min-width: 1024px) 520px, 92vw"
                    className="object-cover object-[center_12%]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(180deg,rgba(27,20,99,0)_0%,rgba(27,20,99,0.78)_100%)]" />
                </div>
              </div>

              <div className="absolute left-5 top-5 rounded-2xl bg-white/95 p-4 text-[var(--primary-text-color)] shadow-[0_16px_34px_rgba(27,20,99,0.16)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white">
                    <ShieldCheck size={20} />
                  </span>
                  <span>
                    <span className="block text-sm font-black">17+ Years</span>
                    <span className="block text-xs font-bold text-[var(--secondary-text)]/65">
                      Specialist experience
                    </span>
                  </span>
                </div>
              </div>

              <div className="absolute bottom-6 left-5 right-5 rounded-3xl border border-white/70 bg-white/95 p-4 text-[var(--primary-text-color)] shadow-[0_16px_38px_rgba(27,20,99,0.16)] backdrop-blur-md sm:left-auto sm:w-[320px]">
                <div className="flex items-start gap-3">
                  <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--primary-color)]/10 text-[var(--primary-color)]">
                    <MapPin size={18} />
                  </span>
                  <span>
                    <span className="block text-xs font-black uppercase tracking-[0.16em] text-[var(--primary-color)]">
                      Clinic Location
                    </span>
                    <span className="mt-1 block text-sm font-black">
                      Sushant Lok-2, Sector 55
                    </span>
                    <span className="block text-xs font-bold text-[var(--secondary-text)]/65">
                      Gurgaon, Haryana
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </AnimBox>

          <AnimBox from="right" delay={0.15}>
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--primary-color)] shadow-sm">
                <BadgeCheck size={16} />
                Who She Is
              </div>

              <h2 className="font-[var(--font-primary)] text-4xl font-black leading-tight text-[var(--primary-text-color)] sm:text-5xl">
                A steady, specialist approach to every consultation.
              </h2>

              <div className="mt-6 space-y-5 text-base font-semibold leading-8 text-[var(--secondary-text)]/72">
                <p>
                  Dr. Kusum Lata brings together outpatient consultation,
                  pregnancy guidance, fertility evaluation, and complex surgery
                  planning under one calm, patient-first approach.
                </p>
                <p>
                  Before founding the Gurgaon centre, she trained and worked in
                  leading hospital environments where clear diagnosis,
                  counseling, and follow-up planning were central to care.
                </p>
                <p>
                  Patients come to her for measured decisions, honest
                  communication, and treatment plans that respect long-term
                  health goals.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {badges.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-[var(--primary-color)]/10 bg-white p-5 shadow-[0_16px_34px_rgba(27,20,99,0.08)]"
                    >
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] text-white">
                        <Icon size={22} />
                      </span>
                      <p className="mt-4 text-sm font-black text-[var(--primary-text-color)]">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs font-semibold leading-5 text-[var(--secondary-text)]/62">
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </AnimBox>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
