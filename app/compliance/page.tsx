import CyberpunkNavbar from "@/components/cyberpunk-navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCheck, Globe, Shield, Award, FileCheck, Building } from "lucide-react"

export default function CompliancePage() {
  return (
    <div className="min-h-screen">
      <CyberpunkNavbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold holographic">Compliance & Certifications</h1>
            <p className="text-xl text-gray-300">
              Meeting global standards for evidence management and data protection
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-cyan-400 font-mono">
              <Award className="h-4 w-4" />
              Certified | Audited | Compliant
            </div>
          </div>

          {/* Compliance Standards */}
          <div className="grid gap-6">
            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-blue-text">
                  <Globe className="h-6 w-6" />
                  International Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-300">ISO Certifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                        <Award className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">ISO 27001 - Information Security</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                        <Award className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">ISO 27017 - Cloud Security</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-blue-500/10 rounded">
                        <Award className="h-4 w-4 text-blue-400" />
                        <span className="text-sm text-gray-300">ISO 27018 - Cloud Privacy</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-blue-300">Data Protection</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">GDPR Compliant</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">CCPA Compliant</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-green-500/10 rounded">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm text-gray-300">PIPEDA Compliant</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-green">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-green-text">
                  <Building className="h-6 w-6" />
                  Law Enforcement Standards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">US Standards</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>CJIS Security Policy:</strong> FBI Criminal Justice Information Services compliance
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>FIPS 140-2:</strong> Federal cryptographic module validation
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>NIST Framework:</strong> Cybersecurity framework compliance
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-300">International</h4>
                    <ul className="text-sm text-gray-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>Interpol Standards:</strong> International police cooperation guidelines
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>EU Digital Evidence:</strong> European digital evidence regulations
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 bg-green-400 rounded-full mt-2" />
                        <span>
                          <strong>UN Standards:</strong> United Nations crime prevention protocols
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border-pink">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-pink-text">
                  <FileCheck className="h-6 w-6" />
                  Audit & Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="p-4 bg-pink-500/10 rounded-lg border border-pink-500/30">
                    <h4 className="font-semibold text-pink-300 mb-2">Third-Party Audits</h4>
                    <p className="text-gray-300 text-sm mb-3">
                      Regular security audits conducted by certified cybersecurity firms and blockchain security
                      specialists.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-pink-300 font-medium">Security Audits:</span>
                        <p className="text-gray-300">Quarterly penetration testing</p>
                      </div>
                      <div>
                        <span className="text-pink-300 font-medium">Code Reviews:</span>
                        <p className="text-gray-300">Smart contract verification</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                    <h4 className="font-semibold text-purple-300 mb-2">Continuous Monitoring</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      <li>• Real-time security monitoring</li>
                      <li>• Automated vulnerability scanning</li>
                      <li>• Blockchain integrity verification</li>
                      <li>• IPFS network health checks</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glassmorphism-card neon-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 neon-text">
                  <UserCheck className="h-6 w-6" />
                  Compliance Reporting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-300">Transparency Reports</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Annual Security Report</span>
                          <span className="text-xs text-purple-400">2024</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Compliance Assessment</span>
                          <span className="text-xs text-purple-400">Q4 2024</span>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-500/10 rounded border border-purple-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-300">Incident Response Report</span>
                          <span className="text-xs text-purple-400">Monthly</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-purple-300">Certification Status</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                        <span className="text-sm text-gray-300">SOC 2 Type II</span>
                        <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                        <span className="text-sm text-gray-300">ISO 27001</span>
                        <span className="text-xs text-green-400 font-mono">ACTIVE</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                        <span className="text-sm text-gray-300">GDPR Compliance</span>
                        <span className="text-xs text-green-400 font-mono">ACTIVE</span>
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
              <h3 className="text-xl font-semibold neon-cyan-text mb-4">Compliance Inquiries</h3>
              <p className="text-gray-300 mb-4">
                Contact our Compliance Officer for certification verification or regulatory questions
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center items-center text-sm font-mono">
                <span className="text-cyan-400">compliance@blockevid.quantum</span>
                <span className="hidden sm:block text-gray-500">|</span>
                <span className="text-cyan-400">+1-800-COMPLY-SEC</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
