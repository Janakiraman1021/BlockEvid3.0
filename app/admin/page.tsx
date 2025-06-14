"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Shield, TrendingUp, Eye, UserPlus, Settings } from "lucide-react"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
  const [stats] = useState({
    totalComplaints: 45,
    activeOfficers: 12,
    totalUsers: 234,
    resolvedThisMonth: 18,
  })

  const recentActivity = [
    {
      id: "1",
      type: "complaint",
      title: "New complaint filed: Data Breach Report",
      user: "user@example.com",
      timestamp: "2 minutes ago",
      status: "new",
    },
    {
      id: "2",
      type: "evidence",
      title: "Evidence uploaded for case C-2025-0012",
      user: "officer.smith@dept.gov",
      timestamp: "15 minutes ago",
      status: "updated",
    },
    {
      id: "3",
      type: "assignment",
      title: "Case C-2025-0011 assigned to Officer Johnson",
      user: "admin@dept.gov",
      timestamp: "1 hour ago",
      status: "assigned",
    },
    {
      id: "4",
      type: "resolution",
      title: "Case C-2025-0008 marked as resolved",
      user: "officer.davis@dept.gov",
      timestamp: "3 hours ago",
      status: "resolved",
    },
  ]

  const criticalCases = [
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      priority: "critical",
      assignedTo: "Officer Johnson",
      daysOpen: 3,
      status: "investigating",
    },
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      priority: "high",
      assignedTo: "Officer Smith",
      daysOpen: 2,
      status: "investigating",
    },
    {
      id: "C-2025-0013",
      title: "Service Disruption",
      priority: "high",
      assignedTo: "Unassigned",
      daysOpen: 1,
      status: "pending",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "complaint":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "evidence":
        return <Shield className="h-4 w-4 text-green-500" />
      case "assignment":
        return <Users className="h-4 w-4 text-purple-500" />
      case "resolution":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500/20 text-blue-300">New</Badge>
      case "updated":
        return <Badge className="bg-green-500/20 text-green-300">Updated</Badge>
      case "assigned":
        return <Badge className="bg-purple-500/20 text-purple-300">Assigned</Badge>
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-300">Resolved</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
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
            <h1 className="text-2xl font-bold tracking-tight neon-text">Admin Dashboard</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/officers">
                <UserPlus className="mr-2 h-4 w-4" />
                Manage Officers
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalComplaints}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOfficers}</div>
              <p className="text-xs text-muted-foreground">Currently investigating</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.resolvedThisMonth}</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader>
              <CardTitle>Critical Cases</CardTitle>
              <CardDescription>High priority cases requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {criticalCases.map((case_) => (
                <div
                  key={case_.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${getPriorityClass(case_.priority)}`} />
                    <div>
                      <h4 className="font-medium text-sm">{case_.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {case_.id} • {case_.assignedTo} • {case_.daysOpen} days open
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/admin/complaint/${case_.id}`}>
                      <Eye className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/complaints">View All Complaints</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-purple-500/20">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activity and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-black/20 border border-white/5"
                >
                  <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                      <span className="text-xs text-muted-foreground">•</span>
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                    </div>
                  </div>
                  {getStatusBadge(activity.status)}
                </div>
              ))}
              <Button variant="outline" className="w-full" asChild>
                <Link href="/admin/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Key metrics and performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Case Resolution Rate</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Officer Utilization</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm text-muted-foreground">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
