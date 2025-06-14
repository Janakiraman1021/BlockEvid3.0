"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Eye, Upload, Clock, CheckCircle, Calendar, Shield, Archive, AlertCircle } from "lucide-react"
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

export default function OfficerCases() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const cases = [
    {
      id: "C-2025-0012",
      title: "Unauthorized Access Attempt",
      status: "ongoing",
      priority: "high",
      assignedDate: "2025-06-10",
      unlockDate: "2025-06-20",
      submittedBy: "john.doe@company.com",
      evidenceCount: 3,
      category: "security_breach",
      daysOpen: 2,
    },
    {
      id: "C-2025-0011",
      title: "Data Breach Report",
      status: "not_started",
      priority: "critical",
      assignedDate: "2025-06-08",
      unlockDate: "2025-06-25",
      submittedBy: "jane.smith@company.com",
      evidenceCount: 0,
      category: "data_theft",
      daysOpen: 4,
    },
    {
      id: "C-2025-0009",
      title: "Service Disruption",
      status: "evidence_collection",
      priority: "medium",
      assignedDate: "2025-06-05",
      unlockDate: "2025-06-15",
      submittedBy: "mike.wilson@company.com",
      evidenceCount: 5,
      category: "service_disruption",
      daysOpen: 7,
    },
    {
      id: "C-2025-0007",
      title: "Phishing Email Campaign",
      status: "completed",
      priority: "high",
      assignedDate: "2025-06-01",
      unlockDate: "2025-06-10",
      submittedBy: "sarah.jones@company.com",
      evidenceCount: 8,
      category: "security_breach",
      daysOpen: 11,
    },
    {
      id: "C-2025-0006",
      title: "Database Configuration Issue",
      status: "review",
      priority: "medium",
      assignedDate: "2025-05-28",
      unlockDate: "2025-06-15",
      submittedBy: "alex.brown@company.com",
      evidenceCount: 4,
      category: "configuration",
      daysOpen: 15,
    },
    {
      id: "C-2025-0005",
      title: "Network Intrusion Detection",
      status: "pending_approval",
      priority: "critical",
      assignedDate: "2025-05-25",
      unlockDate: "2025-06-10",
      submittedBy: "lisa.green@company.com",
      evidenceCount: 12,
      category: "security_breach",
      daysOpen: 18,
    },
    {
      id: "C-2025-0003",
      title: "User Authentication Failure",
      status: "starting_soon",
      priority: "low",
      assignedDate: "2025-05-20",
      unlockDate: "2025-06-05",
      submittedBy: "david.white@company.com",
      evidenceCount: 2,
      category: "authentication",
      daysOpen: 23,
    },
  ]

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

  const getDaysUntilUnlock = (unlockDate: string) => {
    const today = new Date()
    const unlock = new Date(unlockDate)
    const diffTime = unlock.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const filteredCases = cases.filter((case_) => {
    const matchesSearch =
      case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const notStartedCases = filteredCases.filter((c) => c.status === "not_started" || c.status === "starting_soon")
  const activeCases = filteredCases.filter(
    (c) =>
      c.status === "ongoing" ||
      c.status === "in_progress" ||
      c.status === "evidence_collection" ||
      c.status === "review",
  )
  const pendingCases = filteredCases.filter((c) => c.status === "pending_approval")
  const completedCases = filteredCases.filter((c) => c.status === "completed" || c.status === "archived")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Assigned Cases</h1>
            <p className="text-muted-foreground">Manage and investigate your assigned cases</p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/officer/evidence">
              <Shield className="mr-2 h-4 w-4" />
              Evidence Vault
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{cases.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-gray-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Not Started</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notStartedCases.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeCases.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-amber-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCases.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedCases.length}</div>
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
                    placeholder="Search cases..."
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

        {/* Cases Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Cases</TabsTrigger>
            <TabsTrigger value="not_started">Not Started ({notStartedCases.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCases.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCases.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedCases.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card className="glassmorphism border-purple-500/20">
              <CardHeader>
                <CardTitle>All Cases ({filteredCases.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredCases.map((case_) => (
                    <CaseCard key={case_.id} case_={case_} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="not_started">
            <Card className="glassmorphism border-gray-500/20">
              <CardHeader>
                <CardTitle>Not Started Cases ({notStartedCases.length})</CardTitle>
                <CardDescription>Cases waiting to begin investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notStartedCases.map((case_) => (
                    <CaseCard key={case_.id} case_={case_} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="glassmorphism border-yellow-500/20">
              <CardHeader>
                <CardTitle>Active Cases ({activeCases.length})</CardTitle>
                <CardDescription>Cases currently under investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCases.map((case_) => (
                    <CaseCard key={case_.id} case_={case_} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="glassmorphism border-amber-500/20">
              <CardHeader>
                <CardTitle>Pending Cases ({pendingCases.length})</CardTitle>
                <CardDescription>Cases awaiting approval or review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingCases.map((case_) => (
                    <CaseCard key={case_.id} case_={case_} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card className="glassmorphism border-green-500/20">
              <CardHeader>
                <CardTitle>Completed Cases ({completedCases.length})</CardTitle>
                <CardDescription>Cases with completed investigations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {completedCases.map((case_) => (
                    <CaseCard key={case_.id} case_={case_} />
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

function CaseCard({ case_ }: { case_: any }) {
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
    {
      value: "review",
      label: "Under Review",
      color: "bg-orange-500",
      icon: <Eye className="h-4 w-4 text-orange-500" />,
    },
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
    {
      value: "archived",
      label: "Archived",
      color: "bg-slate-500",
      icon: <Archive className="h-4 w-4 text-slate-500" />,
    },
  ]

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

  const getDaysUntilUnlock = (unlockDate: string) => {
    const today = new Date()
    const unlock = new Date(unlockDate)
    const diffTime = unlock.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const statusInfo = getStatusInfo(case_.status)

  return (
    <div className="flex items-center justify-between p-4 rounded-lg glassmorphism border-white/5 hover:border-purple-500/30 transition-colors">
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
            <span>•</span>
            <span>by {case_.submittedBy}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{case_.daysOpen} days open</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>{case_.evidenceCount} evidence files</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Unlock in {getDaysUntilUnlock(case_.unlockDate)} days</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <div className={`h-2 w-2 rounded-full ${getPriorityClass(case_.priority)}`} />
            <Badge variant="outline" className="capitalize text-xs">
              {case_.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {statusInfo.icon}
            <span>{statusInfo.label}</span>
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
  )
}
