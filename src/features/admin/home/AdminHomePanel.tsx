"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ImagePlus,
  LayoutDashboard,
  Menu,
  Plus,
  RotateCcw,
  Save,
  Sparkles,
  Trash2,
  Upload,
  Video,
} from "lucide-react";

import type {
  HomeHeroContent,
  HomeNavbarContent,
  HomePageContent,
  HomeTrainerContent,
} from "@/types/homeContent";

import AdminLogoutButton from "./AdminLogoutButton";

type AdminTab = "navbar" | "hero" | "trainer";

const tabs: Array<{
  id: AdminTab;
  label: string;
  icon: typeof Menu;
}> = [
  { id: "navbar", label: "Navbar", icon: Menu },
  { id: "hero", label: "Hero Section", icon: Sparkles },
  { id: "trainer", label: "Laparoscopic Trainer", icon: Video },
];

const submenuOptions = [
  { label: "No submenu", value: "" },
  { label: "Women Health", value: "womenHealth" },
  { label: "Pregnancy", value: "pregnancy" },
];

function emptyContent(): HomePageContent {
  return {
    navbar: {
      logoUrl: "",
      appointmentLabel: "",
      appointmentUrl: "",
      items: [],
    },
    hero: {
      badge: "",
      heading: "",
      description: "",
      primaryCtaLabel: "",
      primaryCtaUrl: "",
      secondaryCtaLabel: "",
      secondaryCtaUrl: "",
      imageUrl: "",
      imageAlt: "",
      doctorName: "",
      doctorMeta: "",
    },
    trainer: {
      subtitle: "",
      title: "",
      description: "",
      primaryCta: "",
      primaryCtaUrl: "",
      secondaryCta: "",
      secondaryCtaUrl: "",
      images: [],
    },
  };
}

export default function AdminHomePanel() {
  const [activeTab, setActiveTab] = useState<AdminTab>("navbar");
  const [content, setContent] = useState<HomePageContent>(() => emptyContent());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const activeTitle = useMemo(
    () => tabs.find((tab) => tab.id === activeTab)?.label || "Home",
    [activeTab]
  );

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch("/api/admin/home-content", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load home page content.");
        }

        const data = (await response.json()) as HomePageContent;

        if (isMounted) {
          setContent(data);
        }
      } catch (caughtError) {
        if (isMounted) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Unable to load content."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!notice) {
      return;
    }

    const timeout = window.setTimeout(() => setNotice(""), 2600);

    return () => window.clearTimeout(timeout);
  }, [notice]);

  function updateNavbar(nextNavbar: HomeNavbarContent) {
    setContent((current) => ({ ...current, navbar: nextNavbar }));
  }

  function updateHero(nextHero: HomeHeroContent) {
    setContent((current) => ({ ...current, hero: nextHero }));
  }

  function updateTrainer(nextTrainer: HomeTrainerContent) {
    setContent((current) => ({ ...current, trainer: nextTrainer }));
  }

  async function saveContent() {
    setIsSaving(true);
    setError("");

    try {
      const response = await fetch("/api/admin/home-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save content.");
      }

      setNotice("Home page content saved.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error ? caughtError.message : "Unable to save content."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function resetContent() {
    if (!window.confirm("Reload the latest saved Home content?")) {
      return;
    }

    const response = await fetch("/api/admin/home-content", {
      cache: "no-store",
    });

    if (response.ok) {
      setContent((await response.json()) as HomePageContent);
      setNotice("Latest saved content loaded.");
    }
  }

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/admin/home-content/upload", {
      method: "POST",
      body: formData,
    });
    const data = (await response.json().catch(() => null)) as {
      message?: string;
      url?: string;
    } | null;

    if (!response.ok || !data?.url) {
      throw new Error(data?.message || "Image upload failed.");
    }

    setNotice("Image uploaded. Save to publish it.");

    return data.url;
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-white lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3 px-4 py-5 lg:px-5">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white">
              <LayoutDashboard size={22} />
            </span>
            <div>
              <p className="text-lg font-black leading-tight">WHealth Admin</p>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                Home Control
              </p>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:block lg:space-y-2 lg:overflow-visible lg:px-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex min-w-[190px] items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-black transition lg:min-w-0 lg:w-full ${
                    isActive
                      ? "bg-slate-950 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/92 px-4 py-4 backdrop-blur md:px-8">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5a4ffe]">
                  Home Page Dynamic
                </p>
                <h1 className="mt-1 text-2xl font-black text-slate-950 md:text-3xl">
                  {activeTitle}
                </h1>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={resetContent}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <RotateCcw size={17} />
                  Reload
                </button>
                <button
                  type="button"
                  onClick={saveContent}
                  disabled={isSaving || isLoading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5a4ffe] px-5 text-sm font-black text-white shadow-[0_14px_26px_rgba(90,79,254,0.22)] transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={17} />
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <Link
                  href="/"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  <Home size={17} />
                  View Home
                </Link>
                <AdminLogoutButton />
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-6xl px-4 py-6 md:px-8 md:py-8">
            {notice && (
              <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                {notice}
              </div>
            )}

            {error && (
              <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="rounded-lg border border-slate-200 bg-white p-8 text-sm font-bold text-slate-500 shadow-sm">
                Loading Home content...
              </div>
            ) : (
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:p-6">
                {activeTab === "navbar" && (
                  <NavbarEditor
                    data={content.navbar}
                    onChange={updateNavbar}
                    onUpload={uploadImage}
                  />
                )}
                {activeTab === "hero" && (
                  <HeroEditor
                    data={content.hero}
                    onChange={updateHero}
                    onUpload={uploadImage}
                  />
                )}
                {activeTab === "trainer" && (
                  <TrainerEditor
                    data={content.trainer}
                    onChange={updateTrainer}
                    onUpload={uploadImage}
                  />
                )}
               
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function NavbarEditor({
  data,
  onChange,
  onUpload,
}: {
  data: HomeNavbarContent;
  onChange: (data: HomeNavbarContent) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  async function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = await onUpload(file);
    onChange({ ...data, logoUrl: url });
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Navbar"
        description="Control the Home navigation logo, menu items, and appointment button."
      />

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ImageUploadCard
          title="Logo"
          imageUrl={data.logoUrl}
          onUpload={handleLogoUpload}
        />

        <div className="grid gap-4">
          <TextField
            label="Appointment button text"
            value={data.appointmentLabel}
            onChange={(value) => onChange({ ...data, appointmentLabel: value })}
          />
          <TextField
            label="Appointment button link"
            value={data.appointmentUrl}
            onChange={(value) => onChange({ ...data, appointmentUrl: value })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black text-slate-950">Menu Items</p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                items: [
                  ...data.items,
                  {
                    id: `nav-${Date.now()}`,
                    label: "New Item",
                    href: "/",
                  },
                ],
              })
            }
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-xs font-black text-white"
          >
            <Plus size={15} />
            Add Item
          </button>
        </div>

        <div className="grid gap-3">
          {data.items.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[1fr_1fr_180px_42px]"
            >
              <TextField
                label={`Label ${index + 1}`}
                value={item.label}
                onChange={(value) => {
                  const items = [...data.items];
                  items[index] = { ...item, label: value };
                  onChange({ ...data, items });
                }}
              />
              <TextField
                label="Link"
                value={item.href}
                onChange={(value) => {
                  const items = [...data.items];
                  items[index] = { ...item, href: value };
                  onChange({ ...data, items });
                }}
              />
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
                  Submenu
                </span>
                <select
                  value={item.submenuType || ""}
                  onChange={(event) => {
                    const value = event.target.value;
                    const items = [...data.items];
                    items[index] = {
                      ...item,
                      submenuType: value
                        ? (value as HomeNavbarContent["items"][number]["submenuType"])
                        : undefined,
                    };
                    onChange({ ...data, items });
                  }}
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 outline-none focus:border-[#5a4ffe] focus:ring-4 focus:ring-[#5a4ffe]/10"
                >
                  {submenuOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                onClick={() =>
                  onChange({
                    ...data,
                    items: data.items.filter((menuItem) => menuItem.id !== item.id),
                  })
                }
                className="mt-5 grid h-11 w-11 place-items-center rounded-lg border border-rose-200 bg-white text-rose-600 transition hover:bg-rose-50"
                aria-label="Remove menu item"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroEditor({
  data,
  onChange,
  onUpload,
}: {
  data: HomeHeroContent;
  onChange: (data: HomeHeroContent) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  async function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = await onUpload(file);
    onChange({ ...data, imageUrl: url });
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Hero Section"
        description="Edit the large first-screen copy, CTAs, doctor image, and image card text."
      />

      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ImageUploadCard
          title="Hero image"
          imageUrl={data.imageUrl}
          onUpload={handleImageUpload}
        />

        <div className="grid gap-4">
          <TextField
            label="Badge"
            value={data.badge}
            onChange={(value) => onChange({ ...data, badge: value })}
          />
          <TextAreaField
            label="Heading"
            value={data.heading}
            onChange={(value) => onChange({ ...data, heading: value })}
          />
          <TextAreaField
            label="Description"
            value={data.description}
            onChange={(value) => onChange({ ...data, description: value })}
          />
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Primary CTA text"
              value={data.primaryCtaLabel}
              onChange={(value) => onChange({ ...data, primaryCtaLabel: value })}
            />
            <TextField
              label="Primary CTA link"
              value={data.primaryCtaUrl}
              onChange={(value) => onChange({ ...data, primaryCtaUrl: value })}
            />
            <TextField
              label="Secondary CTA text"
              value={data.secondaryCtaLabel}
              onChange={(value) => onChange({ ...data, secondaryCtaLabel: value })}
            />
            <TextField
              label="Secondary CTA link"
              value={data.secondaryCtaUrl}
              onChange={(value) => onChange({ ...data, secondaryCtaUrl: value })}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              label="Doctor name card"
              value={data.doctorName}
              onChange={(value) => onChange({ ...data, doctorName: value })}
            />
            <TextField
              label="Doctor meta card"
              value={data.doctorMeta}
              onChange={(value) => onChange({ ...data, doctorMeta: value })}
            />
          </div>
          <TextField
            label="Image alt text"
            value={data.imageAlt}
            onChange={(value) => onChange({ ...data, imageAlt: value })}
          />
        </div>
      </div>
    </div>
  );
}

function TrainerEditor({
  data,
  onChange,
  onUpload,
}: {
  data: HomeTrainerContent;
  onChange: (data: HomeTrainerContent) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  async function handleTrainerImageUpload(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = await onUpload(file);
    const images = [...data.images];
    images[index] = { ...images[index], img: url };
    onChange({ ...data, images });
  }

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Laparoscopic Trainer"
        description="Control trainer text, CTA buttons, and the image collage."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Badge"
          value={data.subtitle}
          onChange={(value) => onChange({ ...data, subtitle: value })}
        />
        <TextField
          label="Title"
          value={data.title}
          onChange={(value) => onChange({ ...data, title: value })}
        />
      </div>
      <TextAreaField
        label="Description"
        value={data.description}
        onChange={(value) => onChange({ ...data, description: value })}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Primary CTA text"
          value={data.primaryCta}
          onChange={(value) => onChange({ ...data, primaryCta: value })}
        />
        <TextField
          label="Primary CTA link"
          value={data.primaryCtaUrl}
          onChange={(value) => onChange({ ...data, primaryCtaUrl: value })}
        />
        <TextField
          label="Secondary CTA text"
          value={data.secondaryCta}
          onChange={(value) => onChange({ ...data, secondaryCta: value })}
        />
        <TextField
          label="Secondary CTA link"
          value={data.secondaryCtaUrl}
          onChange={(value) => onChange({ ...data, secondaryCtaUrl: value })}
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-black text-slate-950">Collage Images</p>
          <button
            type="button"
            onClick={() =>
              onChange({
                ...data,
                images: [
                  ...data.images,
                  {
                    id: `trainer-${Date.now()}`,
                    img: "",
                    alt: "Trainer image",
                  },
                ],
              })
            }
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-xs font-black text-white"
          >
            <Plus size={15} />
            Add Image
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.images.map((image, index) => (
            <div
              key={image.id}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="relative h-44 overflow-hidden rounded-lg bg-white">
                {image.img ? (
                  <Image
                    src={image.img}
                    alt={image.alt || "Trainer image"}
                    fill
                    sizes="280px"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-slate-400">
                    <ImagePlus size={28} />
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-3">
                <label className="inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50">
                  <Upload size={16} />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleTrainerImageUpload(event, index)}
                    className="hidden"
                  />
                </label>
                <TextField
                  label="Alt text"
                  value={image.alt}
                  onChange={(value) => {
                    const images = [...data.images];
                    images[index] = { ...image, alt: value };
                    onChange({ ...data, images });
                  }}
                />
                <button
                  type="button"
                  onClick={() =>
                    onChange({
                      ...data,
                      images: data.images.filter((item) => item.id !== image.id),
                    })
                  }
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-4 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionHeading({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="border-b border-slate-200 pb-5">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#5a4ffe]">
        Home Section
      </p>
      <h2 className="mt-2 text-2xl font-black text-slate-950">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}

function ImageUploadCard({
  imageUrl,
  onUpload,
  title,
}: {
  imageUrl: string;
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-black text-slate-950">{title}</p>
      <div className="relative mt-3 h-52 overflow-hidden rounded-lg bg-white">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="280px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-400">
            <ImagePlus size={34} />
          </div>
        )}
      </div>
      <label className="mt-4 inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-[#5a4ffe]">
        <Upload size={17} />
        Upload Image
        <input type="file" accept="image/*" onChange={onUpload} className="hidden" />
      </label>
    </div>
  );
}

function TextField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5a4ffe] focus:ring-4 focus:ring-[#5a4ffe]/10"
      />
    </label>
  );
}

function TextAreaField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-black uppercase tracking-[0.12em] text-slate-400">
        {label}
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-semibold leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5a4ffe] focus:ring-4 focus:ring-[#5a4ffe]/10"
      />
    </label>
  );
}
