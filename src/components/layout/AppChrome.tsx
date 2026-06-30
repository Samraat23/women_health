"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";
import FirstVisitDoctorModal from "@/components/layout/FirstVisitDoctorModal";
import Navbar from "@/components/layout/Navbar";

type AppChromeProps = {
  children: ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <div>{children}</div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FirstVisitDoctorModal />}
    </>
  );
}
