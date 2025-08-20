import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { CursorEffects } from "@/components/cursor-effects"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
})

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Portfolio Builder - Create Your Professional Portfolio",
  description:
    "Build stunning portfolios with our modern, easy-to-use portfolio builder. Perfect for students, developers, and designers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${workSans.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <CursorEffects />
      </body>
    </html>
  )
}
