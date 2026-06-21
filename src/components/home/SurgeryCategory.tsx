"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  getSurgeryProcedureMeta,
  surgeryBenefits,
} from "@/data/SurgeryServices";
import SectionHeader from "@/components/shared/SectionHeader";

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

export default function SurgeryCategory({ data }: { data: SurgerySection[] }) {
  const section = data?.[0];
  const surgeries = useMemo(() => section?.surgery || [], [section]);
  const [activeIdx, setActiveIdx] = useState(0);

  if (!section || surgeries.length === 0) return null;

  const activeSurgery = surgeries[activeIdx] || surgeries[0];
  const activeMeta = getSurgeryProcedureMeta(activeSurgery.name, activeIdx);
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
              const meta = getSurgeryProcedureMeta(item.name, index);
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
