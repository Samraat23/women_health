"use client";

import ServiceCard from "@/components/shared/ServiceCard";
import { getSurgeryProcedureMeta } from "@/data/SurgeryServices";

export type SurgeryCardItem = {
  id?: number;
  key?: string;
  name: string;
  img: string;
  description: string;
};

// Resolved on the client so the Lucide icon never crosses the server boundary.
function SurgeryServiceCard({
  service,
  index,
}: {
  service: SurgeryCardItem;
  index: number;
}) {
  const meta = getSurgeryProcedureMeta(service.name, index);
  const isEndometriosis = service.name.toLowerCase().includes("endometriosis");

  return (
    <ServiceCard
      href={meta.href}
      index={index}
      item={{
        title: service.name,
        description: service.description,
        image: service.img,
        icon: meta.icon,
      }}
      badges={
        isEndometriosis ? [meta.tag, "Opens Endometriosis guide"] : [meta.tag]
      }
      chips={meta.focus}
      footerLabel="Read full guide"
      imageSizes="(min-width: 1280px) 360px, (min-width: 768px) 45vw, 92vw"
    />
  );
}

export default SurgeryServiceCard;
