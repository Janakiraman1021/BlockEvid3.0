"use client"

import { useEthereumCursor } from "@/hooks/use-ethereum-cursor"
import { useEffect, useState } from "react"

export function EthereumCursor() {
  const { position, cursorState, isVisible } = useEthereumCursor()
  const [isMounted, setIsMounted] = useState(false)
  const [userPreference, setUserPreference] = useState(true)

  useEffect(() => {
    setIsMounted(true)

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      setUserPreference(false)
    }

    // Hide default cursor
    document.body.style.cursor = userPreference ? "none" : "auto"

    return () => {
      document.body.style.cursor = "auto"
    }
  }, [userPreference])

  if (!isMounted || !userPreference) {
    return null
  }

  return (
    <>
      {/* Main Cursor */}
      <div
        className={`ethereum-cursor ${isVisible ? "visible" : "hidden"} ${
          cursorState.isHovering ? "hovering" : ""
        } ${cursorState.isClicking ? "clicking" : ""} ${cursorState.isLoading ? "loading" : ""}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {/* Ethereum Diamond Shape */}
        <div className="ethereum-diamond">
          <div className="diamond-top"></div>
          <div className="diamond-bottom"></div>
        </div>

        {/* Outer Ring */}
        <div className="ethereum-ring"></div>

        {/* Particle Effects */}
        <div className="ethereum-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
        </div>

        {/* Loading Spinner */}
        {cursorState.isLoading && (
          <div className="ethereum-loader">
            <div className="loader-ring"></div>
          </div>
        )}
      </div>

      {/* Cursor Trail */}
      <div
        className={`ethereum-trail ${isVisible ? "visible" : "hidden"}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        <div className="trail-element trail-1"></div>
        <div className="trail-element trail-2"></div>
        <div className="trail-element trail-3"></div>
      </div>

      {/* Cursor Styles */}
      <style jsx>{`
        .ethereum-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: opacity 0.2s ease;
          mix-blend-mode: difference;
        }

        .ethereum-cursor.hidden {
          opacity: 0;
        }

        .ethereum-cursor.visible {
          opacity: 1;
        }

        .ethereum-diamond {
          position: relative;
          width: 20px;
          height: 20px;
          transform: rotate(45deg);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .diamond-top {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 10px solid #46b1c9;
          filter: drop-shadow(0 0 8px rgba(70, 177, 201, 0.6));
        }

        .diamond-bottom {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid #ea9010;
          filter: drop-shadow(0 0 8px rgba(234, 144, 16, 0.6));
        }

        .ethereum-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border: 2px solid rgba(70, 177, 201, 0.3);
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          animation: ringPulse 2s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        .ethereum-particles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #f8ab81;
          border-radius: 50%;
          opacity: 0.7;
          animation: particleFloat 3s ease-in-out infinite;
        }

        .particle-1 {
          top: 0;
          left: 50%;
          animation-delay: 0s;
        }

        .particle-2 {
          top: 50%;
          right: 0;
          animation-delay: 0.75s;
        }

        .particle-3 {
          bottom: 0;
          left: 50%;
          animation-delay: 1.5s;
        }

        .particle-4 {
          top: 50%;
          left: 0;
          animation-delay: 2.25s;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
        }

        .ethereum-loader {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
        }

        .loader-ring {
          width: 100%;
          height: 100%;
          border: 3px solid rgba(234, 144, 16, 0.2);
          border-top: 3px solid #ea9010;
          border-radius: 50%;
          animation: loaderSpin 1s linear infinite;
        }

        @keyframes loaderSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .ethereum-trail {
          position: fixed;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }

        .ethereum-trail.hidden {
          opacity: 0;
        }

        .ethereum-trail.visible {
          opacity: 1;
        }

        .trail-element {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(70, 177, 201, 0.4), transparent);
          animation: trailFade 0.8s ease-out forwards;
        }

        .trail-1 {
          width: 30px;
          height: 30px;
          animation-delay: 0.1s;
        }

        .trail-2 {
          width: 20px;
          height: 20px;
          animation-delay: 0.2s;
        }

        .trail-3 {
          width: 10px;
          height: 10px;
          animation-delay: 0.3s;
        }

        @keyframes trailFade {
          0% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.3);
          }
        }

        /* Hover State */
        .ethereum-cursor.hovering .ethereum-diamond {
          transform: rotate(45deg) scale(1.5);
        }

        .ethereum-cursor.hovering .diamond-top {
          border-bottom-color: #f15025;
          filter: drop-shadow(0 0 12px rgba(241, 80, 37, 0.8));
        }

        .ethereum-cursor.hovering .diamond-bottom {
          border-top-color: #46b1c9;
          filter: drop-shadow(0 0 12px rgba(70, 177, 201, 0.8));
        }

        .ethereum-cursor.hovering .ethereum-ring {
          width: 60px;
          height: 60px;
          border-color: rgba(241, 80, 37, 0.6);
          border-width: 3px;
        }

        /* Click State */
        .ethereum-cursor.clicking .ethereum-diamond {
          transform: rotate(45deg) scale(0.8);
        }

        .ethereum-cursor.clicking .ethereum-ring {
          width: 80px;
          height: 80px;
          border-color: rgba(234, 144, 16, 0.8);
          border-width: 4px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .ethereum-cursor,
          .ethereum-trail {
            display: none;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .ethereum-cursor,
          .ethereum-trail {
            display: none;
          }
          
          .ethereum-cursor * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  )
}
