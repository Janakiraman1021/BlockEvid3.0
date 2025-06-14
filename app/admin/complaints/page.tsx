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
  FileText,
  Search,
  Eye,
  UserPlus,
  Clock,
  AlertTriangle,
  CheckCircle,
  Filter,
  Download,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

export default function AdminComplaints() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [officerFilter, setOfficerFilter] = useState("all")

  const complaints = [
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      status: "investigating",
      priority: "high",
      submittedBy: "john.doe@company.com",
      assignedTo: "Officer Smith",
      submittedDate: "2025-06-10",
      lastUpdated: "2025-06-12",
      category: "security_breach",
      evidenceCount: 3,
      daysOpen: 2,
    },
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      status: "pending",
      priority: "critical",
      submittedBy: "jane.smith@company.com",
      assignedTo: "Unassigned",
      submittedDate: "2025-06-08",
      lastUpdated: "2025-06-08",
      category: "data_theft",
      evidenceCount: 0,
      daysOpen: 4,
    },
    {
      id: "C-2025-0010",
      title: "Service Disruption",
      status: "resolved",
      priority: "medium",
      submittedBy: "mike.wilson@company.com",
      assignedTo: "Officer Johnson",
      submittedDate: "2025-06-05",
      lastUpdated: "2025-06-11",
      category: "service_disruption",
      evidenceCount: 5,
      daysOpen: 7,
    },
    {
      id: "C-2025-0009",
      title: "Phishing Email Campaign",
      status: "investigating",
      priority: "high",
      submittedBy: "sarah.jones@company.com",
      assignedTo: "Officer Davis",
      submittedDate: "2025-06-03",
      lastUpdated: "2025-06-10",
      category: "security_breach",
      evidenceCount: 8,
      daysOpen: 9,
    },
    {
      id: "C-2025-0008",
      title: "Database Connection Issues",
      status: "resolved",
      priority: "low",
      submittedBy: "alex.brown@company.com",
      assignedTo: "Officer Wilson",
      submittedDate: "2025-06-01",
      lastUpdated: "2025-06-07",
      category: "service_disruption",
      evidenceCount: 3,
      daysOpen: 11,
    },
  ]

  const officers = ["Officer Smith", "Officer Johnson", "Officer Davis", "Officer Wilson"]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "investigating":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Assignment"
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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter
    const matchesOfficer = officerFilter === "all" || complaint.assignedTo === officerFilter

    return matchesSearch && matchesStatus && matchesPriority && matchesOfficer
  })

  const pendingComplaints = filteredComplaints.filter((c) => c.status === "pending")
  const activeComplaints = filteredComplaints.filter((c) => c.status === "investigating")
  const resolvedComplaints = filteredComplaints.filter((c) => c.status === "resolved")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">All Complaints</h1>
            <p className="text-muted-foreground">System-wide complaint management and oversight</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/admin/officers">
                <UserPlus className="mr-2 h-4 w-4" />
                Manage Officers
              </Link>
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{complaints.length}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingComplaints.length}</div>
              <p className="text-xs text-muted-foreground">Awaiting officer assignment</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Under Investigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeComplaints.length}</div>
              <p className="text-xs text-muted-foreground">Currently being investigated</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedComplaints.length}</div>
              <p className="text-xs text-muted-foreground">Investigation complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Priority</label>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Assigned Officer</label>
                <Select value={officerFilter} onValueChange={setOfficerFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Officers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Officers</SelectItem>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    {officers.map((officer) => (
                      <SelectItem key={officer} value={officer}>
                        {officer}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complaints Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({filteredComplaints.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingComplaints.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeComplaints.length})</TabsTrigger>
            <TabsTrigger value="resolved">Resolved ({resolvedComplaints.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="glassmorphism border-purple-500/20">
              <CardHeader>
                <CardTitle>All Complaints ({filteredComplaints.length})</CardTitle>
                <CardDescription>Complete overview of all complaints in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredComplaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="glassmorphism border-yellow-500/20">
              <CardHeader>
                <CardTitle>Pending Complaints ({pendingComplaints.length})</CardTitle>
                <CardDescription>Complaints awaiting officer assignment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingComplaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} showAssignButton />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="glassmorphism border-blue-500/20">
              <CardHeader>
                <CardTitle>Active Investigations ({activeComplaints.length})</CardTitle>
                <CardDescription>Complaints currently under investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeComplaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resolved">
            <Card className="glassmorphism border-green-500/20">
              <CardHeader>
                <CardTitle>Resolved Complaints ({resolvedComplaints.length})</CardTitle>
                <CardDescription>Complaints with completed investigations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resolvedComplaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
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

function ComplaintCard({ complaint, showAssignButton = false }: { complaint: any; showAssignButton?: boolean }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "investigating":
        return <AlertTriangle className="h-4 w-4 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pending Assignment"
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

  return (
    <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-full bg-purple-900/30">
          <FileText className="h-5 w-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{complaint.title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{complaint.id}</span>
            <span>•</span>
            <span>by {complaint.submittedBy}</span>
            <span>•</span>
            <span className="capitalize">{complaint.category.replace("_", " ")}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Submitted: {complaint.submittedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>Assigned: {complaint.assignedTo}</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>{complaint.evidenceCount} evidence files</span>
            </div>
            <span>{complaint.daysOpen} days open</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <div className={`h-2 w-2 rounded-full ${getPriorityClass(complaint.priority)}`} />
            <Badge variant="outline" className="capitalize text-xs">
              {complaint.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {getStatusIcon(complaint.status)}
            <span>{getStatusText(complaint.status)}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {showAssignButton && (
            <Button size="sm" variant="outline">
              <UserPlus className="h-4 w-4 mr-1" />
              Assign
            </Button>
          )}
          <Button size="sm" variant="outline" asChild>
            <Link href={`/admin/complaint/${complaint.id}`}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
