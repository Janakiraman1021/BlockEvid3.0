"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HexagonIcon,
  Shield,
  Database,
  Lock,
  Zap,
  Eye,
  Users,
  Globe,
  ArrowRight,
  CheckCircle,
  Cpu,
  Network,
  FileCheck,
  TrendingUp,
  FileText,
  UserCheck,
  Scale,
} from "lucide-react"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
      <CyberpunkNavbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 smooth-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="space-y-6 smooth-fade-in">
              <Badge className="bg-orange/20 text-orange border-orange/50 px-6 py-2 text-sm font-medium">
                <FileText className="h-4 w-4 mr-2" />
                Web3 Evidence Lifecycle Vault
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="gradient-text">BlockEvid 3.0</span>
              </h1>
              <p className="text-xl md:text-2xl text-cream-light max-w-3xl mx-auto leading-relaxed">
                Transform your complaint and evidence lifecycle with blockchain-powered transparency, IPFS storage, and immutable chain of custody verification.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center smooth-slide-up">
              <Link href="/login">
                <Button className="modern-button text-lg px-8 py-4 pulse-glow">
                  <Shield className="mr-2 h-5 w-5" />
                  Access Evidence Vault
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/complaint/new">
                <Button className="modern-button-outline text-lg px-8 py-4">
                  <FileCheck className="mr-2 h-5 w-5" />
                  File Complaint
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 smooth-slide-up">
              <div className="text-center space-y-3 card-hover p-4 rounded-xl glassmorphism">
                <div className="text-3xl font-bold text-orange">100%</div>
                <div className="text-sm text-sage-green">Immutable</div>
              </div>
              <div className="text-center space-y-3 card-hover p-4 rounded-xl glassmorphism">
                <div className="text-3xl font-bold text-cyan-bright">∞</div>
                <div className="text-sm text-sage-green">Decentralized</div>
              </div>
              <div className="text-center space-y-3 card-hover p-4 rounded-xl glassmorphism">
                <div className="text-3xl font-bold text-red-accent">24/7</div>
                <div className="text-sm text-sage-green">Available</div>
              </div>
              <div className="text-center space-y-3 card-hover p-4 rounded-xl glassmorphism">
                <div className="text-3xl font-bold text-peach-warm">IPFS</div>
                <div className="text-sm text-sage-green">Storage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-6 mb-16 smooth-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Core Features</h2>
            <p className="text-xl text-cream-light max-w-2xl mx-auto">
              Blockchain-powered evidence management with IPFS storage and role-based access control
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Complaint Filing",
                description:
                  "Secure and transparent complaint submission with blockchain verification and IPFS storage for evidence.",
                color: "orange",
                features: ["On-chain Verification", "IPFS Storage"],
              },
              {
                icon: Database,
                title: "IPFS Storage",
                description:
                  "Decentralized storage across the InterPlanetary File System ensuring evidence availability and redundancy.",
                color: "cyan-bright",
                features: ["Content-Addressed", "Global Redundancy"],
              },
              {
                icon: Network,
                title: "Smart Contracts",
                description:
                  "Automated evidence handling through self-executing contracts with built-in compliance and verification.",
                color: "red-accent",
                features: ["Automated Workflow", "Chain of Custody"],
              },
              {
                icon: Lock,
                title: "Role-Based Access",
                description:
                  "Granular permission system ensuring only authorized personnel can access and manage evidence.",
                color: "peach-warm",
                features: ["User Roles", "Secure Access"],
              },
              {
                icon: Eye,
                title: "Immutable Audit Trail",
                description:
                  "Complete transparency with blockchain records of all evidence interactions and modifications.",
                color: "cyan-bright",
                features: ["Full Transparency", "Audit Logs"],
              },
              {
                icon: Scale,
                title: "Legal Compliance",
                description:
                  "Built-in compliance with legal standards and requirements for evidence handling and storage.",
                color: "tan-warm",
                features: ["Legal Standards", "Compliance Ready"],
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className={`glassmorphism-card smooth-border-${feature.color} card-hover smooth-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${feature.color}/20 rounded-xl`}>
                      <feature.icon className={`h-6 w-6 text-${feature.color}`} />
                    </div>
                    <CardTitle className={`text-${feature.color} text-xl`}>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-cream-light mb-4 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-sage-green">
                        <CheckCircle className="h-4 w-4 text-cyan-bright" />
                        {feat}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-dark/20 to-purple-dark/20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6 mb-16 smooth-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Platform Security</h2>
            <p className="text-xl text-cream-light max-w-2xl mx-auto">
              Built with enterprise-grade security standards for evidence management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 smooth-slide-up">
              {[
                {
                  icon: Shield,
                  title: "Blockchain Security",
                  description:
                    "Evidence and complaints are secured on the blockchain with cryptographic verification and immutable records.",
                  color: "red-accent",
                },
                {
                  icon: Zap,
                  title: "Real-time Updates",
                  description:
                    "Instant status updates and notifications for all stakeholders in the complaint lifecycle.",
                  color: "orange",
                },
                {
                  icon: Globe,
                  title: "Global Access",
                  description:
                    "Access your evidence and complaints securely from anywhere with role-based permissions.",
                  color: "cyan-bright",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="space-y-4 smooth-fade-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 bg-${item.color}/20 rounded-xl pulse-glow`}>
                      <item.icon className={`h-6 w-6 text-${item.color}`} />
                    </div>
                    <h3 className={`text-xl font-semibold text-${item.color}`}>{item.title}</h3>
                  </div>
                  <p className="text-cream-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="relative smooth-slide-up">
              <div className="glassmorphism-card p-8 smooth-border float-animation">
                <div className="space-y-6">
                  <div className="text-center">
                    <HexagonIcon className="h-20 w-20 mx-auto text-orange pulse-glow" />
                    <h3 className="text-2xl font-bold gradient-text mt-4">Security Status</h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Encryption Level", value: "QUANTUM-256", color: "cyan-bright" },
                      { label: "Network Status", value: "SECURE", color: "cyan-bright" },
                      { label: "Threat Level", value: "MINIMAL", color: "cyan-bright" },
                      { label: "Uptime", value: "99.99%", color: "orange" },
                    ].map((status, index) => (
                      <div
                        key={status.label}
                        className="flex justify-between items-center p-3 bg-teal-dark/30 rounded-lg smooth-scale"
                      >
                        <span className="text-cream-light">{status.label}</span>
                        <span className={`text-${status.color} font-mono font-bold`}>{status.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Countries Served", icon: Globe },
              { number: "1M+", label: "Complaints Filed", icon: FileText },
              { number: "99.9%", label: "Uptime", icon: TrendingUp },
              { number: "3", label: "User Roles", icon: UserCheck },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center space-y-4 glassmorphism-card p-6 card-hover smooth-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="h-12 w-12 mx-auto text-orange" />
                <div className="text-4xl font-bold gradient-text">{stat.number}</div>
                <div className="text-cream-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 smooth-grid" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-3xl mx-auto smooth-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text">Ready to Transform Evidence Management?</h2>
            <p className="text-xl text-cream-light leading-relaxed">
              Join organizations worldwide in revolutionizing complaint and evidence management with blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center smooth-slide-up">
              <Link href="/login">
                <Button className="modern-button text-lg px-8 py-4 pulse-glow">
                  <Shield className="mr-2 h-5 w-5" />
                  Access Evidence Vault
                </Button>
              </Link>
              <Link href="/about">
                <Button className="modern-button-outline text-lg px-8 py-4">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-orange/20 py-12 bg-teal-dark/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <HexagonIcon className="h-6 w-6 text-orange" />
                <span className="text-lg font-bold gradient-text">BlockEvid 3.0</span>
              </div>
              <p className="text-sage-green text-sm">Web3-powered evidence management for the digital age.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-orange">Platform</h4>
              <div className="space-y-2 text-sm">
                <Link href="/login" className="block text-sage-green hover:text-orange transition-colors">
                  Access Vault
                </Link>
                <Link href="/complaint/new" className="block text-sage-green hover:text-orange transition-colors">
                  File Complaint
                </Link>
                <Link href="/about" className="block text-sage-green hover:text-orange transition-colors">
                  About Us
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-cyan-bright">Legal</h4>
              <div className="space-y-2 text-sm">
                <Link href="/privacy" className="block text-sage-green hover:text-cyan-bright transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-sage-green hover:text-cyan-bright transition-colors">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="block text-sage-green hover:text-cyan-bright transition-colors">
                  Cookie Policy
                </Link>
                <Link href="/compliance" className="block text-sage-green hover:text-cyan-bright transition-colors">
                  Compliance
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-peach-warm">Contact</h4>
              <div className="space-y-2 text-sm text-sage-green">
                <div>support@blockevid.quantum</div>
                <div>+1-800-QUANTUM-SEC</div>
                <div className="text-xs font-mono text-cyan-bright">SECURE.CHANNEL.ACTIVE</div>
              </div>
            </div>
          </div>

          <div className="border-t border-orange/20 mt-8 pt-8 text-center text-sm text-sage-green">
            <p>&copy; 2024 BlockEvid 3.0. All rights reserved. Quantum-secured by design.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
