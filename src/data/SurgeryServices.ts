import type { LucideIcon } from "lucide-react";
import {
  Activity,
  BadgeCheck,
  HeartPulse,
  Hospital,
  Microscope,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";

export type SurgeryBenefit = {
  icon: LucideIcon;
  label: string;
  value: string;
};

export type SurgeryProcedureMeta = {
  detail: string;
  focus: string[];
  href: string;
  icon: LucideIcon;
  tag: string;
};

export const surgeryBenefits: SurgeryBenefit[] = [
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

const defaultProcedureMeta: SurgeryProcedureMeta = {
  detail:
    "Senior specialist review for complex gynecologic surgery decisions.",
  focus: ["Expert evaluation", "Clear procedure plan", "Recovery guidance"],
  href: "/category/laparoscopic-surgery",
  icon: ShieldCheck,
  tag: "Complex care",
};

const surgeryProcedureMeta: SurgeryProcedureMeta[] = [
  {
    detail:
      "Careful excision planning for pelvic pain, endometriosis and fertility goals.",
    focus: ["Pelvic pain", "Chocolate cyst", "Fertility planning"],
    href: "/endometriosis-treatment",
    icon: Activity,
    tag: "Deep disease care",
  },
  {
    detail:
      "Uterus-preserving removal for fibroids, heavy bleeding and pressure symptoms.",
    focus: ["Heavy bleeding", "Pressure symptoms", "Uterus preservation"],
    href: "/fibroid-removal-surgery",
    icon: Sparkles,
    tag: "Uterus preserving",
  },
  {
    detail:
      "Ovary-conscious cyst removal planned to protect healthy ovarian tissue.",
    focus: ["Ovarian cysts", "Pain relief", "Ovary preservation"],
    href: "/ovarian-cyst-surgery",
    icon: HeartPulse,
    tag: "Ovary preserving",
  },
  {
    detail:
      "Minimally invasive hysterectomy planning when uterus removal is clinically needed.",
    focus: ["Hysterectomy", "Large fibroids", "Abnormal bleeding"],
    href: "/uterus-removal-hysterectomy",
    icon: Hospital,
    tag: "Advanced route",
  },
  {
    detail:
      "Corrective procedures designed around conception and reproductive outcomes.",
    focus: ["Adhesions", "Tubal concerns", "Fertility goals"],
    href: "/fertility-enhancing-surgery",
    icon: BadgeCheck,
    tag: "Fertility enhancing",
  },
  {
    detail:
      "Internal uterine diagnosis and treatment without abdominal incisions.",
    focus: ["Polyps", "Uterine septum", "Abnormal bleeding"],
    href: "/hysteroscopy-treatment",
    icon: Microscope,
    tag: "Scar-free access",
  },
  {
    ...defaultProcedureMeta,
    focus: ["Cancer evaluation", "Staging discussion", "Referral planning"],
  },
  {
    detail:
      "Cervical support surgery for selected high-risk pregnancy cases.",
    focus: ["Cervical weakness", "Pregnancy support", "Recurrent loss"],
    href: "/cervical-cerclage",
    icon: HeartPulse,
    tag: "Pregnancy support",
  },
];

export function getSurgeryProcedureMeta(
  name: string,
  index = 0
): SurgeryProcedureMeta {
  const normalized = name.toLowerCase();

  if (normalized.includes("endometriosis")) return surgeryProcedureMeta[0];
  if (normalized.includes("fibroid")) return surgeryProcedureMeta[1];
  if (normalized.includes("ovarian") || normalized.includes("cyst")) {
    return surgeryProcedureMeta[2];
  }
  if (normalized.includes("uterus")) return surgeryProcedureMeta[3];
  if (normalized.includes("fertility")) return surgeryProcedureMeta[4];
  if (normalized.includes("hysteroscopy")) return surgeryProcedureMeta[5];
  if (normalized.includes("cancer")) return surgeryProcedureMeta[6];
  if (normalized.includes("cerclage") || normalized.includes("encerclage")) {
    return surgeryProcedureMeta[7];
  }

  return (
    surgeryProcedureMeta[index % surgeryProcedureMeta.length] ||
    defaultProcedureMeta
  );
}
