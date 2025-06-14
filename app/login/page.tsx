"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HexagonIcon, Wallet, Shield, UserCircle } from "lucide-react"
import { useWeb3 } from "@/components/web3-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const { connectWallet, isConnected } = useWeb3()
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)
  const [selectedRole, setSelectedRole] = useState<"user" | "officer" | "admin">("user")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)

  const handleWalletConnect = async (type: "metamask" | "walletconnect") => {
    setIsConnecting(true)
    try {
      const success = await connectWallet(type, selectedRole)
      if (success) {
        // Redirect based on role
        const redirectPath = selectedRole === "user" ? "/complaint" : selectedRole === "officer" ? "/officer" : "/admin"

        router.push(redirectPath)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleSendOtp = () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      })
      return
    }

    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: "A one-time password has been sent to your email",
    })
    setOtpSent(true)
  }

  const handleEmailLogin = async () => {
    if (!otp || otp.length < 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid one-time password",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      // Simulate email login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const success = await connectWallet("none", selectedRole)
      if (success) {
        // Redirect based on role
        const redirectPath = selectedRole === "user" ? "/complaint" : selectedRole === "officer" ? "/officer" : "/admin"

        router.push(redirectPath)
      }
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container flex items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <HexagonIcon className="h-6 w-6 text-purple-500" />
            <span className="text-lg font-bold tracking-tight neon-text">BlockEvid 3.0</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 container flex items-center justify-center py-12">
        <Card className="w-full max-w-md glassmorphism border-purple-500/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl neon-text">Secure Authentication</CardTitle>
            <CardDescription>Connect your wallet or use email to access BlockEvid 3.0</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <Label>Select Your Role</Label>
              <RadioGroup
                defaultValue="user"
                className="grid grid-cols-3 gap-4 mt-2"
                onValueChange={(value) => setSelectedRole(value as "user" | "officer" | "admin")}
              >
                <div>
                  <RadioGroupItem value="user" id="user" className="peer sr-only" />
                  <Label
                    htmlFor="user"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-950/20 [&:has([data-state=checked])]:border-primary"
                  >
                    <UserCircle className="mb-2 h-6 w-6" />
                    User
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="officer" id="officer" className="peer sr-only" />
                  <Label
                    htmlFor="officer"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-950/20 [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-2 h-6 w-6" />
                    Officer
                  </Label>
                </div>

                <div>
                  <RadioGroupItem value="admin" id="admin" className="peer sr-only" />
                  <Label
                    htmlFor="admin"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-950/20 [&:has([data-state=checked])]:border-primary"
                  >
                    <Shield className="mb-2 h-6 w-6" />
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Tabs defaultValue="wallet" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="wallet">Wallet</TabsTrigger>
                <TabsTrigger value="email">Email + OTP</TabsTrigger>
              </TabsList>

              <TabsContent value="wallet" className="space-y-4 mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start border-purple-500/30 hover:border-purple-500 hover:bg-purple-950/30"
                  onClick={() => handleWalletConnect("metamask")}
                  disabled={isConnecting}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect with MetaMask"}
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start border-blue-500/30 hover:border-blue-500 hover:bg-blue-950/30"
                  onClick={() => handleWalletConnect("walletconnect")}
                  disabled={isConnecting}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? "Connecting..." : "Connect with WalletConnect"}
                </Button>
              </TabsContent>

              <TabsContent value="email" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={otpSent || isConnecting}
                    />
                    <Button onClick={handleSendOtp} disabled={otpSent || isConnecting || !email}>
                      Send OTP
                    </Button>
                  </div>
                </div>

                {otpSent && (
                  <div className="space-y-2">
                    <Label htmlFor="otp">One-Time Password</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      disabled={isConnecting}
                    />
                  </div>
                )}

                {otpSent && (
                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                    onClick={handleEmailLogin}
                    disabled={isConnecting || !otp}
                  >
                    {isConnecting ? "Authenticating..." : "Login"}
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-white/10 pt-4">
            <p className="text-xs text-gray-400">By connecting, you agree to our Terms of Service and Privacy Policy</p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
