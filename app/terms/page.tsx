import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertTriangle, Shield, Gavel, Users } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <CyberpunkNavbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold holographic">Terms of Service</h1>
            <p className="text-xl text-gray-300">Legal framework for quantum evidence management</p>
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
              <Scale className="h-4 w-4" />
              Effective: December 2024 | Version 3.0.1 | Jurisdiction: Global
            </div>
          </div>

          {/* Terms Sections */}
          <div className="grid gap-6">
            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-blue-text">
                  <FileText className="h-6 w-6" />
                  Service Agreement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">1. Acceptance of Terms</h3>
                    <p className="text-gray-300">
                      By accessing BlockEvid 3.0 Quantum Evidence Vault, you agree to be bound by these Terms of Service
                      and all applicable laws and regulations. If you do not agree with any of these terms, you are
                      prohibited from using or accessing this service.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">2. Service Description</h3>
                    <p className="text-gray-300">
                      BlockEvid 3.0 provides a decentralized, blockchain-based evidence management system utilizing
                      quantum-resistant cryptography, IPFS storage, and smart contract automation for law enforcement
                      and legal professionals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-green-text">
                  <Users className="h-6 w-6" />
                  User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">Law Enforcement Officers</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Maintain evidence chain of custody</li>
                      <li>• Ensure data accuracy and authenticity</li>
                      <li>• Follow departmental protocols</li>
                      <li>• Protect access credentials</li>
                      <li>• Report security incidents immediately</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">Citizens & Complainants</h4>
                    <ul className="text-sm text-gray-300 space-y-1">
                      <li>• Provide truthful information</li>
                      <li>• Respect privacy of others</li>
                      <li>• Use service for legitimate purposes</li>
                      <li>• Maintain wallet security</li>
                      <li>• Comply with local laws</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-pink-text">
                  <Shield className="h-6 w-6" />
                  Blockchain & Cryptocurrency Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
                    <h4 className="font-semibold text-pink-300 mb-2">Wallet Responsibility</h4>
                    <p className="text-gray-300 text-sm">
                      Users are solely responsible for maintaining the security of their cryptocurrency wallets, private
                      keys, and seed phrases. BlockEvid cannot recover lost or compromised wallet access.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Transaction Costs</h4>
                    <p className="text-gray-300 text-sm">
                      Users are responsible for all blockchain transaction fees (gas fees) associated with evidence
                      submission, verification, and retrieval operations.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <h4 className="font-semibold text-blue-300 mb-2">Immutability Notice</h4>
                    <p className="text-gray-300 text-sm">
                      Data recorded on the blockchain is permanent and cannot be deleted or modified. Ensure accuracy
                      before submitting evidence to the system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-text">
                  <Gavel className="h-6 w-6" />
                  Legal Compliance & Limitations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Jurisdictional Compliance</h4>
                    <p className="text-gray-300 text-sm">
                      Users must comply with all applicable local, state, federal, and international laws regarding
                      evidence handling, data protection, and blockchain technology usage.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-purple-300 mb-2">Service Limitations</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Service availability subject to blockchain network status</li>
                      <li>• IPFS storage dependent on network nodes</li>
                      <li>• Smart contract functionality may be limited by network congestion</li>
                      <li>• Quantum computing advances may affect cryptographic security</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-300 mb-1">Disclaimer of Warranties</h4>
                        <p className="text-yellow-200 text-sm">
                          BlockEvid 3.0 is provided "as is" without warranties of any kind. We do not guarantee
                          uninterrupted service or complete security against all possible threats.
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
              <h3 className="text-xl font-semibold neon-cyan-text mb-4">Legal Questions?</h3>
              <p className="text-gray-300 mb-4">
                Contact our Legal Department for terms clarification or compliance inquiries
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm font-mono">
                <span className="text-cyan-400">legal@blockevid.quantum</span>
                <span className="hidden sm:block text-gray-500">|</span>
                <span className="text-cyan-400">+1-800-LEGAL-TECH</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
