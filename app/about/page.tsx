import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Info, Users, Target, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <CyberpunkNavbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold holographic">About BlockEvid 3.0</h1>
            <p className="text-xl text-gray-300">
              Revolutionizing evidence management through quantum-secured blockchain technology
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
              <Info className="h-4 w-4" />
              Est. 2024 | Next-Gen Evidence Vault
            </div>
          </div>

          {/* About Sections */}
          <div className="grid gap-6">
            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-blue-text">
                  <Target className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-lg leading-relaxed">
                  To create an unbreachable, transparent, and immutable evidence management ecosystem that empowers law
                  enforcement agencies and legal professionals with quantum-secured blockchain technology, ensuring
                  justice through technological innovation.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-2xl font-bold text-blue-300 mb-1">100%</div>
                    <div className="text-sm text-gray-300">Tamper-Proof</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <div className="text-2xl font-bold text-purple-300 mb-1">24/7</div>
                    <div className="text-sm text-gray-300">Availability</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <div className="text-2xl font-bold text-green-300 mb-1">∞</div>
                    <div className="text-sm text-gray-300">Scalability</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-green-text">
                  <Zap className="h-6 w-6" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">Blockchain Layer</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Ethereum-based smart contracts</li>
                      <li>• Quantum-resistant cryptography</li>
                      <li>• Multi-signature validation</li>
                      <li>• Time-locked evidence containers</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">Storage & Security</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• IPFS distributed storage</li>
                      <li>• AES-256 encryption</li>
                      <li>• Zero-knowledge proofs</li>
                      <li>• Biometric authentication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-pink-text">
                  <Users className="h-6 w-6" />
                  Our Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
                      <h4 className="font-semibold text-pink-300 mb-2">Cybersecurity Experts</h4>
                      <p className="text-gray-300 text-sm">
                        Former NSA cryptographers and blockchain security specialists with decades of experience in
                        digital forensics and evidence management.
                      </p>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <h4 className="font-semibold text-purple-300 mb-2">Law Enforcement Veterans</h4>
                      <p className="text-gray-300 text-sm">
                        Retired detectives and forensic analysts who understand the real-world challenges of evidence
                        handling and chain of custody requirements.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                      <h4 className="font-semibold text-blue-300 mb-2">Blockchain Developers</h4>
                      <p className="text-gray-300 text-sm">
                        Leading smart contract developers and DeFi architects building the next generation of
                        decentralized applications for critical infrastructure.
                      </p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <h4 className="font-semibold text-green-300 mb-2">Legal Advisors</h4>
                      <p className="text-gray-300 text-sm">
                        Constitutional lawyers and privacy advocates ensuring our platform meets all legal requirements
                        while protecting individual rights.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-text">
                  <Globe className="h-6 w-6" />
                  Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold neon-blue-text">50+</div>
                    <div className="text-sm text-gray-300">Countries Served</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold neon-green-text">1M+</div>
                    <div className="text-sm text-gray-300">Evidence Files Secured</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold neon-pink-text">99.9%</div>
                    <div className="text-sm text-gray-300">Uptime Guarantee</div>
                  </div>
                </div>
                <p className="text-gray-300 text-center mt-6">
                  Trusted by law enforcement agencies, legal firms, and government institutions worldwide to secure
                  critical evidence and maintain the integrity of justice systems.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="glassmorphism-card border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold neon-cyan-text mb-4">Join the Revolution</h3>
              <p className="text-gray-300 mb-4">
                Ready to transform your evidence management with quantum-secured blockchain technology?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="cyberpunk-button">Request Demo</button>
                <button className="px-6 py-2 border border-cyan-500/50 rounded-lg text-cyan-300 hover:bg-cyan-500/10 transition-colors">
                  Contact Sales
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
