import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie, Settings, Shield, BarChart, Target } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen">
      <CyberpunkNavbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold holographic">Cookie Policy</h1>
            <p className="text-xl text-gray-300">Digital tracking protocols for enhanced security</p>
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
              <Cookie className="h-4 w-4" />
              Last updated: December 2024 | GDPR Compliant
            </div>
          </div>

          {/* Cookie Categories */}
          <div className="grid gap-6">
            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-blue-text">
                  <Shield className="h-6 w-6" />
                  Essential Security Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  These cookies are necessary for the website to function and cannot be switched off in our systems.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-300">Authentication Tokens</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Wallet connection state</li>
                      <li>• Session management</li>
                      <li>• CSRF protection</li>
                      <li>• Multi-factor authentication</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-blue-300">Security Monitoring</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Fraud detection</li>
                      <li>• Rate limiting</li>
                      <li>• Access logging</li>
                      <li>• Threat prevention</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-green-text">
                  <Settings className="h-6 w-6" />
                  Functional Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  These cookies enable the website to provide enhanced functionality and personalization.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-green-300 mb-1">User Preferences</h4>
                    <p className="text-gray-300 text-sm">
                      Theme settings, language preferences, dashboard layout, and notification settings.
                    </p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <h4 className="font-semibold text-green-300 mb-1">Interface State</h4>
                    <p className="text-gray-300 text-sm">
                      Sidebar collapse state, filter preferences, and table sorting options.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-pink-text">
                  <BarChart className="h-6 w-6" />
                  Analytics Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  These cookies help us understand how visitors interact with our website.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-pink-300">Usage Analytics</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Page views and navigation</li>
                      <li>• Feature usage statistics</li>
                      <li>• Error tracking</li>
                      <li>• Performance monitoring</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-pink-300">Privacy-First Analytics</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• No personal identification</li>
                      <li>• Anonymized data collection</li>
                      <li>• Local data processing</li>
                      <li>• GDPR compliant tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-text">
                  <Target className="h-6 w-6" />
                  Cookie Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Your Control Options</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      You can control and/or delete cookies as you wish. You can delete all cookies that are already on
                      your computer and you can set most browsers to prevent them from being placed.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Browser Settings</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Chrome: Settings → Privacy → Cookies</li>
                        <li>• Firefox: Options → Privacy → Cookies</li>
                        <li>• Safari: Preferences → Privacy</li>
                        <li>• Edge: Settings → Privacy → Cookies</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <h4 className="font-semibold text-blue-300 mb-2">Opt-Out Tools</h4>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Network Advertising Initiative</li>
                        <li>• Digital Advertising Alliance</li>
                        <li>• European Interactive Digital</li>
                        <li>• Your Online Choices</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cookie Consent Notice */}
          <Card className="glassmorphism-card border-cyan-500/30">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold neon-cyan-text">Cookie Consent</h3>
                <p className="text-gray-300">
                  By continuing to use BlockEvid 3.0, you consent to our use of cookies as described in this policy.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="cyberpunk-button">Accept All Cookies</button>
                  <button className="px-6 py-2 border border-purple-500/50 rounded-lg text-purple-300 hover:bg-purple-500/10 transition-colors">
                    Manage Preferences
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
