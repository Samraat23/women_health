import type { DynamicRouteSchema } from "@/lib/dynamicRouteSchema";

export const homeSiteUrl = "https://www.drkusumlata.in";

export const homeOpenGraphImage = `${homeSiteUrl}/_next/image?url=%2Fimage%2Fdr-kusum-lata-bhardwaj.jpg&w=1080&q=75`;

export const homeSeoTitle =
  "Best Gynecologist in Gurgaon | Dr. Kusum Lata Bhardwaj";

export const homeSeoDescription =
  "Dr. Kusum Lata Bhardwaj, Ex-AIIMS gynecologist and laparoscopic surgeon in Gurgaon, offers expert pregnancy care, infertility treatment, women's health and advanced gynecological surgery.";

const homeWebPageDescription =
  "Dr. Kusum Lata Bhardwaj, Ex-AIIMS gynecologist and laparoscopic surgeon in Gurgaon, provides pregnancy care, infertility treatment, PCOS/PCOD management and advanced gynecological care.";

type FaqEntry = {
  question: string;
  answer: string;
};

// The FAQ entries come from the same data the home page renders, so the
// FAQPage schema always matches the questions a visitor can actually read.
export function getHomePageSchema(faqQuestions: FaqEntry[]): DynamicRouteSchema {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": `${homeSiteUrl}/#clinic`,
        name: "Dr. Kusum Gynecology Centre",
        url: `${homeSiteUrl}/`,
        telephone: "+91 92891 40812",
        medicalSpecialty: "Gynecologic",
        address: {
          "@type": "PostalAddress",
          streetAddress: "287 A1 Block, Sushant Lok - 2, Sector-55",
          addressLocality: "Gurgaon",
          addressRegion: "Haryana",
          postalCode: "122002",
          addressCountry: "IN",
        },
        sameAs: [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U",
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "226",
        },
      },
      {
        "@type": "IndividualPhysician",
        "@id": `${homeSiteUrl}/#physician`,
        name: "Dr. Kusum Lata Bhardwaj",
        url: `${homeSiteUrl}/`,
        description:
          "Dr. Kusum Lata Bhardwaj is a gynecologist, obstetrician and laparoscopic surgeon providing comprehensive women's healthcare in Gurgaon.",
        medicalSpecialty: "Gynecologic",
        practicesAt: {
          "@id": `${homeSiteUrl}/#clinic`,
        },
        sameAs: [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U",
        ],
      },
      {
        "@type": "MedicalWebPage",
        "@id": `${homeSiteUrl}/#webpage`,
        url: `${homeSiteUrl}/`,
        name: homeSeoTitle,
        description: homeWebPageDescription,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${homeSiteUrl}/#website`,
          url: `${homeSiteUrl}/`,
          name: "Dr. Kusum Lata Bhardwaj",
        },
        author: {
          "@id": `${homeSiteUrl}/#physician`,
        },
        reviewedBy: {
          "@id": `${homeSiteUrl}/#physician`,
        },
        mainEntity: {
          "@id": `${homeSiteUrl}/#physician`,
        },
        breadcrumb: {
          "@id": `${homeSiteUrl}/#breadcrumb`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${homeSiteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${homeSiteUrl}/`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${homeSiteUrl}/#faq`,
        mainEntity: faqQuestions.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
