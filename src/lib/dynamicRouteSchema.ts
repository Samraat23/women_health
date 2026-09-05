type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type DynamicRouteSchema = {
  "@context": "https://schema.org";
  "@graph": JsonValue[];
};

const dynamicRouteSchemaBySlug: Partial<Record<string, DynamicRouteSchema>> = {
  "endometriosis-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and laparoscopic surgeon with expertise in women's health and endometriosis care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon",
        "name": "Best Endometriosis Specialist Doctor in Gurgaon | Symptoms & Treatment",
        "description": "Meet Dr. Kusum Lata Bhardwaj, an endometriosis specialist in Gurgaon with 17+ years of experience. Get guidance on symptoms, diagnosis and treatment options.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#condition",
        "name": "Endometriosis",
        "description": "Endometriosis is a condition in which tissue similar to the lining of the uterus grows outside the uterus. It may cause painful periods, pelvic pain, heavy menstrual bleeding, pain during intercourse and difficulty becoming pregnant."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Endometriosis Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/endometriosis-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is endometriosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Endometriosis happens when tissue similar to the uterus lining grows outside the uterus. It can cause pain, heavy periods and fertility problems."
            }
          },
          {
            "@type": "Question",
            "name": "What are the common symptoms of endometriosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common symptoms include severe period pain, pelvic pain, lower abdominal or back pain, heavy menstrual bleeding, pain during intercourse, pain while passing stool or urine, bloating, fatigue and difficulty becoming pregnant."
            }
          },
          {
            "@type": "Question",
            "name": "What causes endometriosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The exact cause of endometriosis is not fully known. Possible factors include hormonal factors, family history and backward menstrual flow."
            }
          },
          {
            "@type": "Question",
            "name": "How is endometriosis diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diagnosis may involve a medical history, pelvic examination, ultrasound and other tests. In some cases, laparoscopy may be recommended to assess and treat endometriosis."
            }
          },
          {
            "@type": "Question",
            "name": "What are the stages of endometriosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Endometriosis can range from minimal to extensive disease. The extent may involve increasing pain, ovarian cysts, fertility concerns and adhesions affecting pelvic organs."
            }
          },
          {
            "@type": "Question",
            "name": "Can endometriosis be treated without surgery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Depending on the symptoms and individual condition, treatment may include pain relief medicines, hormonal therapy, regular follow-up and fertility support."
            }
          },
          {
            "@type": "Question",
            "name": "When is surgery needed for endometriosis?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Laparoscopic surgery may be considered when symptoms are severe, medicines do not provide enough relief, or endometriosis is affecting fertility."
            }
          },
          {
            "@type": "Question",
            "name": "Can endometriosis affect fertility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Endometriosis may affect fertility in some women. Treatment can be planned according to the extent of the condition and individual fertility goals."
            }
          },
          {
            "@type": "Question",
            "name": "Can endometriosis come back after treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Endometriosis symptoms can return after treatment in some cases. Regular follow-up can help monitor symptoms and guide further treatment when required."
            }
          },
          {
            "@type": "Question",
            "name": "When should I see an Endometriosis Doctor in Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider seeing an endometriosis specialist if you have severe period pain, persistent pelvic pain, heavy or irregular periods, pain during intercourse, pain while passing urine or stool, difficulty getting pregnant, or symptoms that are not improving with medicines."
            }
          }
        ]
      }
    ]
  },
  "uterine-bleeding-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health and abnormal uterine bleeding care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon",
        "name": "Best Uterine Bleeding Doctor in Gurgaon | Dr. Kusum Lata",
        "description": "Meet Dr. Kusum Lata Bhardwaj, a uterine bleeding specialist in Gurgaon with 17+ years of experience. Get guidance for heavy periods, irregular bleeding and treatment options.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#condition",
        "name": "Abnormal Uterine Bleeding",
        "description": "Abnormal uterine bleeding refers to bleeding that is unusual in its amount, timing, regularity or duration. It may include very heavy periods, bleeding between periods or periods that last longer than usual."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Uterine Bleeding Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/uterine-bleeding-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is abnormal uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Abnormal uterine bleeding means bleeding that is heavier, longer, more frequent, or occurs at an unusual time compared with your normal menstrual pattern."
            }
          },
          {
            "@type": "Question",
            "name": "How to stop abnormal uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Treatment for abnormal uterine bleeding depends on the cause, amount of bleeding, age, overall health and future fertility plans. Treatment may include medicines, hormonal options, iron support, treatment for fibroids or polyps, or procedures when needed."
            }
          },
          {
            "@type": "Question",
            "name": "Is heavy bleeding a sign of uterine cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Heavy bleeding can have many causes, including hormonal changes, fibroids, polyps, thyroid problems, PCOS and bleeding disorders. A doctor may recommend an evaluation to identify the cause and determine whether further testing is needed."
            }
          },
          {
            "@type": "Question",
            "name": "Can stress cause abnormal uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Changes in your menstrual pattern can have different causes. If bleeding becomes unusually heavy, lasts longer than usual, happens between periods or keeps recurring, it is important to consult a doctor for proper evaluation."
            }
          },
          {
            "@type": "Question",
            "name": "Can uterine fibroids cause bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Uterine fibroids are usually non-cancerous growths in the uterus and can cause heavy or prolonged menstrual bleeding."
            }
          },
          {
            "@type": "Question",
            "name": "How to stop bleeding from uterine fibroids?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Treatment depends on the severity of bleeding and the individual condition. Options may include medicines, hormonal treatment, treatment of the fibroids or procedures when required."
            }
          },
          {
            "@type": "Question",
            "name": "What can cause abnormal uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Possible causes include hormonal changes, uterine fibroids, uterine polyps, thyroid problems, PCOS and bleeding disorders."
            }
          },
          {
            "@type": "Question",
            "name": "What causes dysfunctional uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Abnormal or dysfunctional uterine bleeding can occur due to hormonal changes that affect ovulation and the menstrual cycle. Other possible causes include fibroids, polyps, thyroid problems, PCOS and bleeding disorders."
            }
          },
          {
            "@type": "Question",
            "name": "When should I see a doctor for abnormal uterine bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider seeing a doctor if you have very heavy periods, periods lasting more than 7 days, bleeding between periods, bleeding after sex, frequent or irregular periods, large blood clots, dizziness, weakness or ongoing changes in your menstrual pattern."
            }
          },
          {
            "@type": "Question",
            "name": "Can abnormal uterine bleeding affect fertility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The effect on fertility depends on the underlying cause of the abnormal bleeding. Conditions such as fibroids, hormonal problems or other uterine conditions may affect reproductive health, so proper evaluation can help identify the cause and suitable treatment."
            }
          }
        ]
      }
    ]
  },
  "vaginal-infection-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health and vaginal infection care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon",
        "name": "Best Vaginal Infection Doctor in Gurgaon | Dr. Kusum Lata",
        "description": "Meet Dr. Kusum Lata Bhardwaj, a vaginal infection specialist in Gurgaon with 17+ years of experience. Get help for itching, unusual discharge, burning and repeated infections.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#condition",
        "name": "Vaginal Infection",
        "description": "Vaginal infections occur when an infection or imbalance affects the vagina. Common causes include bacterial vaginosis, yeast infections and some sexually transmitted infections. Symptoms may include unusual discharge, itching, irritation, burning, unpleasant smell and discomfort while urinating."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Vaginal Infection Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/vaginal-infection-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a vaginal infection?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A vaginal infection occurs when an infection or imbalance affects the vagina. It can cause discharge, itching, unusual smell, burning, irritation or discomfort."
            }
          },
          {
            "@type": "Question",
            "name": "What are the common symptoms of vaginal infection?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common symptoms include unusual vaginal discharge, change in discharge colour, strong vaginal smell, itching, irritation, burning, redness, soreness, pain while urinating, pain during intercourse, vaginal dryness, pelvic discomfort, swelling, spotting or repeated infections."
            }
          },
          {
            "@type": "Question",
            "name": "What causes vaginal infections?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Vaginal infections may be caused by bacterial imbalance, yeast overgrowth or sexually transmitted infections. Hormonal changes, scented products and douching can also affect the vaginal area and cause irritation or imbalance."
            }
          },
          {
            "@type": "Question",
            "name": "How are vaginal infections diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diagnosis may include a medical history, vaginal examination, vaginal swab, vaginal pH testing and laboratory testing when required. The tests help identify the cause so that suitable treatment can be recommended."
            }
          },
          {
            "@type": "Question",
            "name": "Can vaginal infections be treated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Treatment depends on the type and cause of the infection. It may include antifungal treatment for yeast infections, antibiotics for certain bacterial infections, specific treatment for sexually transmitted infections and treatment to relieve symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "Can a vaginal infection go away on its own?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some vaginal symptoms may improve, but persistent or recurring symptoms should not be ignored. Proper evaluation can help identify the actual cause and prevent treatment of the wrong infection."
            }
          },
          {
            "@type": "Question",
            "name": "Can vaginal infections come back?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Vaginal infections can recur in some women. Repeated infections may require further evaluation to identify the underlying cause and create an appropriate treatment and follow-up plan."
            }
          },
          {
            "@type": "Question",
            "name": "Can vaginal infections affect pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Certain vaginal or sexually transmitted infections can require special attention during pregnancy. If you notice unusual discharge, itching, burning, pain or other symptoms during pregnancy, discuss them with your doctor."
            }
          },
          {
            "@type": "Question",
            "name": "When should I see a vaginal infection specialist?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider seeing a specialist if you have persistent vaginal itching, unusual discharge, strong vaginal smell, burning, pain while urinating, pain during sex, pelvic discomfort, repeated infections or symptoms that are not improving with treatment."
            }
          },
          {
            "@type": "Question",
            "name": "Where can I get Vaginal Infections Treatment In Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr. Kusum Lata Bhardwaj provides gynecology and women's health consultation in Gurgaon. She can evaluate vaginal infection symptoms, identify the possible cause and recommend appropriate testing and treatment when required."
            }
          }
        ]
      }
    ]
  },
  "uterine-fibroids-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health and uterine fibroid care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon",
        "name": "Best Uterine Fibroids Doctor in Gurgaon | Dr. Kusum Lata",
        "description": "Having heavy periods, pelvic pain or pressure? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for fibroid diagnosis and suitable treatment options.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#condition",
        "name": "Uterine Fibroids",
        "description": "Uterine fibroids are non-cancerous growths that develop in or around the uterus. They can cause heavy menstrual bleeding, painful periods, pelvic pain, pelvic pressure, frequent urination, constipation and sometimes difficulty getting pregnant."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Uterine Fibroids Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/uterine-fibroids-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What Causes Uterine Fibroids?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The exact cause is not fully known. Hormonal changes, genetics, and family history may play a role in the development of fibroids."
            }
          },
          {
            "@type": "Question",
            "name": "How to Treat Uterine Fibroids?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Treatment depends on the symptoms, size and location of the fibroids, age, overall health and pregnancy plans. Options may include monitoring, medicines, hormonal treatment, minimally invasive procedures or surgery such as myomectomy when appropriate."
            }
          },
          {
            "@type": "Question",
            "name": "What Is an Intramural Uterine Fibroid?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An intramural fibroid grows within the muscular wall of the uterus. It may cause heavy menstrual bleeding, pelvic pressure or other symptoms depending on its size and location."
            }
          },
          {
            "@type": "Question",
            "name": "Can Uterine Fibroids Cause Back Pain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Larger fibroids or fibroids in certain locations can create pressure in the pelvis and may cause lower back pain or discomfort."
            }
          },
          {
            "@type": "Question",
            "name": "Can Uterine Fibroids Go Away on Their Own?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fibroids do not usually disappear completely on their own. Some may become smaller over time, particularly when hormone levels change, but monitoring may be recommended depending on symptoms and individual circumstances."
            }
          },
          {
            "@type": "Question",
            "name": "Can Uterine Fibroids Shrink on Their Own?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some fibroids can shrink naturally, especially when hormone levels decrease. However, the size and symptoms should be monitored by a doctor when fibroids are causing problems."
            }
          },
          {
            "@type": "Question",
            "name": "Can Uterine Fibroids Cause Irregular Periods?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Depending on their size and location, uterine fibroids can cause heavy periods, longer periods, bleeding between periods or changes in the normal menstrual pattern."
            }
          },
          {
            "@type": "Question",
            "name": "How to Know If You Have Uterine Fibroids?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common symptoms include heavy or long periods, pelvic pain or pressure, frequent urination, constipation, lower back pain and difficulty getting pregnant. A pelvic examination and imaging such as ultrasound can help identify fibroids."
            }
          },
          {
            "@type": "Question",
            "name": "How Are Uterine Fibroids Formed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Fibroids develop from muscle tissue of the uterus. The exact reason they form is not fully understood, but hormones such as estrogen and progesterone, family history and genetic factors may contribute."
            }
          },
          {
            "@type": "Question",
            "name": "Can I Get Pregnant If I Have Uterine Fibroids?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, many women with fibroids can become pregnant. However, certain fibroids, depending on their size and location, may affect fertility or pregnancy and may require evaluation and treatment."
            }
          }
        ]
      }
    ]
  },
  "ovarian-cyst-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health and ovarian cyst care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon",
        "name": "Best Ovarian Cyst Doctor in Gurgaon | Dr. Kusum Lata",
        "description": "Meet Dr. Kusum Lata Bhardwaj, an ovarian cyst specialist in Gurgaon with 17+ years of experience. Get help for pelvic pain, ovarian cysts and suitable treatment options.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#condition",
        "name": "Ovarian Cyst",
        "description": "An ovarian cyst is a fluid-filled sac that develops on or inside an ovary. Many ovarian cysts are harmless and may go away on their own, while larger, persistent or painful cysts may need monitoring or treatment."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Ovarian Cyst Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/ovarian-cyst-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What Is an Ovarian Cyst?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An ovarian cyst is a fluid-filled sac that develops on or inside an ovary. Many ovarian cysts are harmless and may go away on their own."
            }
          },
          {
            "@type": "Question",
            "name": "What Size of Ovarian Cyst Is Dangerous?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The size alone does not determine whether an ovarian cyst is dangerous. The cyst's appearance, type, growth, symptoms and other findings are also important. Large, persistent or concerning cysts may need further evaluation."
            }
          },
          {
            "@type": "Question",
            "name": "What Causes Ovarian Cysts in Young Females?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In young women, many ovarian cysts are related to the normal menstrual cycle. Other causes can include hormonal changes, endometriosis and abnormal cell growth."
            }
          },
          {
            "@type": "Question",
            "name": "Why Do Ovarian Cysts Occur?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ovarian cysts can develop for different reasons. Some form when a follicle does not release an egg or does not shrink normally. Hormonal changes and conditions such as endometriosis can also contribute to certain types of cysts."
            }
          },
          {
            "@type": "Question",
            "name": "Can I Get Pregnant With an Ovarian Cyst?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, many women with ovarian cysts can become pregnant. The effect on fertility depends on the type of cyst and any underlying condition."
            }
          },
          {
            "@type": "Question",
            "name": "Can an Ovarian Cyst Affect Pregnancy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some ovarian cysts may be found during pregnancy and many do not cause problems. The type, size and appearance of the cyst determine whether monitoring or further evaluation is needed."
            }
          },
          {
            "@type": "Question",
            "name": "Can Ovarian Cysts Cause Cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most ovarian cysts are benign. However, some cysts may have features that require further evaluation. Your doctor may recommend imaging, blood tests or follow-up depending on the cyst's appearance and individual circumstances."
            }
          },
          {
            "@type": "Question",
            "name": "How Are Ovarian Cysts Diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diagnosis usually starts with your symptoms and medical history. A pelvic examination, ultrasound, blood tests and follow-up scans may be recommended depending on the cyst and your symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "Do All Ovarian Cysts Need Surgery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Many ovarian cysts disappear naturally and only require monitoring. Surgery may be considered when a cyst is large, persistent, painful or has concerning features."
            }
          },
          {
            "@type": "Question",
            "name": "Who is the Best Doctor for Ovarian Cyst Treatment In Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician in Gurgaon with 17+ years of experience. She provides evaluation and treatment planning for ovarian cysts, including laparoscopic surgery when appropriate."
            }
          }
        ]
      }
    ]
  },
  "puberty-disorder-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health, puberty disorders, growth and hormonal concerns.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon",
        "name": "Best Puberty Disorder Doctor in Gurgaon | Dr. Kusum Lata",
        "description": "Concerned about early or delayed puberty? Meet Dr. Kusum Lata Bhardwaj in Gurgaon with 17+ years of experience for growth, development and hormone-related concerns.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#condition",
        "name": "Puberty Disorders",
        "description": "Puberty disorders occur when puberty starts too early, happens later than expected, or does not progress normally. They may affect growth, hormone levels and normal physical development."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Puberty Disorder Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/puberty-disorder-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a puberty disorder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A puberty disorder occurs when puberty starts too early, happens later than expected, or does not progress normally."
            }
          },
          {
            "@type": "Question",
            "name": "What is early puberty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early or precocious puberty means puberty-related physical changes begin earlier than expected. Signs may include breast development, pubic hair, rapid growth, acne, body odour or other changes associated with puberty."
            }
          },
          {
            "@type": "Question",
            "name": "What is delayed puberty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Delayed puberty means that expected signs of puberty have not started by the usual age. It may sometimes run in families, but medical conditions, nutritional problems, hormone issues or other factors can also be involved."
            }
          },
          {
            "@type": "Question",
            "name": "What are the signs of early puberty?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Signs of early puberty may include early breast development, early periods, pubic or underarm hair, rapid growth, acne, strong body odour, facial hair or other physical changes appearing earlier than expected."
            }
          },
          {
            "@type": "Question",
            "name": "How are puberty disorders diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evaluation may include reviewing the child's growth pattern and physical development, assessing hormone levels and checking for possible underlying medical or hormonal conditions."
            }
          },
          {
            "@type": "Question",
            "name": "Can puberty disorders be treated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Treatment depends on the cause and the child's development. Some children only need regular monitoring, while others may require medicines or treatment for an underlying medical or hormonal condition."
            }
          },
          {
            "@type": "Question",
            "name": "Can early puberty affect height?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Early puberty can cause rapid growth initially, but bones may mature earlier than expected, which can affect final adult height in some children."
            }
          },
          {
            "@type": "Question",
            "name": "Can delayed puberty be treated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Treatment depends on the reason puberty is delayed. Some children may only need monitoring, while others may need treatment for an underlying hormonal or medical condition."
            }
          },
          {
            "@type": "Question",
            "name": "What does Puberty Disorder Treatment In Gurgaon include?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Puberty disorder treatment may include hormone assessment, growth monitoring, treatment for early or delayed puberty, treatment of an underlying condition and regular follow-up to monitor development and treatment response."
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose the Best Doctor for Puberty Disorder Treatment in Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When choosing a doctor, consider experience in women's health, understanding of growth and hormonal concerns, appropriate evaluation, clear communication and regular follow-up. Dr. Kusum Lata Bhardwaj has 17+ years of experience and provides consultation for puberty and related health concerns."
            }
          }
        ]
      }
    ]
  },
  "pcos-pcod-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health, PCOS and PCOD care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon",
        "name": "Best Gynecologist for PCOS/PCOD Treatment in Gurgaon",
        "description": "Get personalised PCOS/PCOD treatment in Gurgaon from Dr. Kusum Lata Bhardwaj, with 17+ years of experience. Get expert guidance for hormonal, period and fertility concerns.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#condition",
        "name": "Polycystic Ovary Syndrome (PCOS)",
        "description": "PCOS is a common hormonal condition that can affect periods, ovulation, skin, hair growth, weight and fertility. Symptoms may include irregular periods, acne, excess facial hair, hair thinning, weight changes and difficulty getting pregnant."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "PCOS/PCOD Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/pcos-pcod-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PCOD and PCOS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PCOS stands for Polycystic Ovary Syndrome. PCOD is a commonly used term for Polycystic Ovarian Disease. A doctor can assess your symptoms and provide the correct diagnosis."
            }
          },
          {
            "@type": "Question",
            "name": "Is PCOS and PCOD the same?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PCOS and PCOD are commonly used terms for hormonal and ovarian problems, but they are not always used in exactly the same way. A proper medical evaluation can help identify the condition and its underlying causes."
            }
          },
          {
            "@type": "Question",
            "name": "What are the common symptoms of PCOS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common symptoms include irregular or missed periods, heavy or prolonged periods, acne, excess facial or body hair, hair thinning, unexplained weight changes, irregular ovulation and difficulty getting pregnant."
            }
          },
          {
            "@type": "Question",
            "name": "How is PCOS diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PCOS diagnosis is based on symptoms, medical history, physical examination and appropriate tests. Blood tests may check hormone levels and other health markers, while ultrasound may be used to assess the ovaries and uterus when appropriate."
            }
          },
          {
            "@type": "Question",
            "name": "Can PCOS be treated without surgery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. PCOS is often managed without surgery. Treatment may include lifestyle changes, healthy eating, physical activity, medicines for hormonal or menstrual symptoms, and fertility treatment when required."
            }
          },
          {
            "@type": "Question",
            "name": "Can PCOS affect fertility?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. PCOS can affect ovulation and may make it more difficult for some women to become pregnant. Many women with PCOS can become pregnant with appropriate medical care and fertility support."
            }
          },
          {
            "@type": "Question",
            "name": "Can PCOS be completely cured?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PCOS is generally managed rather than permanently cured. Symptoms and associated health risks can often be controlled through lifestyle changes, medical treatment and regular monitoring."
            }
          },
          {
            "@type": "Question",
            "name": "Does PCOS always cause weight gain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Not every woman with PCOS experiences weight gain. PCOS can affect women differently, and some women may have normal body weight while still having hormonal or reproductive symptoms."
            }
          },
          {
            "@type": "Question",
            "name": "Can PCOS cause irregular periods?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Irregular, delayed or missed periods are common symptoms of PCOS and can occur because of irregular ovulation."
            }
          },
          {
            "@type": "Question",
            "name": "When should I see a PCOS doctor in Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider seeing a PCOS specialist if you have repeated irregular or missed periods, persistent acne, excess facial hair, hair thinning, unexplained weight changes, repeated ovulation problems or difficulty getting pregnant."
            }
          }
        ]
      }
    ]
  },
  "breast-cancer-doctor-in-gurgaon": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalClinic",
        "@id": "https://www.drkusumlata.in/#clinic",
        "name": "Dr. Kusum Gynecology Centre",
        "url": "https://www.drkusumlata.in/",
        "telephone": "+91 92891 40812",
        "medicalSpecialty": "Gynecologic",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "287 A1 Block, Sushant Lok - 2, Sector-55",
          "addressLocality": "Gurgaon",
          "addressRegion": "Haryana",
          "postalCode": "122002",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "226"
        }
      },
      {
        "@type": "IndividualPhysician",
        "@id": "https://www.drkusumlata.in/#physician",
        "name": "Dr. Kusum Lata Bhardwaj",
        "url": "https://www.drkusumlata.in/",
        "description": "Dr. Kusum Lata Bhardwaj is a gynecologist and obstetrician with 17+ years of experience in women's health and breast health care.",
        "medicalSpecialty": "Gynecologic",
        "practicesAt": {
          "@id": "https://www.drkusumlata.in/#clinic"
        },
        "sameAs": [
          "https://www.instagram.com/drkusumendometriosissurgeon/",
          "https://www.youtube.com/watch?v=WHjNV8dEh5U"
        ]
      },
      {
        "@type": "MedicalWebPage",
        "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#webpage",
        "url": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon",
        "name": "Best Breast Cancer Specialist Doctor in Gurgaon",
        "description": "Consult Dr. Kusum Lata Bhardwaj, Breast Cancer Specialist Doctor in Gurgaon, for breast lump evaluation, cancer diagnosis, personalised treatment and surgical care.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.drkusumlata.in/#website",
          "url": "https://www.drkusumlata.in/",
          "name": "Dr. Kusum Lata Bhardwaj"
        },
        "author": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "reviewedBy": {
          "@id": "https://www.drkusumlata.in/#physician"
        },
        "about": {
          "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#condition"
        },
        "mainEntity": {
          "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#condition"
        },
        "breadcrumb": {
          "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#breadcrumb"
        }
      },
      {
        "@type": "MedicalCondition",
        "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#condition",
        "name": "Breast Cancer",
        "description": "Breast cancer occurs when abnormal cells in breast tissue grow and multiply in an uncontrolled way. It can cause a new breast lump, changes in breast size or shape, nipple changes, unusual discharge, skin changes or swelling. Early evaluation can help with timely diagnosis and treatment."
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.drkusumlata.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Breast Cancer Doctor In Gurgaon",
            "item": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.drkusumlata.in/breast-cancer-doctor-in-gurgaon#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is breast cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Breast cancer happens when abnormal cells in the breast grow uncontrollably. It can start in the milk ducts or lobules."
            }
          },
          {
            "@type": "Question",
            "name": "What are the common signs of breast cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common signs may include a new breast lump, change in breast size or shape, breast swelling, skin changes, nipple turning inward, unusual nipple discharge, changes in nipple appearance, an underarm lump or persistent breast or nipple discomfort."
            }
          },
          {
            "@type": "Question",
            "name": "Does every breast lump mean cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Many breast lumps and changes are not cancer. However, a new or unusual breast lump should be evaluated by a doctor to identify the cause."
            }
          },
          {
            "@type": "Question",
            "name": "How is breast cancer diagnosed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Diagnosis may include a medical history, breast examination, mammogram, breast ultrasound, breast MRI in selected situations and biopsy when an abnormal area needs to be checked for cancer cells."
            }
          },
          {
            "@type": "Question",
            "name": "What are the stages of breast cancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Breast cancer is generally staged from Stage 0 to Stage IV. Staging considers factors such as tumour size, nearby lymph node involvement, whether the cancer has spread, tumour characteristics and other medical findings."
            }
          },
          {
            "@type": "Question",
            "name": "Can breast cancer be treated?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Breast cancer treatment depends on the type and stage of cancer, tumour characteristics and overall health. Treatment may include surgery, radiation therapy, chemotherapy, hormone therapy, targeted therapy, immunotherapy or a combination of these approaches."
            }
          },
          {
            "@type": "Question",
            "name": "When is breast cancer surgery needed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Surgery is an important part of treatment for many people with breast cancer. Depending on the tumour and individual condition, surgery may involve removing the tumour while preserving the breast or removing the whole breast. Nearby lymph nodes may also be checked."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between lumpectomy and mastectomy?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A lumpectomy removes the tumour while keeping most of the breast. A mastectomy removes the breast and may be recommended in certain cases depending on the cancer and individual treatment plan."
            }
          },
          {
            "@type": "Question",
            "name": "Can breast cancer come back after treatment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Breast cancer can sometimes return after treatment. The risk depends on factors such as the type and stage of cancer and its treatment. Regular follow-up helps monitor health after treatment."
            }
          },
          {
            "@type": "Question",
            "name": "When should I see a Breast Cancer Specialist In Gurgaon?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You should consider seeing a specialist if you notice a new breast lump, unusual nipple discharge, nipple retraction, breast skin changes, persistent breast swelling, a change in breast shape, an underarm lump or any unexplained breast changes."
            }
          }
        ]
      }
    ]
  }
};

export function getDynamicRouteSchema(slug: string) {
  return dynamicRouteSchemaBySlug[slug];
}

export function stringifyJsonLd(schema: DynamicRouteSchema) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}
