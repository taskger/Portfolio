import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins  } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Chayanon Poolwas Portfolio | Full-Stack Developer",
  description: "Explore the portfolio of Chayanon Poolwas, a passionate Full-Stack Developer with expertise in modern web development and creative design.",
};

export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
<>
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
    >  
      {children}
    </body>
  </html>
</>
  );
}
