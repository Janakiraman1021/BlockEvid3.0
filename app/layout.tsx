import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Web3Provider } from "@/components/web3-provider"
import { CursorProvider } from "@/components/cursor-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BlockEvid 3.0 - Web3 Evidence Vault",
  description: "Decentralized evidence management platform with blockchain verification",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3Provider>
          <CursorProvider>{children}</CursorProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
