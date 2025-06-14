"use client"

import { useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HexagonIcon, FileText, Settings, LogOut, Menu, X, Home, Shield, Users, Bell } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { address, disconnectWallet, userRole } = useWeb3()
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Protect routes based on role
  useEffect(() => {
    if (!address) {
      router.push("/login")
      return
    }

    // Redirect if user is on the wrong dashboard
    if (userRole === "user" && !pathname?.startsWith("/complaint")) {
      router.push("/complaint")
    } else if (userRole === "officer" && !pathname?.startsWith("/officer")) {
      router.push("/officer")
    } else if (userRole === "admin" && !pathname?.startsWith("/admin")) {
      router.push("/admin")
    }
  }, [address, userRole, pathname, router])

  const handleLogout = () => {
    disconnectWallet()
    router.push("/")
  }

  // Navigation items based on role
  const navigationItems = [
    ...(userRole === "user"
      ? [
          { name: "Dashboard", href: "/complaint", icon: Home },
          { name: "My Complaints", href: "/complaint/list", icon: FileText },
        ]
      : []),
    ...(userRole === "officer"
      ? [
          { name: "Dashboard", href: "/officer", icon: Home },
          { name: "Assigned Cases", href: "/officer/cases", icon: FileText },
          { name: "Evidence Vault", href: "/officer/evidence", icon: Shield },
        ]
      : []),
    ...(userRole === "admin"
      ? [
          { name: "Dashboard", href: "/admin", icon: Home },
          { name: "All Complaints", href: "/admin/complaints", icon: FileText },
          { name: "Officers", href: "/admin/officers", icon: Shield },
          { name: "Users", href: "/admin/users", icon: Users },
        ]
      : []),
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-30">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>

            <Link href="/" className="flex items-center gap-2">
              <HexagonIcon className="h-6 w-6 text-purple-500" />
              <span className="text-lg font-bold tracking-tight neon-text">BlockEvid 3.0</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-purple-500">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {[
                  "New evidence uploaded for case #1234",
                  "Complaint status updated: Under Investigation",
                  "New comment on your complaint",
                ].map((notification, i) => (
                  <DropdownMenuItem key={i} className="py-2 cursor-pointer">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500 mt-2" />
                      <span>{notification}</span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9 border border-purple-500/50">
                    <AvatarFallback className="bg-purple-950/50 text-xs">
                      {userRole?.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium capitalize">{userRole}</span>
                    <span className="text-xs text-muted-foreground">
                      {address?.substring(0, 6)}...{address?.substring(address.length - 4)}
                    </span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Desktop */}
        <aside className="w-64 border-r border-white/10 hidden md:block sticky top-16 h-[calc(100vh-4rem)] glassmorphism">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    isActive ? "bg-purple-950/50 text-white border-l-2 border-purple-500" : "hover:bg-white/5",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-purple-400" : "text-gray-400")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden">
            <div className="fixed inset-y-0 left-0 w-64 glassmorphism border-r border-white/10 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HexagonIcon className="h-6 w-6 text-purple-500" />
                  <span className="text-lg font-bold tracking-tight neon-text">BlockEvid 3.0</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive ? "bg-purple-950/50 text-white border-l-2 border-purple-500" : "hover:bg-white/5",
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-purple-400" : "text-gray-400")} />
                      {item.name}
                    </Link>
                  )
                })}

                <button
                  className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors w-full text-left hover:bg-white/5 mt-4"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 text-gray-400" />
                  Log out
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 py-6 px-4 md:px-6">{children}</main>
      </div>
    </div>
  )
}
