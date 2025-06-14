"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useWeb3 } from "@/components/web3-provider"
import {
  ArrowLeft,
  FileText,
  Clock,
  User,
  MapPin,
  Calendar,
  Download,
  Upload,
  Shield,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
  BarChart,
  MessageSquare,
  History,
  Archive,
} from "lucide-react"
import Link from "next/link"

// Case status options with their properties
const caseStatusOptions = [
  {
    value: "not_started",
    label: "Not Started",
    color: "bg-gray-500",
    icon: <Clock className="h-4 w-4 text-gray-500" />,
  },
  {
    value: "starting_soon",
    label: "Starting Soon",
    color: "bg-purple-500",
    icon: <Clock className="h-4 w-4 text-purple-500" />,
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "bg-blue-500",
    icon: <AlertCircle className="h-4 w-4 text-blue-500" />,
  },
  {
    value: "ongoing",
    label: "Ongoing Investigation",
    color: "bg-yellow-500",
    icon: <Shield className="h-4 w-4 text-yellow-500" />,
  },
  {
    value: "evidence_collection",
    label: "Evidence Collection",
    color: "bg-indigo-500",
    icon: <Upload className="h-4 w-4 text-indigo-500" />,
  },
  { value: "review", label: "Under Review", color: "bg-orange-500", icon: <Eye className="h-4 w-4 text-orange-500" /> },
  {
    value: "pending_approval",
    label: "Pending Approval",
    color: "bg-amber-500",
    icon: <Clock className="h-4 w-4 text-amber-500" />,
  },
  {
    value: "completed",
    label: "Completed",
    color: "bg-green-500",
    icon: <CheckCircle className="h-4 w-4 text-green-500" />,
  },
  { value: "archived", label: "Archived", color: "bg-slate-500", icon: <Archive className="h-4 w-4 text-slate-500" /> },
]

export default function CaseDetails() {
  const params = useParams()
  const router = useRouter()
  const { userRole } = useWeb3()
  const [caseData, setCaseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [caseStatus, setCaseStatus] = useState("ongoing")

  // Mock case data - in real app, fetch from API
  useEffect(() => {
    const fetchCase = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockCase = {
        id: params.id,
        title: "Unauthorized Access Attempt",
        description:
          "Multiple failed login attempts detected from suspicious IP addresses targeting our secure database systems. The attempts occurred during off-hours and used various credential combinations.",
        category: "security_breach",
        priority: "high",
        status: "ongoing",
        submittedBy: "john.doe@company.com",
        assignedTo: "Officer Smith",
        submittedDate: "2025-06-10T10:30:00Z",
        lastUpdated: "2025-06-12T14:20:00Z",
        unlockDate: "2025-06-20T00:00:00Z",
        location: "Data Center - Building A",
        incidentDate: "2025-06-09",
        progress: 65,
        timeline: [
          {
            id: 1,
            timestamp: "2025-06-10T10:30:00Z",
            action: "Complaint Submitted",
            actor: "john.doe@company.com",
            description: "Initial complaint filed with evidence attachments",
            type: "submission",
          },
          {
            id: 2,
            timestamp: "2025-06-10T11:15:00Z",
            action: "Case Assigned",
            actor: "Admin System",
            description: "Case assigned to Officer Smith for investigation",
            type: "assignment",
          },
          {
            id: 3,
            timestamp: "2025-06-11T09:00:00Z",
            action: "Investigation Started",
            actor: "Officer Smith",
            description: "Initial investigation commenced, evidence review in progress",
            type: "investigation",
          },
          {
            id: 4,
            timestamp: "2025-06-12T14:20:00Z",
            action: "Evidence Uploaded",
            actor: "Officer Smith",
            description: "Additional forensic evidence and analysis reports uploaded",
            type: "evidence",
          },
        ],
        evidence: [
          {
            id: 1,
            name: "security_logs.pdf",
            type: "document",
            size: "2.4 MB",
            uploadedBy: "john.doe@company.com",
            uploadedAt: "2025-06-10T10:30:00Z",
            hash: "QmX7Y8Z9...",
            accessible: true,
          },
          {
            id: 2,
            name: "network_analysis.json",
            type: "data",
            size: "856 KB",
            uploadedBy: "Officer Smith",
            uploadedAt: "2025-06-12T14:20:00Z",
            hash: "QmA1B2C3...",
            accessible: userRole === "officer" || userRole === "admin",
          },
          {
            id: 3,
            name: "forensic_report.pdf",
            type: "document",
            size: "5.2 MB",
            uploadedBy: "Officer Smith",
            uploadedAt: "2025-06-12T14:20:00Z",
            hash: "QmD4E5F6...",
            accessible: false,
            unlockDate: "2025-06-20T00:00:00Z",
          },
        ],
        notes: [
          {
            id: 1,
            content:
              "Initial investigation reveals multiple failed login attempts from IP addresses in Eastern Europe.",
            createdBy: "Officer Smith",
            createdAt: "2025-06-11T10:00:00Z",
          },
          {
            id: 2,
            content: "Forensic analysis of logs shows pattern consistent with automated credential stuffing attack.",
            createdBy: "Officer Smith",
            createdAt: "2025-06-12T15:30:00Z",
          },
        ],
      }

      setCaseData(mockCase)
      setCaseStatus(mockCase.status)
      setLoading(false)
    }

    fetchCase()
  }, [params.id, userRole])

  const handleStatusChange = (newStatus: string) => {
    setCaseStatus(newStatus)
    // In a real app, you would update the status in the database
    setCaseData((prev: any) => ({ ...prev, status: newStatus }))
  }

  const getStatusInfo = (status: string) => {
    return caseStatusOptions.find((option) => option.value === status) || caseStatusOptions[0]
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-gray-500"
      case "medium":
        return "bg-blue-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case "submission":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "assignment":
        return <User className="h-4 w-4 text-purple-500" />
      case "investigation":
        return <Shield className="h-4 w-4 text-orange-500" />
      case "evidence":
        return <Upload className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="h-8 w-48 bg-purple-950/20 rounded animate-pulse" />
          </div>
          <div className="grid gap-6">
            <div className="h-64 bg-purple-950/20 rounded-lg animate-pulse" />
            <div className="h-96 bg-purple-950/20 rounded-lg animate-pulse" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!caseData) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Case not found</h2>
          <p className="text-muted-foreground mt-2">The case you're looking for doesn't exist.</p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Case Details</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/officer/cases`}>
                <BarChart className="h-4 w-4 mr-1" />
                All Cases
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/officer/case/${caseData.id}/evidence`}>
                <Upload className="h-4 w-4 mr-1" />
                Upload Evidence
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{caseData.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>{caseData.id}</span>
                    <span>•</span>
                    <span>Submitted by {caseData.submittedBy}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${getPriorityClass(caseData.priority)}`} />
                  <Badge variant="outline" className="capitalize">
                    {caseData.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-muted-foreground">{formatDate(caseData.submittedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">{caseData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-xs text-muted-foreground">{caseData.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{formatDate(caseData.lastUpdated)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4">
              <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  {getStatusInfo(caseStatus).icon}
                  <span className="text-sm font-medium">Status: {getStatusInfo(caseStatus).label}</span>
                </div>
                <Select value={caseStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseStatusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${option.color}`} />
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="glassmorphism border-purple-500/20">
                <CardHeader>
                  <CardTitle>Case Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{caseData.description}</p>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Incident Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="capitalize">{caseData.category.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Incident Date:</span>
                          <span>{caseData.incidentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <span className="capitalize">{caseData.priority}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <span className="capitalize">{getStatusInfo(caseStatus).label}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Case Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Investigation Progress</span>
                          <span>{caseData.progress}%</span>
                        </div>
                        <Progress value={caseData.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Evidence collection in progress. Unlock date: {formatDate(caseData.unlockDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card className="glassmorphism border-purple-500/20">
                <CardHeader>
                  <CardTitle>Case Timeline</CardTitle>
                  <CardDescription>Complete history of actions and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.timeline.map((event: any, index: number) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 rounded-full bg-purple-950/30 border border-purple-500/30">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index < caseData.timeline.length - 1 && <div className="w-px h-12 bg-purple-500/30 mt-2" />}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{event.action}</h4>
                            <span className="text-xs text-muted-foreground">{formatDate(event.timestamp)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">{event.description}</p>
                          <p className="text-xs text-purple-400">by {event.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evidence">
              <Card className="glassmorphism border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Evidence Files</CardTitle>
                      <CardDescription>
                        {caseData.evidence.length} files uploaded •
                        {getDaysUntilUnlock(caseData.unlockDate) > 0
                          ? ` Unlock in ${getDaysUntilUnlock(caseData.unlockDate)} days`
                          : " Evidence unlocked"}
                      </CardDescription>
                    </div>
                    {(userRole === "officer" || userRole === "admin") && (
                      <Button size="sm" asChild>
                        <Link href={`/officer/case/${caseData.id}/evidence`}>
                          <Upload className="h-4 w-4 mr-1" />
                          Upload Evidence
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {caseData.evidence.map((file: any) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded bg-purple-950/30">
                            <FileText className="h-4 w-4 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-sm">{file.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>by {file.uploadedBy}</span>
                              <span>•</span>
                              <span>{formatDate(file.uploadedAt)}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!file.accessible && file.unlockDate && (
                            <Badge variant="outline" className="text-xs">
                              Locked until {new Date(file.unlockDate).toLocaleDateString()}
                            </Badge>
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
                              <Clock className="h-3 w-3 mr-1" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card className="glassmorphism border-purple-500/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Investigation Notes</CardTitle>
                      <CardDescription>Officer notes and findings</CardDescription>
                    </div>
                    <Button size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Add Note
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {caseData.notes.map((note: any) => (
                      <div key={note.id} className="p-4 rounded-lg bg-black/20 border border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4 text-purple-400" />
                            <span className="font-medium">{note.createdBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <History className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</span>
                          </div>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
