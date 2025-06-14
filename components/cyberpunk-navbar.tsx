"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  HexagonIcon,
  Menu,
  X,
  Shield,
  Zap,
  Database,
  Lock,
  FileText,
  Settings,
  Info,
  Scale,
  Eye,
  UserCheck,
  UserPlus,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CyberpunkNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/", icon: HexagonIcon },
    { name: "Features", href: "#features", icon: Zap },
    { name: "Security", href: "#security", icon: Shield },
    { name: "Evidence Vault", href: "#vault", icon: Database },
  ]

  const legalItems = [
    { name: "Privacy Policy", href: "/privacy", icon: Eye },
    { name: "Terms of Service", href: "/terms", icon: FileText },
    { name: "Cookie Policy", href: "/cookies", icon: Settings },
    { name: "Compliance", href: "/compliance", icon: UserCheck },
    { name: "About Us", href: "/about", icon: Info },
  ]

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          scrolled ? "glassmorphism border-b border-orange/30 shadow-lg shadow-orange/10" : "bg-transparent",
        )}
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group smooth-fade-in">
              <div className="relative">
                <HexagonIcon className="h-8 w-8 text-orange group-hover:text-cyan-bright transition-all duration-300 float-animation" />
                <div className="absolute inset-0 h-8 w-8 bg-orange/20 rounded-full blur-md group-hover:bg-cyan-bright/30 transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight gradient-text">BlockEvid 3.0</span>
                <span className="text-xs text-cyan-bright font-mono tracking-wider">QUANTUM.VAULT.SYS</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group smooth-scale",
                    pathname === item.href ? "text-orange smooth-border-orange" : "text-cream-light hover:text-orange",
                  )}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  {item.name}
                  <div className="absolute inset-0 bg-orange/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </Link>
              ))}

              {/* Legal Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-cream-light hover:text-cyan-bright font-medium transition-all duration-300 smooth-scale"
                  >
                    <Scale className="h-4 w-4 mr-2" />
                    Legal
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="glassmorphism smooth-border-cyan w-56">
                  <DropdownMenuLabel className="text-cyan-bright">Legal & Compliance</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-cyan-bright/30" />
                  {legalItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        className="flex items-center gap-2 cursor-pointer text-cream-light hover:text-orange transition-colors duration-300"
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* CTA Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/register">
                  <Button className="modern-button-outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="modern-button">
                    <Lock className="h-4 w-4 mr-2" />
                    Access Vault
                  </Button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-orange hover:text-cyan-bright transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glassmorphism border-t border-orange/30 mt-1 smooth-slide-up">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 smooth-scale",
                    pathname === item.href
                      ? "text-orange bg-orange/20 smooth-border-orange"
                      : "text-cream-light hover:text-orange hover:bg-orange/10",
                  )}
                  onClick={() => setIsOpen(false)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-orange/30 pt-2 mt-2">
                <div className="text-xs text-cyan-bright mb-2 px-4 font-mono">LEGAL.SYS</div>
                {legalItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-sage-green hover:text-cyan-bright hover:bg-cyan-bright/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                    style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2 border-t border-orange/30">
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full modern-button-outline">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Register
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full modern-button">
                    <Lock className="h-4 w-4 mr-2" />
                    Access Vault
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  )
}
