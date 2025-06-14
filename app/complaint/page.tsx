"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { useRouter } from "next/navigation"

export default function ComplaintDashboard() {
  const router = useRouter()
  const [stats] = useState({
    total: 5,
    pending: 2,
    inProgress: 2,
    resolved: 1,
  })

  const recentComplaints = [
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      status: "in-progress",
      date: "2025-06-10",
      priority: "high",
    },
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      status: "pending",
      date: "2025-06-08",
      priority: "critical",
    },
    {
      id: "C-2025-0010",
      title: "Service Disruption",
      status: "resolved",
      date: "2025-06-05",
      priority: "medium",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "in-progress":
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
      case "in-progress":
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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">User Dashboard</h1>
            <p className="text-muted-foreground">Manage and track your complaints</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            onClick={() => router.push("/complaint/new")}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Complaint
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <Progress value={100} className="h-1 mt-2" />
            </CardContent>
          </Card>

          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pending}</div>
              <Progress
                value={(stats.pending / stats.total) * 100}
                className="h-1 mt-2 bg-muted [&>div]:bg-yellow-500"
              />
            </CardContent>
          </Card>

          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolved}</div>
              <Progress
                value={(stats.resolved / stats.total) * 100}
                className="h-1 mt-2 bg-muted [&>div]:bg-green-500"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle>Recent Complaints</CardTitle>
            <CardDescription>View and manage your recently filed complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <Link key={complaint.id} href={`/complaint/${complaint.id}`} className="block">
                    <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-purple-900/30">
                          <FileText className="h-5 w-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{complaint.title}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{complaint.id}</span>
                            <span>•</span>
                            <span>{complaint.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${getPriorityClass(complaint.priority)}`} />
                        <div className="flex items-center gap-1 text-sm">
                          {getStatusIcon(complaint.status)}
                          <span>{getStatusText(complaint.status)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="text-center mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/complaint/list">View All Complaints</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-4">
                {recentComplaints
                  .filter((c) => c.status === "pending" || c.status === "in-progress")
                  .map((complaint) => (
                    <Link key={complaint.id} href={`/complaint/${complaint.id}`} className="block">
                      <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-purple-900/30">
                            <FileText className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{complaint.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{complaint.id}</span>
                              <span>•</span>
                              <span>{complaint.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${getPriorityClass(complaint.priority)}`} />
                          <div className="flex items-center gap-1 text-sm">
                            {getStatusIcon(complaint.status)}
                            <span>{getStatusText(complaint.status)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-4">
                {recentComplaints
                  .filter((c) => c.status === "resolved")
                  .map((complaint) => (
                    <Link key={complaint.id} href={`/complaint/${complaint.id}`} className="block">
                      <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-full bg-purple-900/30">
                            <FileText className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="font-medium">{complaint.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{complaint.id}</span>
                              <span>•</span>
                              <span>{complaint.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${getPriorityClass(complaint.priority)}`} />
                          <div className="flex items-center gap-1 text-sm">
                            {getStatusIcon(complaint.status)}
                            <span>{getStatusText(complaint.status)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
