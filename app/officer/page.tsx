"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, AlertTriangle, CheckCircle, Shield, Upload, Eye } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function OfficerDashboard() {
  const [stats] = useState({
    assigned: 8,
    pending: 3,
    investigating: 4,
    completed: 1,
  })

  const assignedCases = [
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      status: "investigating",
      priority: "high",
      assignedDate: "2025-06-10",
      unlockDate: "2025-06-20",
      evidenceCount: 3,
    },
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      status: "pending",
      priority: "critical",
      assignedDate: "2025-06-08",
      unlockDate: "2025-06-25",
      evidenceCount: 0,
    },
    {
      id: "C-2025-0009",
      title: "Service Disruption",
      status: "investigating",
      priority: "medium",
      assignedDate: "2025-06-05",
      unlockDate: "2025-06-15",
      evidenceCount: 5,
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "investigating":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Investigation"
      case "investigating":
        return "Under Investigation"
      case "completed":
        return "Investigation Complete"
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

  const getDaysUntilUnlock = (unlockDate: string) => {
    const today = new Date()
    const unlock = new Date(unlockDate)
    const diffTime = unlock.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Officer Dashboard</h1>
            <p className="text-muted-foreground">Investigate cases and manage evidence</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/officer/evidence">
                <Shield className="mr-2 h-4 w-4" />
                Evidence Vault
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Assigned Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assigned}</div>
              <Progress value={100} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <Progress
                value={(stats.pending / stats.assigned) * 100}
                className="h-1 mt-2 bg-muted [&>div]:bg-yellow-500"
              />
            </CardContent>
          </Card>

          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Investigating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.investigating}</div>
              <Progress
                value={(stats.investigating / stats.assigned) * 100}
                className="h-1 mt-2 bg-muted [&>div]:bg-blue-500"
              />
            </CardContent>
          </Card>

          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completed}</div>
              <Progress
                value={(stats.completed / stats.assigned) * 100}
                className="h-1 mt-2 bg-muted [&>div]:bg-green-500"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle>Assigned Cases</CardTitle>
            <CardDescription>Cases assigned to you for investigation</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All Cases</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {assignedCases.map((case_) => (
                  <div
                    key={case_.id}
                    className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-purple-900/30">
                        <FileText className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">{case_.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{case_.id}</span>
                          <span>•</span>
                          <span>Assigned: {case_.assignedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium">Unlock in {getDaysUntilUnlock(case_.unlockDate)} days</div>
                        <div className="text-xs text-muted-foreground">{case_.evidenceCount} evidence files</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${getPriorityClass(case_.priority)}`} />
                        <div className="flex items-center gap-1 text-sm">
                          {getStatusIcon(case_.status)}
                          <span>{getStatusText(case_.status)}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link href={`/officer/case/${case_.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/officer/case/${case_.id}/evidence`}>
                            <Upload className="h-4 w-4 mr-1" />
                            Evidence
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {assignedCases
                  .filter((c) => c.status === "pending")
                  .map((case_) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-purple-900/30">
                          <FileText className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{case_.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{case_.id}</span>
                            <span>•</span>
                            <span>Assigned: {case_.assignedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300">
                          Urgent
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/officer/case/${case_.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/officer/case/${case_.id}/evidence`}>
                              <Upload className="h-4 w-4 mr-1" />
                              Start Investigation
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                {assignedCases
                  .filter((c) => c.status === "investigating")
                  .map((case_) => (
                    <div
                      key={case_.id}
                      className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-purple-900/30">
                          <FileText className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{case_.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{case_.id}</span>
                            <span>•</span>
                            <span>Assigned: {case_.assignedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{case_.evidenceCount} evidence files</div>
                          <div className="text-xs text-muted-foreground">
                            Unlock in {getDaysUntilUnlock(case_.unlockDate)} days
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/officer/case/${case_.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/officer/case/${case_.id}/evidence`}>
                              <Upload className="h-4 w-4 mr-1" />
                              Evidence
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
