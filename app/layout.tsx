import type { Metadata } from "next";
import {  Inter, Nokora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MainProvider from "@/components/providers/MainProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight:["400","600","800"]
});

const nokora = Nokora({
  variable: "--font-nokora",
  subsets: ["latin"],
  weight: ["400","700"]
});

export const metadata: Metadata = {
  title: "Syntax Error",
  icons :{
    icon : "/favicon.svg"
  },
  description: "Coded and designed by Travis Ang",
  keywords : ["NextJs" , "TypeScript","JavaScript"], 
  metadataBase : new URL("https://my-cook-pal.vercel.app"), 
  twitter : { 
    card: "summary_large_image", 
    site : "https://my-cook-pal.vercel.app", 
    creator : "@TravisAng", 
    title : "My Cook Pal - Recipe App", 
    description : "Find a recipe that suits ur taste buds", 
    images: ["feature.png"]
  }, 
  openGraph : { 
    title : "My Cook Pal - Recipe App", 
    description : "Find a recipe that suits ur taste buds", 
    url : "https://my-cook-pal.vercel.app",
    siteName :"My Cook Pal",
    images: ["feature.png"], 

  }
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal : React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body
        className={`${nokora.variable} ${inter.variable} antialiased font-inter`}
      >
        <MainProvider>
          <Toaster />
          <Navbar />
          {modal}
          {children}
          
        </MainProvider>
        
      </body>
    </html>
  );
}
