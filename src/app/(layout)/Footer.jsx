"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarCheck,
  Instagram,
  MapPin,
  Phone,
  Send,
  Youtube,
} from "lucide-react";

import data from "../(data)/db.json";
import logo from "../(assets)/ logo.png";
import { gynecologyCategories } from "@/data/Categories";

const appointmentHref = "https://wa.me/919289140812";
const instagramHref =
  "https://www.instagram.com/drkusumendometriosissurgeon/";

const surgeryHrefByName = {
  "Endometriosis Surgery": "/endometriosis-treatment",
  "Fibroid Removal": "/fibroid-removal-surgery",
  "Ovarian Cyst Removal": "/ovarian-cyst-surgery",
  "Uterus Removal": "/uterus-removal-hysterectomy",
  "Fertility Enhancing surgery": "/fertility-enhancing-surgery",
  Hysteroscopy: "/hysteroscopy-treatment",
  "Cancer Surgery": "/category/laparoscopic-surgery",
  "Cervical Encerclage": "/cervical-cerclage",
};

const siteMapLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Women Health", href: "/category/young-women-care" },
  { name: "Surgery", href: "/category/laparoscopic-surgery" },
  { name: "Pregnancy Care", href: "/category/pregnancy-care" },
  { name: "Articles", href: "/article" },
];

const pregnancyLinks = [
  { name: "Pregnancy Care", href: "/category/pregnancy-care" },
  { name: "Normal Pregnancy Care", href: "/normal-pregnancy-care" },
  { name: "High Risk Pregnancy", href: "/high-risk-pregnancy" },
  { name: "Pregnancy Ultrasound", href: "/pregnancy-ultrasound" },
  { name: "Post Pregnancy Recovery", href: "/post-pregnancy-recovery" },
  { name: "Fertility & Infertility", href: "/category/fertility-infertility" },
];

const socialLinks = [
  { name: "Instagram", href: instagramHref, Icon: Instagram },
  { name: "YouTube", href: "https://www.youtube.com/watch?v=WHjNV8dEh5U", Icon: Youtube },
  { name: "WhatsApp", href: appointmentHref, Icon: Send },
];

function isExternalLink(href) {
  return href.startsWith("http") || href.startsWith("tel:");
}

function SmartLink({ href, children, className, ariaLabel }) {
  if (isExternalLink(href)) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className={className}>
      {children}
    </Link>
  );
}

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="font-[var(--font-primary)] text-lg font-black text-[var(--primary-text-color)]">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.name}`}>
            <SmartLink
              href={link.href}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--secondary-text)]/80 transition hover:text-[var(--primary-color)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary-color)]/25 transition group-hover:bg-[var(--primary-color)]" />
              {link.name}
            </SmartLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  const footerData = data.footer;
  const { KusumImage = [], LaparoscopicSurgery = [] } = data;

  const surgeryLinks = (LaparoscopicSurgery[0]?.surgery || []).map((item) => ({
    name: item.name,
    href: surgeryHrefByName[item.name] || "/category/laparoscopic-surgery",
  }));

  const womenHealthLinks = gynecologyCategories
    .filter(
      (item) =>
        item.slug !== "laparoscopic-surgery" && item.slug !== "pregnancy-care"
    )
    .map((item) => ({
      name: item.title,
      href: `/category/${item.slug}`,
    }));

  const footerColumns = [
    { title: "Site Map", links: siteMapLinks },
    { title: "Surgery", links: surgeryLinks },
    { title: "Women Health", links: womenHealthLinks },
    { title: "Pregnancy & Fertility", links: pregnancyLinks },
  ];

  return (
    <footer className="relative overflow-hidden px-4 py-16 md:px-6">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--primary-text-color)_0%,var(--secondary-color)_42%,var(--primary-color)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[var(--background)]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10" />

      <div className="relative mx-auto max-w-7xl space-y-7">
        <section className="overflow-hidden rounded-[32px] bg-white p-5 shadow-[0_24px_70px_rgba(27,20,99,0.18)] md:rounded-[40px] md:p-8">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--primary-color)]">
                Patient Moments
              </p>
              <h2 className="mt-2 font-[var(--font-primary)] text-2xl font-black text-[var(--primary-text-color)] md:text-3xl">
                Our happy patients
              </h2>
            </div>

            <SmartLink
              href={instagramHref}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--primary-color)]/15 bg-[var(--background)] px-4 py-2 text-sm font-black text-[var(--primary-text-color)] transition hover:border-[var(--primary-color)]/35 hover:bg-white"
            >
              @drkusumendometriosissurgeon
              <ArrowUpRight size={16} />
            </SmartLink>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex w-max gap-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 55, ease: "linear", repeat: Infinity }}
            >
              {[...KusumImage, ...KusumImage].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="relative h-44 w-44 shrink-0 overflow-hidden rounded-3xl bg-[var(--background)] sm:h-52 sm:w-56 md:h-56"
                >
                  <Image
                    src={item.img}
                    fill
                    alt="Patient moment"
                    sizes="(min-width: 768px) 224px, 176px"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="rounded-[32px] bg-white p-6 shadow-[0_24px_70px_rgba(27,20,99,0.18)] md:rounded-[40px] md:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-3 xl:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))]">
            <div className="lg:col-span-3 xl:col-span-1">
              <Link href="/" className="relative block h-20 w-44">
                <Image src={logo} alt="Dr. Kusum Lata logo" fill className="object-contain" />
              </Link>

              <p className="mt-5 max-w-sm text-sm font-semibold leading-7 text-[var(--secondary-text)]/80">
                {footerData?.description ||
                  "Expert gynecology, pregnancy care, laparoscopic surgery, fertility, and complete women's health support."}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <SmartLink
                  href={appointmentHref}
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--primary-color),var(--secondary-color))] px-5 py-3 text-sm font-black text-white shadow-[0_12px_26px_rgba(90,79,254,0.25)] transition hover:-translate-y-0.5"
                >
                  <CalendarCheck size={17} />
                  Book Appointment
                </SmartLink>
                <SmartLink
                  href="tel:9289140812"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--primary-color)]/15 px-5 py-3 text-sm font-black text-[var(--primary-text-color)] transition hover:border-[var(--primary-color)]/35"
                >
                  <Phone size={17} />
                  Call Clinic
                </SmartLink>
              </div>

              <div className="mt-7 space-y-3 text-sm font-semibold leading-6 text-[var(--secondary-text)]/75">
                <p className="flex gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--primary-color)]" />
                  287 A1 Block, Sushant Lok - 2, Sector-55, Gurgaon, Haryana 122002
                </p>
                <SmartLink
                  href={appointmentHref}
                  className="inline-flex items-center gap-3 transition hover:text-[var(--primary-color)]"
                >
                  <Send size={18} className="text-[var(--primary-color)]" />
                  WhatsApp: +91 92891 40812
                </SmartLink>
              </div>
            </div>

            {footerColumns.map((column) => (
              <FooterLinkColumn
                key={column.title}
                title={column.title}
                links={column.links}
              />
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 border-t border-[var(--border)]/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-3xl text-xs font-semibold leading-6 text-[var(--secondary-text)]/65">
              Disclaimer: For educational purposes only, not medical advice.
              Results may vary. © Copyright 2026, Dr. Kusum Lata. All Rights
              Reserved.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, Icon }) => (
                <SmartLink
                  key={name}
                  href={href}
                  ariaLabel={name}
                  className="grid h-11 w-11 place-items-center rounded-full bg-[var(--background)] text-[var(--primary-text-color)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-color)] hover:text-white"
                >
                  <Icon size={19} />
                </SmartLink>
              ))}
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
