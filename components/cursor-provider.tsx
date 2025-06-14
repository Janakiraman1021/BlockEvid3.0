import type React from "react"
// Update the import statement to use named import
import { CustomCursor } from "./custom-cursor"

export function CursorProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CustomCursor />
      {children}
    </>
  )
}
