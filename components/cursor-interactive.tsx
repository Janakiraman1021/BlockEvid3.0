"use client"

import type { ReactNode } from "react"

interface CursorInteractiveProps {
  children: ReactNode
  className?: string
  dataBlockchain?: string
}

export function CursorInteractive({ children, className = "", dataBlockchain }: CursorInteractiveProps) {
  return (
    <div className={`cursor-interactive ${className}`} data-blockchain={dataBlockchain}>
      {children}
    </div>
  )
}
