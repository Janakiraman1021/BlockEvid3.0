"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"

export default function ComplaintDetails() {
  const params = useParams()
  const router = useRouter()
  const { userRole } = useWeb3()
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Mock complaint data - in real app, fetch from API
  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockComplaint = {
        id: params.id,
        title: "Unauthorized Access Attempt",
        description:
          "Multiple failed login attempts detected from suspicious IP addresses targeting our secure database systems. The attempts occurred during off-hours and used various credential combinations.",
        category: "security_breach",
        priority: "high",
        status: "investigating",
        submittedBy: "john.doe@company.com",
        assignedTo: "Officer Smith",
        submittedDate: "2025-06-10T10:30:00Z",
        lastUpdated: "2025-06-12T14:20:00Z",
        unlockDate: "2025-06-20T00:00:00Z",
        location: "Data Center - Building A",
        incidentDate: "2025-06-09",
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
      }

      setComplaint(mockComplaint)
      setLoading(false)
    }

    fetchComplaint()
  }, [params.id, userRole])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "investigating":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Review"
      case "investigating":
        return "Under Investigation"
      case "resolved":
        return "Resolved"
      default:
        return "Unknown"
    }
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

  if (!complaint) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Complaint not found</h2>
          <p className="text-muted-foreground mt-2">The complaint you're looking for doesn't exist.</p>
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
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Complaint Details</h1>
        </div>

        <div className="grid gap-6">
          {/* Header Card */}
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">{complaint.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <span>{complaint.id}</span>
                    <span>•</span>
                    <span>Submitted by {complaint.submittedBy}</span>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${getPriorityClass(complaint.priority)}`} />
                  <Badge variant="outline" className="capitalize">
                    {complaint.priority}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(complaint.status)}
                    <span className="text-sm">{getStatusText(complaint.status)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Submitted</p>
                    <p className="text-xs text-muted-foreground">{formatDate(complaint.submittedDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-xs text-muted-foreground">{complaint.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-xs text-muted-foreground">{complaint.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-xs text-muted-foreground">{formatDate(complaint.lastUpdated)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <Tabs defaultValue="details" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="glassmorphism border-purple-500/20">
                <CardHeader>
                  <CardTitle>Complaint Description</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm leading-relaxed">{complaint.description}</p>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium mb-2">Incident Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span className="capitalize">{complaint.category.replace("_", " ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Incident Date:</span>
                          <span>{complaint.incidentDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Priority:</span>
                          <span className="capitalize">{complaint.priority}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Case Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Investigation Progress</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Evidence collection in progress. Unlock date: {formatDate(complaint.unlockDate)}
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
                    {complaint.timeline.map((event: any, index: number) => (
                      <div key={event.id} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="p-2 rounded-full bg-purple-950/30 border border-purple-500/30">
                            {getTimelineIcon(event.type)}
                          </div>
                          {index < complaint.timeline.length - 1 && <div className="w-px h-12 bg-purple-500/30 mt-2" />}
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
                        {complaint.evidence.length} files uploaded •
                        {getDaysUntilUnlock(complaint.unlockDate) > 0
                          ? ` Unlock in ${getDaysUntilUnlock(complaint.unlockDate)} days`
                          : " Evidence unlocked"}
                      </CardDescription>
                    </div>
                    {(userRole === "officer" || userRole === "admin") && (
                      <Button size="sm" asChild>
                        <Link href={`/officer/case/${complaint.id}/evidence`}>
                          <Upload className="h-4 w-4 mr-1" />
                          Upload Evidence
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {complaint.evidence.map((file: any) => (
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
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  )
}
