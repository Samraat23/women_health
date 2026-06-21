"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  HeartPulse,
  Hospital,
  Microscope,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import SectionHeader from "../(dynamiccomponent)/SectionHeader";

type SurgeryItem = {
  id?: number;
  name: string;
  img: string;
  description: string;
};

type SurgerySection = {
  title: string;
  highlight: string;
  surgery: SurgeryItem[];
};

type ProcedureMeta = {
  detail: string;
  href: string;
  icon: LucideIcon;
  tag: string;
};

const surgeryBenefits = [
  {
    icon: Microscope,
    label: "Keyhole precision",
    value: "Smaller cuts, better comfort",
  },
  {
    icon: TimerReset,
    label: "Faster recovery",
    value: "Structured healing support",
  },
  {
    icon: ShieldCheck,
    label: "Fertility aware",
    value: "Preserve healthy tissue",
  },
];

const procedureMeta: ProcedureMeta[] = [
  {
    detail: "Careful excision planning for pelvic pain, endometriosis and fertility goals.",
    href: "/endometriosis-treatment",
    icon: Activity,
    tag: "Deep disease care",
  },
  {
    detail: "Uterus-preserving removal for fibroids, heavy bleeding and pressure symptoms.",
    href: "/fibroid-removal-surgery",
    icon: Sparkles,
    tag: "Uterus preserving",
  },
  {
    detail: "Ovary-conscious cyst removal planned to protect healthy ovarian tissue.",
    href: "/ovarian-cyst-surgery",
    icon: HeartPulse,
    tag: "Ovary preserving",
  },
  {
    detail: "Minimally invasive hysterectomy planning when uterus removal is clinically needed.",
    href: "/uterus-removal-hysterectomy",
    icon: Hospital,
    tag: "Advanced route",
  },
  {
    detail: "Corrective procedures designed around conception and reproductive outcomes.",
    href: "/fertility-enhancing-surgery",
    icon: BadgeCheck,
    tag: "Fertility enhancing",
  },
  {
    detail: "Internal uterine diagnosis and treatment without abdominal incisions.",
    href: "/hysteroscopy-treatment",
    icon: Microscope,
    tag: "Scar-free access",
  },
  {
    detail: "Senior specialist review for complex gynecologic surgery decisions.",
    href: "/category/laparoscopic-surgery",
    icon: ShieldCheck,
    tag: "Complex care",
  },
  {
    detail: "Cervical support surgery for selected high-risk pregnancy cases.",
    href: "/cervical-cerclage",
    icon: HeartPulse,
    tag: "Pregnancy support",
  },
];

function getProcedureMeta(name: string, index: number) {
  const normalized = name.toLowerCase();

  if (normalized.includes("endometriosis")) return procedureMeta[0];
  if (normalized.includes("fibroid")) return procedureMeta[1];
  if (normalized.includes("ovarian") || normalized.includes("cyst")) {
    return procedureMeta[2];
  }
  if (normalized.includes("uterus")) return procedureMeta[3];
  if (normalized.includes("fertility")) return procedureMeta[4];
  if (normalized.includes("hysteroscopy")) return procedureMeta[5];
  if (normalized.includes("cancer")) return procedureMeta[6];
  if (normalized.includes("encerclage") || normalized.includes("cerclage")) {
    return procedureMeta[7];
  }

  return procedureMeta[index % procedureMeta.length];
}

export default function SurgeryCategory({ data }: { data: SurgerySection[] }) {
  const section = data?.[0];
  const surgeries = useMemo(() => section?.surgery || [], [section]);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!section || surgeries.length === 0) return null;

  const activeSurgery = surgeries[activeIdx] || surgeries[0];
  const activeMeta = getProcedureMeta(activeSurgery.name, activeIdx);
  const ActiveIcon = activeMeta.icon;
  const headingObj = {
    budge: "Centre of Excellence",
    heading: "Advanced Laparoscopic",
    bold: "Surgery",
    paragraph:
      "Minimally invasive gynecological procedures planned around safety, comfort, faster recovery, and long-term women's health.",
  };

  return (
    <section className="surgery-category-section">
      <div className="surgery-category-shell">
        <SectionHeader headingObj={headingObj} />

        <div className="surgery-category-layout">
          <aside className="surgery-category-feature">
            <div className="surgery-category-feature-media">
              <Image
                src={activeSurgery.img}
                alt={activeSurgery.name}
                fill
                sizes="(min-width: 1024px) 420px, 92vw"
                className="surgery-category-feature-image"
                priority
              />
              
              <span className="surgery-category-feature-pill">
                <ActiveIcon size={16} />
                {activeMeta.tag}
              </span>
            </div>

            <div className="surgery-category-feature-body">
              <span className="surgery-category-counter">
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(surgeries.length).padStart(2, "0")}
              </span>
              <h3>{activeSurgery.name}</h3>
              <p>{activeMeta.detail}</p>

              <div className="surgery-category-benefits">
                {surgeryBenefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <div className="surgery-category-benefit" key={benefit.label}>
                      <span>
                        <Icon size={18} />
                      </span>
                      <strong>{benefit.label}</strong>
                      <small>{benefit.value}</small>
                    </div>
                  );
                })}
              </div>

              <Link href={activeMeta.href} className="surgery-category-feature-link">
                Learn about this procedure
                <ArrowRight size={17} />
              </Link>
            </div>
          </aside>

          <div className="surgery-category-grid">
            {surgeries.map((item, index) => {
              const meta = getProcedureMeta(item.name, index);
              const Icon = meta.icon;
              const isActive = activeIdx === index;

              return (
                <Link
                  href={meta.href}
                  className="surgery-category-card"
                  data-active={isActive}
                  key={`${item.id}-${item.name}-${index}`}
                  onFocus={() => setActiveIdx(index)}
                  onMouseEnter={() => setActiveIdx(index)}
                  aria-label={`Learn more about ${item.name}`}
                >
                  <div className="surgery-category-card-head">
                    <span className="surgery-category-card-icon">
                      <Icon size={21} />
                    </span>

                    <div className="surgery-category-card-title">
                      <span className="surgery-category-card-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3>{item.name}</h3>
                    </div>

                    <span className="surgery-category-card-link">
                      <ArrowRight size={18} />
                    </span>
                  </div>

                  <p>{item.description}</p>

                  <div className="surgery-category-card-foot">
                    <span className="surgery-category-card-tag">{meta.tag}</span>
                    <span>Advanced laparoscopic care</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
