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
import { Search, Eye, Ban, CheckCircle, FileText, Calendar, Mail, MapPin, Clock } from "lucide-react"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2025-06-12T14:30:00Z",
      complaintsSubmitted: 3,
      complaintsResolved: 1,
      location: "New York, NY",
      verificationStatus: "verified",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      walletAddress: "0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8",
      status: "active",
      joinDate: "2024-03-20",
      lastActive: "2025-06-12T16:45:00Z",
      complaintsSubmitted: 1,
      complaintsResolved: 0,
      location: "Los Angeles, CA",
      verificationStatus: "verified",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.wilson@company.com",
      walletAddress: "0x8dC58C6F98eAbe94205C07890BE4c1aD31E486B9",
      status: "active",
      joinDate: "2024-02-10",
      lastActive: "2025-06-11T13:20:00Z",
      complaintsSubmitted: 2,
      complaintsResolved: 2,
      location: "Chicago, IL",
      verificationStatus: "verified",
    },
    {
      id: 4,
      name: "Sarah Jones",
      email: "sarah.jones@company.com",
      walletAddress: "0x9eD59D7G09fAbe94205C07890BE4c1aD31E486C0",
      status: "suspended",
      joinDate: "2024-05-01",
      lastActive: "2025-06-08T09:15:00Z",
      complaintsSubmitted: 5,
      complaintsResolved: 1,
      location: "Houston, TX",
      verificationStatus: "pending",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex.brown@company.com",
      walletAddress: "0xAfE60E8H10gAbe94205C07890BE4c1aD31E486D1",
      status: "inactive",
      joinDate: "2023-12-05",
      lastActive: "2025-05-28T11:30:00Z",
      complaintsSubmitted: 1,
      complaintsResolved: 1,
      location: "Miami, FL",
      verificationStatus: "verified",
    },
  ]

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

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-blue-500/20 text-blue-300">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-300">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-300">Rejected</Badge>
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const activeUsers = filteredUsers.filter((u) => u.status === "active")
  const inactiveUsers = filteredUsers.filter((u) => u.status === "inactive")
  const suspendedUsers = filteredUsers.filter((u) => u.status === "suspended")

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight neon-text">Users Management</h1>
            <p className="text-muted-foreground">Monitor and manage user accounts and activities</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="glassmorphism border-purple-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-green-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers.length}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-blue-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.complaintsSubmitted, 0)}</div>
              <p className="text-xs text-muted-foreground">All time submissions</p>
            </CardContent>
          </Card>
          <Card className="glassmorphism border-yellow-500/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {users.filter((u) => u.verificationStatus === "verified").length}
              </div>
              <p className="text-xs text-muted-foreground">Identity verified</p>
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
                    placeholder="Search users..."
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="complaints">Most Complaints</SelectItem>
                  <SelectItem value="activity">Last Active</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Users ({filteredUsers.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeUsers.length})</TabsTrigger>
            <TabsTrigger value="inactive">Inactive ({inactiveUsers.length})</TabsTrigger>
            <TabsTrigger value="suspended">Suspended ({suspendedUsers.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid gap-4">
              {filteredUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <div className="grid gap-4">
              {activeUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="inactive">
            <div className="grid gap-4">
              {inactiveUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suspended">
            <div className="grid gap-4">
              {suspendedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

function UserCard({ user }: { user: any }) {
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

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-blue-500/20 text-blue-300">Verified</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-300">Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-500/20 text-red-300">Rejected</Badge>
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
                {user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{user.name}</h3>
                {getStatusBadge(user.status)}
                {getVerificationBadge(user.verificationStatus)}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Contact</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Mail className="h-3 w-3" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{user.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Complaints</p>
                  <div className="flex items-center gap-1 mt-1">
                    <FileText className="h-3 w-3" />
                    <span>{user.complaintsSubmitted} submitted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>{user.complaintsResolved} resolved</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Activity</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>Joined {formatDate(user.joinDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Active {formatLastActive(user.lastActive)}</span>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Wallet</p>
                  <div className="text-xs font-mono mt-1">
                    {user.walletAddress.substring(0, 10)}...
                    {user.walletAddress.substring(user.walletAddress.length - 8)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {user.status === "active" ? (
              <Button size="sm" variant="outline" className="text-red-400 hover:text-red-300">
                <Ban className="h-4 w-4 mr-1" />
                Suspend
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="text-green-400 hover:text-green-300">
                <CheckCircle className="h-4 w-4 mr-1" />
                Activate
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
