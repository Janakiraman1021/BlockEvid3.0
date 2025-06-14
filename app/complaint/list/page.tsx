"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, Plus, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ComplaintList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const complaints = [
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      status: "investigating",
      priority: "high",
      date: "2025-06-10",
      category: "security_breach",
      assignedTo: "Officer Smith",
    },
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      status: "pending",
      priority: "critical",
      date: "2025-06-08",
      category: "data_theft",
      assignedTo: "Unassigned",
    },
    {
      id: "C-2025-0010",
      title: "Service Disruption",
      status: "resolved",
      priority: "medium",
      date: "2025-06-05",
      category: "service_disruption",
      assignedTo: "Officer Johnson",
    },
    {
      id: "C-2025-0009",
      title: "Phishing Email Campaign",
      status: "investigating",
      priority: "high",
      date: "2025-06-03",
      category: "security_breach",
      assignedTo: "Officer Davis",
    },
    {
      id: "C-2025-0008",
      title: "Database Connection Issues",
      status: "resolved",
      priority: "low",
      date: "2025-06-01",
      category: "service_disruption",
      assignedTo: "Officer Wilson",
    },
  ]

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

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">My Complaints</h1>
            <p className="text-muted-foreground">View and manage all your submitted complaints</p>
          </div>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
            asChild
          >
            <Link href="/complaint/new">
              <Plus className="mr-2 h-4 w-4" />
              New Complaint
            </Link>
          </Button>
        </div>

        {/* Filters */}
        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by priority" />
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
          </CardContent>
        </Card>

        {/* Complaints List */}
        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle>Complaints ({filteredComplaints.length})</CardTitle>
            <CardDescription>
              {filteredComplaints.length === complaints.length
                ? "Showing all complaints"
                : `Showing ${filteredComplaints.length} of ${complaints.length} complaints`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredComplaints.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No complaints found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                filteredComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors"
                  >
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
                          <span>•</span>
                          <span className="capitalize">{complaint.category.replace("_", " ")}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span>Assigned to: {complaint.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${getPriorityClass(complaint.priority)}`} />
                        <Badge variant="outline" className="capitalize text-xs">
                          {complaint.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        {getStatusIcon(complaint.status)}
                        <span>{getStatusText(complaint.status)}</span>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/complaint/${complaint.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
