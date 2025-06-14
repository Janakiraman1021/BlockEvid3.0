import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Eye, Lock, Database, Users, AlertTriangle } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <CyberpunkNavbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold holographic">Privacy Policy</h1>
            <p className="text-xl text-gray-300">Quantum-encrypted privacy protection for the digital age</p>
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
              <Lock className="h-4 w-4" />
              Last updated: December 2024 | Version 3.0.1
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="grid gap-6">
            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-blue-text">
                  <Eye className="h-6 w-6" />
                  Data Collection & Usage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-purple-300">Information We Collect</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full mt-2" />
                      <span>
                        <strong>Blockchain Data:</strong> Wallet addresses, transaction hashes, and smart contract
                        interactions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full mt-2" />
                      <span>
                        <strong>Evidence Metadata:</strong> File hashes, timestamps, and cryptographic signatures
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full mt-2" />
                      <span>
                        <strong>User Interactions:</strong> Login attempts, case access logs, and system usage patterns
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-2 w-2 bg-cyan-400 rounded-full mt-2" />
                      <span>
                        <strong>Technical Data:</strong> IP addresses, device fingerprints, and security tokens
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-green-text">
                  <Shield className="h-6 w-6" />
                  Quantum Security Measures
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-300">Encryption Protocols</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• AES-256 quantum-resistant encryption</li>
                      <li>• End-to-end encrypted communications</li>
                      <li>• Zero-knowledge proof systems</li>
                      <li>• Homomorphic encryption for data processing</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-green-300">Access Controls</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Multi-signature wallet authentication</li>
                      <li>• Role-based access control (RBAC)</li>
                      <li>• Time-locked evidence containers</li>
                      <li>• Biometric verification layers</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-pink-text">
                  <Database className="h-6 w-6" />
                  Data Storage & Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
                    <h4 className="font-semibold text-pink-300 mb-2">Immutable Blockchain Storage</h4>
                    <p className="text-gray-300 text-sm">
                      Evidence hashes and metadata are permanently stored on the blockchain for tamper-proof
                      verification. This data cannot be deleted or modified once committed to the distributed ledger.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">IPFS Distributed Storage</h4>
                    <p className="text-gray-300 text-sm">
                      Actual evidence files are stored on IPFS with content-addressed storage, ensuring data integrity
                      and availability across the decentralized network.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-text">
                  <Users className="h-6 w-6" />
                  Your Rights & Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-300">Data Rights</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                        Right to access your data
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                        Right to data portability
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                        Right to rectification
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-purple-400 rounded-full" />
                        Right to object to processing
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-300">Blockchain Limitations</h4>
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                        <p className="text-yellow-200 text-sm">
                          Due to blockchain's immutable nature, some data cannot be deleted or modified once recorded.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Section */}
          <Card className="glassmorphism-card border-cyan-500/30">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-semibold neon-cyan-text mb-4">Privacy Questions?</h3>
              <p className="text-gray-300 mb-4">
                Contact our Data Protection Officer for any privacy-related inquiries
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm font-mono">
                <span className="text-cyan-400">DPO@blockevid.quantum</span>
                <span className="hidden sm:block text-gray-500">|</span>
                <span className="text-cyan-400">+1-800-QUANTUM-SEC</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
