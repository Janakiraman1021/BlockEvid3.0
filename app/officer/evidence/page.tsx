"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Eye,
  FileText,
  ImageIcon,
  Video,
  Archive,
  Lock,
  Calendar,
  User,
  FileAudioIcon as Audio,
} from "lucide-react"

export default function EvidenceVault() {
  const [searchTerm, setSearchTerm] = useState("")
  const [caseFilter, setCaseFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const evidenceFiles = [
    {
      id: 1,
      name: "security_logs.pdf",
      type: "document",
      size: "2.4 MB",
      caseId: "C-2025-0012",
      caseTitle: "Unauthorized Access Attempt",
      uploadedBy: "john.doe@company.com",
      uploadedAt: "2025-06-10T10:30:00Z",
      hash: "QmX7Y8Z9A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0",
      accessible: true,
      unlockDate: null,
      category: "initial_evidence",
    },
    {
      id: 2,
      name: "network_analysis.json",
      type: "data",
      size: "856 KB",
      caseId: "C-2025-0012",
      caseTitle: "Unauthorized Access Attempt",
      uploadedBy: "Officer Smith",
      uploadedAt: "2025-06-12T14:20:00Z",
      hash: "QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3",
      accessible: true,
      unlockDate: null,
      category: "investigation_data",
    },
    {
      id: 3,
      name: "forensic_report.pdf",
      type: "document",
      size: "5.2 MB",
      caseId: "C-2025-0012",
      caseTitle: "Unauthorized Access Attempt",
      uploadedBy: "Officer Smith",
      uploadedAt: "2025-06-12T14:20:00Z",
      hash: "QmD4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6",
      accessible: false,
      unlockDate: "2025-06-20T00:00:00Z",
      category: "final_report",
    },
    {
      id: 4,
      name: "surveillance_footage.mp4",
      type: "video",
      size: "125 MB",
      caseId: "C-2025-0011",
      caseTitle: "Data Breach Report",
      uploadedBy: "Officer Johnson",
      uploadedAt: "2025-06-11T16:45:00Z",
      hash: "QmE5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7",
      accessible: true,
      unlockDate: null,
      category: "surveillance",
    },
    {
      id: 5,
      name: "email_headers.txt",
      type: "data",
      size: "45 KB",
      caseId: "C-2025-0009",
      caseTitle: "Phishing Email Campaign",
      uploadedBy: "Officer Davis",
      uploadedAt: "2025-06-08T11:30:00Z",
      hash: "QmF6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8",
      accessible: true,
      unlockDate: null,
      category: "digital_evidence",
    },
    {
      id: 6,
      name: "database_backup.zip",
      type: "data",
      size: "89 MB",
      caseId: "C-2025-0012",
      caseTitle: "Unauthorized Access Attempt",
      uploadedBy: "Officer Smith",
      uploadedAt: "2025-06-12T15:30:00Z",
      hash: "QmG7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9",
      accessible: true,
      unlockDate: null,
      category: "investigation_data",
    },
    {
      id: 7,
      name: "suspect_photos.zip",
      type: "image",
      size: "23 MB",
      caseId: "C-2025-0011",
      caseTitle: "Data Breach Report",
      uploadedBy: "Officer Johnson",
      uploadedAt: "2025-06-11T17:00:00Z",
      hash: "QmH8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0",
      accessible: true,
      unlockDate: null,
      category: "surveillance",
    },
    {
      id: 8,
      name: "interview_recording.mp3",
      type: "audio",
      size: "12 MB",
      caseId: "C-2025-0009",
      caseTitle: "Phishing Email Campaign",
      uploadedBy: "Officer Davis",
      uploadedAt: "2025-06-08T12:15:00Z",
      hash: "QmI9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1",
      accessible: true,
      unlockDate: null,
      category: "witness_statement",
    },
  ]

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-400" />
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-400" />
      case "video":
        return <Video className="h-5 w-5 text-purple-400" />
      case "data":
        return <Archive className="h-5 w-5 text-orange-400" />
      case "audio":
        return <Audio className="h-5 w-5 text-yellow-400" />
      default:
        return <FileText className="h-5 w-5 text-gray-400" />
    }
  }

  const getCategoryBadge = (category: string) => {
    const categoryMap: { [key: string]: { label: string; className: string } } = {
      initial_evidence: { label: "Initial Evidence", className: "bg-blue-500/20 text-blue-300" },
      investigation_data: { label: "Investigation Data", className: "bg-purple-500/20 text-purple-300" },
      final_report: { label: "Final Report", className: "bg-green-500/20 text-green-300" },
      surveillance: { label: "Surveillance", className: "bg-orange-500/20 text-orange-300" },
      digital_evidence: { label: "Digital Evidence", className: "bg-pink-500/20 text-pink-300" },
    }

    const config = categoryMap[category] || { label: category, className: "bg-gray-500/20 text-gray-300" }

    return <Badge className={config.className}>{config.label}</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getDaysUntilUnlock = (unlockDate: string) => {
    const today = new Date()
    const unlock = new Date(unlockDate)
    const diffTime = unlock.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const filteredEvidence = evidenceFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.caseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCase = caseFilter === "all" || file.caseId === caseFilter
    const matchesType = typeFilter === "all" || file.type === typeFilter

    return matchesSearch && matchesCase && matchesType
  })

  const accessibleFiles = filteredEvidence.filter((f) => f.accessible)
  const lockedFiles = filteredEvidence.filter((f) => !f.accessible)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Evidence Vault</h1>
            <p className="text-muted-foreground">Secure storage and management of case evidence</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-green-500/20 text-green-300">{accessibleFiles.length} Accessible</Badge>
            <Badge className="bg-red-500/20 text-red-300">{lockedFiles.length} Locked</Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{evidenceFiles.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Accessible</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accessibleFiles.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-red-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Time-Locked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lockedFiles.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">134 MB</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-orange-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">File Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Documents</span>
                  <span>{evidenceFiles.filter((f) => f.type === "document").length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Images</span>
                  <span>{evidenceFiles.filter((f) => f.type === "image").length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Videos</span>
                  <span>{evidenceFiles.filter((f) => f.type === "video").length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Data</span>
                  <span>{evidenceFiles.filter((f) => f.type === "data").length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glassmorphism border-purple-500/20">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search evidence files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={caseFilter} onValueChange={setCaseFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by case" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cases</SelectItem>
                  <SelectItem value="C-2025-0012">C-2025-0012</SelectItem>
                  <SelectItem value="C-2025-0011">C-2025-0011</SelectItem>
                  <SelectItem value="C-2025-0009">C-2025-0009</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="data">Data Files</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Evidence Files */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Files ({filteredEvidence.length})</TabsTrigger>
            <TabsTrigger value="accessible">Accessible ({accessibleFiles.length})</TabsTrigger>
            <TabsTrigger value="locked">Time-Locked ({lockedFiles.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="glassmorphism border-purple-500/20">
              <CardHeader>
                <CardTitle>All Evidence Files</CardTitle>
                <CardDescription>Complete evidence repository across all cases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredEvidence.map((file) => (
                    <EvidenceFileCard
                      key={file.id}
                      file={file}
                      getFileIcon={getFileIcon}
                      getCategoryBadge={getCategoryBadge}
                      formatDate={formatDate}
                      getDaysUntilUnlock={getDaysUntilUnlock}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="accessible">
            <Card className="glassmorphism border-green-500/20">
              <CardHeader>
                <CardTitle>Accessible Files</CardTitle>
                <CardDescription>Evidence files available for immediate access</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {accessibleFiles.map((file) => (
                    <EvidenceFileCard
                      key={file.id}
                      file={file}
                      getFileIcon={getFileIcon}
                      getCategoryBadge={getCategoryBadge}
                      formatDate={formatDate}
                      getDaysUntilUnlock={getDaysUntilUnlock}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="locked">
            <Card className="glassmorphism border-red-500/20">
              <CardHeader>
                <CardTitle>Time-Locked Files</CardTitle>
                <CardDescription>Evidence files with time-based access restrictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lockedFiles.map((file) => (
                    <EvidenceFileCard
                      key={file.id}
                      file={file}
                      getFileIcon={getFileIcon}
                      getCategoryBadge={getCategoryBadge}
                      formatDate={formatDate}
                      getDaysUntilUnlock={getDaysUntilUnlock}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function EvidenceFileCard({
  file,
  getFileIcon,
  getCategoryBadge,
  formatDate,
  getDaysUntilUnlock,
}: { file: any; getFileIcon: any; getCategoryBadge: any; formatDate: any; getDaysUntilUnlock: any }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-purple-900/30">{getFileIcon(file.type)}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-sm">{file.name}</h4>
            {getCategoryBadge(file.category)}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{file.size}</span>
            <span>•</span>
            <span>{file.caseId}</span>
            <span>•</span>
            <span>{file.caseTitle}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <User className="h-3 w-3" />
            <span>by {file.uploadedBy}</span>
            <span>•</span>
            <Calendar className="h-3 w-3" />
            <span>{formatDate(file.uploadedAt)}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-mono">IPFS: {file.hash.substring(0, 20)}...</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!file.accessible && file.unlockDate && (
          <div className="text-right">
            <Badge variant="outline" className="text-xs mb-1">
              <Lock className="h-3 w-3 mr-1" />
              Locked
            </Badge>
            <div className="text-xs text-muted-foreground">Unlock in {getDaysUntilUnlock(file.unlockDate)} days</div>
          </div>
        )}
        {file.accessible ? (
          <div className="flex gap-1">
            <Button size="sm" variant="outline">
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" disabled>
            <Lock className="h-3 w-3 mr-1" />
            Locked
          </Button>
        )}
      </div>
    </div>
  )
}
