"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, UserPlus, Eye, Edit, Shield, FileText, Clock, CheckCircle, Mail, Phone, Calendar } from "lucide-react"

export default function AdminOfficers() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [isAddingOfficer, setIsAddingOfficer] = useState(false)

  const [newOfficer, setNewOfficer] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    rank: "",
    badgeNumber: "",
  })

  const officers = [
    {
      id: 1,
      name: "Officer Smith",
      email: "smith@dept.gov",
      phone: "+1 (555) 0123",
      department: "Cybercrime",
      rank: "Detective",
      badgeNumber: "CD-001",
      status: "active",
      assignedCases: 3,
      completedCases: 12,
      joinDate: "2023-01-15",
      lastActive: "2025-06-12T14:30:00Z",
      walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    },
    {
      id: 2,
      name: "Officer Johnson",
      email: "johnson@dept.gov",
      phone: "+1 (555) 0124",
      department: "Digital Forensics",
      rank: "Sergeant",
      badgeNumber: "DF-002",
      status: "active",
      assignedCases: 2,
      completedCases: 8,
      joinDate: "2023-03-20",
      lastActive: "2025-06-12T16:45:00Z",
      walletAddress: "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
    },
    {
      id: 3,
      name: "Officer Davis",
      email: "davis@dept.gov",
      phone: "+1 (555) 0125",
      department: "Cybercrime",
      rank: "Officer",
      badgeNumber: "CD-003",
      status: "active",
      assignedCases: 4,
      completedCases: 15,
      joinDate: "2022-11-10",
      lastActive: "2025-06-12T13:20:00Z",
      walletAddress: "0x8dC58C6F98eAbe94205C07890BE4c1aD31E486B9",
    },
    {
      id: 4,
      name: "Officer Wilson",
      email: "wilson@dept.gov",
      phone: "+1 (555) 0126",
      department: "Digital Forensics",
      rank: "Detective",
      badgeNumber: "DF-004",
      status: "inactive",
      assignedCases: 0,
      completedCases: 6,
      joinDate: "2023-06-01",
      lastActive: "2025-06-10T09:15:00Z",
      walletAddress: "0x9eD59D7G09fAbe94205C07890BE4c1aD31E486C0",
    },
  ]

  const departments = ["Cybercrime", "Digital Forensics", "Financial Crimes", "Intelligence"]
  const ranks = ["Officer", "Detective", "Sergeant", "Lieutenant", "Captain"]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-300">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-300">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-500/20 text-red-300">Suspended</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const filteredOfficers = officers.filter((officer) => {
    const matchesSearch =
      officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      officer.badgeNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || officer.status === statusFilter
    const matchesDepartment = departmentFilter === "all" || officer.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  const activeOfficers = filteredOfficers.filter((o) => o.status === "active")
  const inactiveOfficers = filteredOfficers.filter((o) => o.status === "inactive")

  const handleAddOfficer = async () => {
    if (!newOfficer.name || !newOfficer.email || !newOfficer.department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsAddingOfficer(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Officer Added",
        description: `${newOfficer.name} has been successfully added to the system`,
      })

      setNewOfficer({
        name: "",
        email: "",
        phone: "",
        department: "",
        rank: "",
        badgeNumber: "",
      })
    } catch (error) {
      toast({
        title: "Failed to Add Officer",
        description: "There was an error adding the officer. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingOfficer(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Officers Management</h1>
            <p className="text-muted-foreground">Manage officer accounts and assignments</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Officer
              </Button>
            </DialogTrigger>
            <DialogContent className="glassmorphism border-purple-500/20">
              <DialogHeader>
                <DialogTitle>Add New Officer</DialogTitle>
                <DialogDescription>Create a new officer account in the system</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newOfficer.name}
                      onChange={(e) => setNewOfficer({ ...newOfficer, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newOfficer.email}
                      onChange={(e) => setNewOfficer({ ...newOfficer, email: e.target.value })}
                      placeholder="officer@dept.gov"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newOfficer.phone}
                      onChange={(e) => setNewOfficer({ ...newOfficer, phone: e.target.value })}
                      placeholder="+1 (555) 0123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="badge">Badge Number</Label>
                    <Input
                      id="badge"
                      value={newOfficer.badgeNumber}
                      onChange={(e) => setNewOfficer({ ...newOfficer, badgeNumber: e.target.value })}
                      placeholder="CD-001"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={newOfficer.department}
                      onValueChange={(value) => setNewOfficer({ ...newOfficer, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rank">Rank</Label>
                    <Select
                      value={newOfficer.rank}
                      onValueChange={(value) => setNewOfficer({ ...newOfficer, rank: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select rank" />
                      </SelectTrigger>
                      <SelectContent>
                        {ranks.map((rank) => (
                          <SelectItem key={rank} value={rank}>
                            {rank}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <Button onClick={handleAddOfficer} disabled={isAddingOfficer}>
                    {isAddingOfficer ? "Adding..." : "Add Officer"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Officers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officers.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Officers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeOfficers.length}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Cases Assigned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officers.reduce((sum, o) => sum + o.assignedCases, 0)}</div>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Cases Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{officers.reduce((sum, o) => sum + o.completedCases, 0)}</div>
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
                    placeholder="Search officers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Officers List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Officers ({filteredOfficers.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeOfficers.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({inactiveOfficers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4">
              {filteredOfficers.map((officer) => (
                <OfficerCard key={officer.id} officer={officer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-4">
              {activeOfficers.map((officer) => (
                <OfficerCard key={officer.id} officer={officer} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive">
            <div className="grid gap-4">
              {inactiveOfficers.map((officer) => (
                <OfficerCard key={officer.id} officer={officer} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function OfficerCard({ officer }: { officer: any }) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-300">Active</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-300">Inactive</Badge>
      case "suspended":
        return <Badge className="bg-red-500/20 text-red-300">Suspended</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatLastActive = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  return (
    <Card className="glassmorphism border-purple-500/20">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border-2 border-purple-500/50">
              <AvatarFallback className="bg-purple-950/50">
                {officer.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{officer.name}</h3>
                {getStatusBadge(officer.status)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    <span>{officer.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{officer.phone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="h-3 w-3" />
                    <span>{officer.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs">
                      {officer.rank} • {officer.badgeNumber}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Cases</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FileText className="h-3 w-3" />
                    <span>{officer.assignedCases} assigned</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{officer.completedCases} completed</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Activity</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {formatDate(officer.joinDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Active {formatLastActive(officer.lastActive)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground font-mono">
                Wallet: {officer.walletAddress.substring(0, 10)}...
                {officer.walletAddress.substring(officer.walletAddress.length - 8)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
