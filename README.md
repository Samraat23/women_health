This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


| Element           | Color                      |
| ----------------- | -------------------------- |
| Page Background   | `bg-rose-50`               |
| Alternate Section | `bg-indigo-50`             |
| Main Heading      | `text-indigo-600`          |
| Subheading        | `text-rose-500`            |
| Paragraph         | `text-gray-700`            |
| CTA Button        | `bg-indigo-500 text-white` |
| Hover CTA         | `hover:bg-rose-400`        |

<section className="bg-rose-50 py-16">
  <div className="max-w-6xl mx-auto text-center">
    <h1 className="text-4xl font-bold text-indigo-600">
      Advanced Laparoscopic Surgery
    </h1>

    <p className="text-rose-500 text-lg mt-3">
      Compassionate Women’s Healthcare
    </p>

    <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
      Providing safe, modern, and minimally invasive surgical solutions
      for women’s health.
    </p>
  </div>
</section>





   <!-- <div style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 80" style={{ display: "block", fill: "#f7f4ee" }}>
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          </svg>
        </div> -->



        initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className=" relative  max-w-7xl  z-50  mx-auto mt-4 bg-(--foreground) backdrop-blur-3xl  border border-(--border)/15 rounded-xl shadow-lg p-4"
      onMouseLeave={() => setActiveMenu(null)}


      border-[#ddd9ff]