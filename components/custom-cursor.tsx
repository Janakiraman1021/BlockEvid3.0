"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
  isTyping: boolean
  hoverType: "default" | "button" | "link" | "input"
}

export function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    isTyping: false,
    hoverType: "default",
  })

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([])
  const particleId = useRef(0)
  const trailPositions = useRef<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX
      const newY = e.clientY

      setCursorState((prev) => ({ ...prev, x: newX, y: newY }))

      // Add to trail
      trailPositions.current.unshift({ x: newX, y: newY })
      if (trailPositions.current.length > 12) {
        trailPositions.current.pop()
      }

      // Create particles on movement
      if (Math.random() > 0.8) {
        const newParticle = {
          id: particleId.current++,
          x: newX + (Math.random() - 0.5) * 30,
          y: newY + (Math.random() - 0.5) * 30,
          opacity: 1,
        }
        setParticles((prev) => [...prev.slice(-15), newParticle])
      }
    }

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }))
      // Create explosion particles
      const clickParticles = Array.from({ length: 8 }, (_, i) => ({
        id: particleId.current++,
        x: cursorState.x + Math.cos((i * Math.PI) / 4) * 20,
        y: cursorState.y + Math.sin((i * Math.PI) / 4) * 20,
        opacity: 1,
      }))
      setParticles((prev) => [...prev, ...clickParticles])
    }

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }))
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      let hoverType: CursorState["hoverType"] = "default"

      if (target.tagName === "BUTTON" || target.closest("button")) {
        hoverType = "button"
      } else if (target.tagName === "A" || target.closest("a")) {
        hoverType = "link"
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        hoverType = "input"
      }

      setCursorState((prev) => ({
        ...prev,
        isHovering: hoverType !== "default",
        hoverType,
      }))
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setCursorState((prev) => ({
          ...prev,
          isHovering: false,
          hoverType: "default",
        }))
      }
    }

    const handleKeyDown = () => {
      setCursorState((prev) => ({ ...prev, isTyping: true }))
    }

    const handleKeyUp = () => {
      setCursorState((prev) => ({ ...prev, isTyping: false }))
    }

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [cursorState.x, cursorState.y])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            opacity: particle.opacity - 0.04,
            y: particle.y - 2,
            x: particle.x + (Math.random() - 0.5) * 2,
          }))
          .filter((particle) => particle.opacity > 0),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const getCursorScale = () => {
    if (cursorState.isClicking) return 0.7
    if (cursorState.hoverType === "button") return 1.8
    if (cursorState.hoverType === "link") return 1.5
    if (cursorState.hoverType === "input") return 1.3
    return 1
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Cursor - Unique Hexagon Design */}
      <motion.div
        className="absolute"
        animate={{
          x: cursorState.x - 12,
          y: cursorState.y - 12,
          scale: getCursorScale(),
          rotate: cursorState.isClicking ? 45 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 350,
          damping: 25,
          mass: 0.5,
        }}
      >
        {/* Hexagon Shape */}
        <div className="relative w-6 h-6">
          {/* Main hexagon */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 shadow-lg"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            }}
          />

          {/* Inner diamond */}
          <motion.div
            className="absolute inset-1 bg-gradient-to-br from-cyan-400 to-blue-500"
            style={{
              clipPath: "polygon(50% 20%, 80% 50%, 50% 80%, 20% 50%)",
            }}
            animate={{
              rotate: cursorState.isHovering ? 180 : 0,
            }}
            transition={{
              duration: 0.3,
            }}
          />

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Orbital rings */}
        <motion.div
          className="absolute -inset-3 border border-orange-400/40 rounded-full"
          animate={{
            rotate: 360,
            scale: cursorState.isHovering ? 1.2 : 1,
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          }}
        >
          {/* Orbital dots */}
          <div className="absolute top-0 left-1/2 w-1 h-1 bg-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 translate-y-1/2" />
        </motion.div>

        <motion.div
          className="absolute -inset-5 border border-cyan-400/30 rounded-full"
          animate={{
            rotate: -360,
            scale: cursorState.isHovering ? 1.3 : 1,
          }}
          transition={{
            rotate: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
            scale: {
              type: "spring",
              stiffness: 200,
              damping: 15,
            },
          }}
        >
          <div className="absolute left-0 top-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute right-0 top-1/2 w-1 h-1 bg-orange-400 rounded-full transform translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </motion.div>

      {/* Cursor Trail - Geometric shapes */}
      {trailPositions.current.map((pos, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            x: pos.x - 4,
            y: pos.y - 4,
          }}
          animate={{
            scale: 1 - index * 0.08,
            opacity: 1 - index * 0.12,
            rotate: index * 15,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <div
            className="w-2 h-2 bg-gradient-to-r from-orange-500/60 to-cyan-500/60"
            style={{
              clipPath:
                index % 2 === 0
                  ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond
                  : "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Hexagon
            }}
          />
        </motion.div>
      ))}

      {/* Particles - Various shapes */}
      <AnimatePresence>
        {particles.map((particle, index) => (
          <motion.div
            key={particle.id}
            className="absolute"
            initial={{
              x: particle.x,
              y: particle.y,
              opacity: particle.opacity,
              scale: 1,
            }}
            animate={{
              y: particle.y - 30,
              x: particle.x + (Math.random() - 0.5) * 20,
              opacity: 0,
              scale: 0,
              rotate: 360,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          >
            <div
              className={`w-1 h-1 ${
                index % 3 === 0 ? "bg-orange-400" : index % 3 === 1 ? "bg-cyan-400" : "bg-pink-400"
              }`}
              style={{
                clipPath:
                  index % 4 === 0
                    ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" // Diamond
                    : index % 4 === 1
                      ? "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" // Hexagon
                      : index % 4 === 2
                        ? "polygon(50% 0%, 0% 100%, 100% 100%)" // Triangle
                        : "none", // Circle (default)
                borderRadius: index % 4 === 3 ? "50%" : "0",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Hover Effect - Energy Field */}
      {cursorState.isHovering && (
        <motion.div
          className="absolute"
          animate={{
            x: cursorState.x - 40,
            y: cursorState.y - 40,
          }}
          initial={{ opacity: 0, scale: 0 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
        >
          {/* Energy field rings */}
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className={`absolute border rounded-full ${
                cursorState.hoverType === "button"
                  ? "border-orange-400/60"
                  : cursorState.hoverType === "link"
                    ? "border-cyan-400/60"
                    : "border-green-400/60"
              }`}
              style={{
                width: 80 + ring * 20,
                height: 80 + ring * 20,
                left: -ring * 10,
                top: -ring * 10,
              }}
              animate={{
                rotate: ring % 2 === 0 ? 360 : -360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: {
                  duration: 3 + ring,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Click Effect - Energy Burst */}
      {cursorState.isClicking && (
        <motion.div
          className="absolute"
          animate={{
            x: cursorState.x - 50,
            y: cursorState.y - 50,
          }}
        >
          {/* Energy burst lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-r from-orange-400 to-transparent"
              style={{
                height: 40,
                left: 50,
                top: 50,
                transformOrigin: "0 0",
                transform: `rotate(${i * 45}deg)`,
              }}
              initial={{ scaleY: 0, opacity: 1 }}
              animate={{ scaleY: 1, opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Typing Indicator - Code brackets */}
      {cursorState.isTyping && (
        <motion.div
          className="absolute flex items-center space-x-1 text-green-400 font-mono text-sm"
          animate={{
            x: cursorState.x + 25,
            y: cursorState.y - 15,
          }}
        >
          <span>{"<"}</span>
          <motion.div
            className="flex space-x-0.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
          <span>{"/>"}</span>
        </motion.div>
      )}
    </div>
  )
}
