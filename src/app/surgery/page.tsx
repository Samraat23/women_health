import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TimerReset,
} from "lucide-react";

import data from "@/data/siteData.json";
import {
  getSurgeryProcedureMeta,
  surgeryBenefits,
} from "@/data/SurgeryServices";

type SurgeryItem = {
  id?: number;
  key?: string;
  name: string;
  img: string;
  description: string;
};

type CareStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type PatientConcern = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  background: string;
};

export const metadata: Metadata = {
  title: "Surgery Services | Dr. Kusum Lata",
  description:
    "Explore advanced gynecology surgery services including endometriosis, fibroid removal, uterus removal, ovarian cyst surgery, hysteroscopy and fertility enhancing surgery.",
};

const appointmentHref = "https://wa.me/919289140812";

const surgeryData = data.LaparoscopicSurgery[0];
const surgeries = surgeryData.surgery as SurgeryItem[];

const heroAssurances = [
  {
    icon: ClipboardCheck,
    title: "Surgery only when needed",
    text: "Your scans, symptoms and goals are reviewed before any procedure is advised.",
  },
  {
    icon: Microscope,
    title: "Small-cut approach",
    text: "Laparoscopy and hysteroscopy are considered first when clinically suitable.",
  },
  {
    icon: HeartPulse,
    title: "Future health protected",
    text: "Pain relief, fertility plans and long-term comfort are discussed together.",
  },
];

const patientConcerns: PatientConcern[] = [
  {
    title: "Will it be painful?",
    description:
      "Pain control, anaesthesia and the first recovery days are explained before admission.",
    icon: Activity,
    color: "#be185d",
    background: "#fdf2f8",
  },
  {
    title: "Will fertility be safe?",
    description:
      "For endometriosis, fibroids and cysts, healthy reproductive tissue is protected wherever possible.",
    icon: HeartPulse,
    color: "#0f766e",
    background: "#ecfdf5",
  },
  {
    title: "How big are the scars?",
    description:
      "Most laparoscopic procedures use tiny keyhole cuts, and hysteroscopy avoids abdominal cuts.",
    icon: Microscope,
    color: "#5a4ffe",
    background: "#f1efff",
  },
  {
    title: "How soon can I recover?",
    description:
      "Hospital stay, walking, work, periods and follow-up are planned according to the procedure.",
    icon: TimerReset,
    color: "#b45309",
    background: "#fffbeb",
  },
];

const careSteps: CareStep[] = [
  {
    title: "Listen to the problem",
    description:
      "Pain pattern, bleeding, fertility goals, reports and previous treatment are discussed first.",
    icon: Stethoscope,
  },
  {
    title: "Confirm the diagnosis",
    description:
      "Ultrasound, hysteroscopy, laparoscopy planning or additional tests are considered only as needed.",
    icon: FileText,
  },
  {
    title: "Choose the safest route",
    description:
      "Medical care, monitoring, hysteroscopy or laparoscopy is selected around your condition.",
    icon: ShieldCheck,
  },
  {
    title: "Recover with guidance",
    description:
      "Follow-up covers wound care, pain, diet, movement, periods and when to resume routine.",
    icon: CalendarCheck,
  },
];

const consultReasons = [
  "Severe period pain or chronic pelvic pain",
  "Heavy bleeding, clots or low hemoglobin",
  "Fibroids, ovarian cysts or suspected endometriosis",
  "Infertility with uterine, tubal or pelvic factors",
  "Abnormal bleeding needing hysteroscopy evaluation",
  "Recurrent pregnancy loss or cervical weakness concerns",
];

export default function SurgeryPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--secondary-text)]">
      <section className="relative left-1/2 min-h-[760px] w-screen -translate-x-1/2 overflow-hidden px-4 pb-20 pt-36 text-white sm:px-6 lg:pt-40">
        <Image
          src="/image/ drkusumlatagynecologist.jpeg"
          alt="Dr. Kusum Lata gynecology surgery care"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,20,99,0.92)_0%,rgba(49,40,90,0.78)_46%,rgba(15,118,110,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,99,0.14)_0%,rgba(27,20,99,0.18)_58%,var(--background)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[600px] max-w-7xl items-center">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[var(--primary-text-color)] shadow-[0_12px_26px_rgba(27,20,99,0.18)]">
              <Sparkles size={16} className="text-[var(--primary-color)]" />
              Surgery With Clarity
            </div>

            <h1 className="mt-6 max-w-4xl font-[var(--font-primary)] text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
              Surgery care that feels calm, clear and planned
            </h1>

            <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-white/80 lg:text-lg">
              A surgery page should reduce fear, not increase it. Explore
              endometriosis, fibroid, uterus removal, hysteroscopy and other
              gynecology procedures with simple guidance on why, when and what
              happens next.
            </p>

            <div className="mt-8 grid max-w-4xl gap-3 md:grid-cols-3">
              {heroAssurances.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/25 bg-white/10 p-4 shadow-[0_14px_30px_rgba(27,20,99,0.16)] backdrop-blur-md"
                  >
                    <Icon size={22} className="text-white" />
                    <p className="mt-3 text-sm font-black text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs font-semibold leading-5 text-white/70">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="#surgery-services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-black text-[var(--primary-text-color)] shadow-[0_16px_30px_rgba(27,20,99,0.18)] transition hover:-translate-y-0.5"
              >
                Explore Services
                <ArrowRight size={18} />
              </Link>
              <Link
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-4 text-sm font-black text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/18"
              >
                <CalendarCheck size={18} />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {patientConcerns.map((concern) => {
              const Icon = concern.icon;

              return (
                <article
                  key={concern.title}
                  className="rounded-lg border border-[var(--border)]/10 bg-white p-5 shadow-[0_18px_44px_rgba(27,20,99,0.10)]"
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: concern.background,
                      color: concern.color,
                    }}
                  >
                    <Icon size={23} />
                  </span>
                  <h2 className="mt-4 text-lg font-black leading-tight text-[var(--primary-text-color)]">
                    {concern.title}
                  </h2>
                  <p className="mt-2 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                    {concern.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="surgery-services" className="px-4 pb-16 md:px-6 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[var(--primary-color)] shadow-sm">
                <Microscope size={16} />
                {surgeryData.highlight}
              </div>
              <h2 className="mt-4 max-w-3xl font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl lg:text-5xl">
                Surgery services designed around patient comfort
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                Each service opens a detailed guide. Endometriosis goes to the
                endometriosis blog page, and other procedures open their own
                surgery information pages.
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)]/10 bg-white p-5 shadow-[0_18px_42px_rgba(27,20,99,0.08)]">
              <p className="text-sm font-black text-[var(--primary-text-color)]">
                Before any surgery decision
              </p>
              <div className="mt-4 space-y-3">
                {surgeryBenefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div key={benefit.label} className="flex gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)]">
                        <Icon size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-black text-[var(--primary-text-color)]">
                          {benefit.label}
                        </p>
                        <p className="text-xs font-semibold leading-5 text-[var(--secondary-text)]/60">
                          {benefit.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {surgeries.map((service, index) => (
              <SurgeryServiceCard
                key={`${service.id}-${service.name}`}
                service={service}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/60 px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(15,118,110,0.10)] px-4 py-2 text-xs font-black text-[#0f766e]">
                <BadgeCheck size={16} />
                Care Pathway
              </div>
              <h2 className="mt-4 font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
                What happens before and after surgery
              </h2>
              <p className="mt-4 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                A clear pathway helps reduce anxiety. The aim is to explain the
                diagnosis, the reason for surgery, the safer route and the
                recovery plan before the procedure.
              </p>
              <Link
                href={appointmentHref}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-6 py-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(90,79,254,0.24)] transition hover:-translate-y-0.5"
              >
                Talk to Doctor
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {careSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="rounded-lg border border-[var(--border)]/10 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)]">
                        <Icon size={22} />
                      </span>
                      <span className="text-sm font-black text-[var(--primary-color)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-black leading-tight text-[var(--primary-text-color)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
                      {step.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:px-6 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(236,72,153,0.10)] px-4 py-2 text-xs font-black text-[#be185d]">
                <ShieldCheck size={16} />
                When To Consult
              </div>
              <h2 className="mt-4 max-w-3xl font-[var(--font-primary)] text-3xl font-black leading-tight text-[var(--primary-text-color)] sm:text-4xl">
                Symptoms that deserve a specialist review
              </h2>
            </div>
            <p className="max-w-xl text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
              These signs do not always mean surgery, but they should be
              evaluated early so pain, bleeding, fertility and recovery are not
              delayed.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {consultReasons.map((reason) => (
              <div
                key={reason}
                className="flex gap-3 rounded-lg border border-[var(--border)]/10 bg-white p-4 shadow-sm"
              >
                <CheckCircle2
                  size={19}
                  className="mt-0.5 shrink-0 text-[#0f766e]"
                />
                <span className="text-sm font-bold leading-6 text-[var(--secondary-text)]/80">
                  {reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SurgeryServiceCard({
  service,
  index,
}: {
  service: SurgeryItem;
  index: number;
}) {
  const meta = getSurgeryProcedureMeta(service.name, index);
  const Icon = meta.icon;
  const isEndometriosis = service.name.toLowerCase().includes("endometriosis");

  return (
    <Link href={meta.href} className="group block h-full">
      <article className="relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-lg border border-[var(--border)]/10 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[var(--primary-color)]/25 hover:shadow-[0_20px_46px_rgba(27,20,99,0.12)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#0f766e,var(--primary-color),#be185d)]" />

        <div className="p-5 pb-0">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)] transition group-hover:bg-[var(--primary-color)] group-hover:text-white">
              <Icon size={25} />
            </span>
            <span className="rounded-full bg-[var(--background)] px-3 py-1.5 text-xs font-black text-[var(--primary-color)]">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[rgba(15,118,110,0.10)] px-3 py-1.5 text-xs font-black text-[#0f766e]">
              {meta.tag}
            </span>
            {isEndometriosis && (
              <span className="rounded-full bg-[rgba(236,72,153,0.10)] px-3 py-1.5 text-xs font-black text-[#be185d]">
                Opens Endometriosis guide
              </span>
            )}
          </div>

          <h3 className="mt-4 font-[var(--font-primary)] text-2xl font-black leading-tight text-[var(--primary-text-color)]">
            {service.name}
          </h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-[var(--secondary-text)]/70">
            {meta.detail}
          </p>
        </div>

        <div className="relative mx-5 mt-5 h-36 overflow-hidden rounded-lg bg-[var(--background)]">
          <Image
            src={service.img}
            alt={service.name}
            fill
            sizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 92vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,20,99,0)_40%,rgba(27,20,99,0.62)_100%)]" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[var(--primary-color)]">
            <Clock3 size={14} />
            Guided recovery
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="line-clamp-2 text-sm font-semibold leading-7 text-[var(--secondary-text)]/60">
            {service.description}
          </p>

          <div className="mt-5">
            <p className="text-xs font-black text-[var(--primary-text-color)]">
              Often discussed for
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {meta.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[var(--border)]/10 bg-[var(--background)] px-3 py-1.5 text-xs font-black text-[var(--secondary-text)]/72"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[var(--border)]/10 pt-5">
            <span className="inline-flex items-center gap-2 text-sm font-black text-[var(--primary-color)]">
              Read full guide
              <ArrowRight
                size={17}
                className="transition group-hover:translate-x-1"
              />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(90,79,254,0.08)] text-[var(--primary-color)] transition group-hover:bg-[var(--primary-color)] group-hover:text-white">
              <BadgeCheck size={17} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
