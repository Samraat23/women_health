"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Footer from "@/components/layout/Footer";
import FirstVisitDoctorModal from "@/components/layout/FirstVisitDoctorModal";
import Navbar from "@/components/layout/Navbar";
import type { HomePageContent } from "@/types/homeContent";

type AppChromeProps = {
  children: ReactNode;
};

export default function AppChrome({ children }: AppChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const [homeContent, setHomeContent] = useState<HomePageContent | null>(null);

  useEffect(() => {
    if (isAdminRoute) {
      return;
    }

    let isMounted = true;

    fetch("/api/home-content", { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: HomePageContent | null) => {
        if (isMounted && data) {
          setHomeContent(data);
        }
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [isAdminRoute]);

  return (
    <>
      {!isAdminRoute && <Navbar content={homeContent?.navbar} />}
      <div>{children}</div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FirstVisitDoctorModal />}
    </>
  );
}
