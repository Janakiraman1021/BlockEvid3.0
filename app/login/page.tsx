"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, LogIn, ArrowRight, FileText, Wallet, CheckCircle } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"

export default function LoginPage() {
  const router = useRouter()
  const { connectWallet, isConnected } = useWeb3()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState<"wallet" | "credentials">("wallet")
  const [walletConnected, setWalletConnected] = useState(false)

  const handleWalletConnect = async () => {
    setLoading(true)
    try {
      const success = await connectWallet("metamask")
      if (success) {
        setWalletConnected(true)
        setStep("credentials")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!walletConnected) {
      return
    }
    setLoading(true)
    // Add your login logic here
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Grid */}
      <div className="absolute inset-0 smooth-grid" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-6 mb-8">
            <Badge className="bg-orange/20 text-orange border-orange/50 px-6 py-2 text-sm font-medium">
              <FileText className="h-4 w-4 mr-2" />
              Web3 Evidence Vault
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight gradient-text">Welcome Back</h1>
            <p className="text-cream-light">
              Access your decentralized evidence management platform
            </p>
          </div>

          <Card className="glassmorphism-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center gradient-text">Login</CardTitle>
              <CardDescription className="text-center text-cream-light">
                {step === "wallet" 
                  ? "First, connect your wallet" 
                  : "Now, enter your credentials"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {step === "wallet" ? (
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex justify-center">
                      <div className="p-4 rounded-full bg-orange/10">
                        <Wallet className="h-8 w-8 text-orange" />
                      </div>
                    </div>
                    <p className="text-cream-light">
                      Connect your wallet to verify your Web3 identity
                    </p>
                  </div>

                  <Button
                    onClick={handleWalletConnect}
                    className="w-full modern-button text-lg py-6 pulse-glow"
                    disabled={loading}
                  >
                    <Wallet className="mr-2 h-5 w-5" />
                    {loading ? "Connecting..." : "Connect Wallet"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="modern-input"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="modern-input"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="remember"
                        className="rounded border-orange/50 bg-orange/10 text-orange focus:ring-orange"
                      />
                      <label htmlFor="remember" className="text-sm text-cream-light">
                        Remember me
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-orange hover:text-orange/80 transition-colors">
                      Forgot password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    className="w-full modern-button text-lg py-6 pulse-glow"
                    disabled={loading}
                  >
                    <LogIn className="mr-2 h-5 w-5" />
                    {loading ? "Accessing..." : "Access Vault"}
                  </Button>
                </form>
              )}

              <div className="mt-6 text-center space-y-4">
                <p className="text-sm text-cream-light">
                  Don't have an account?{" "}
                  <Link href="/register" className="text-orange hover:text-orange/80 transition-colors">
                    Create account
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Features */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="text-center space-y-2 p-4 rounded-xl glassmorphism">
              <Shield className="h-6 w-6 mx-auto text-orange" />
              <div className="text-sm text-sage-green">Secure Access</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl glassmorphism">
              <FileText className="h-6 w-6 mx-auto text-cyan-bright" />
              <div className="text-sm text-sage-green">IPFS Backed</div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link href="/">
              <Button variant="ghost" className="text-cream-light hover:text-orange">
                <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
