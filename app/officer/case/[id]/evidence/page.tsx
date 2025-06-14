"use client"

import type React from "react"
import { toast } from "react-toastify" // Import toast from react-toastify

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Upload,
  FileText,
  Calendar,
  Shield,
  Clock,
  AlertCircle,
  CheckCircle2,
  ImageIcon,
  Video,
  Archive,
  X,
  Eye,
} from "lucide-react"
import Link from "next/link"

const getFileTypeIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-400" />
    case "doc":
    case "docx":
      return <FileText className="h-5 w-5 text-blue-400" />
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon className="h-5 w-5 text-green-400" />
    case "mp4":
    case "mov":
    case "avi":
      return <Video className="h-5 w-5 text-purple-400" />
    case "json":
    case "csv":
    case "txt":
      return <Archive className="h-5 w-5 text-orange-400" />
    case "zip":
    case "rar":
      return <Archive className="h-5 w-5 text-yellow-400" />
    default:
      return <FileText className="h-5 w-5 text-gray-400" />
  }
}

const getFileType = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase()

  switch (extension) {
    case "pdf":
      return "PDF Document"
    case "doc":
    case "docx":
      return "Word Document"
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "Image"
    case "mp4":
    case "mov":
    case "avi":
      return "Video"
    case "json":
      return "JSON Data"
    case "csv":
      return "CSV Data"
    case "txt":
      return "Text File"
    case "zip":
    case "rar":
      return "Archive"
    default:
      return "File"
  }
}

const previewFile = (file: File, index: number) => {
  // Simple preview - in a real app, you'd implement proper file preview
  toast({
    title: "File Preview",
    description: `Previewing ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
  })
}

export default function CaseEvidenceUpload() {
  const params = useParams()
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)

  const [evidenceData, setEvidenceData] = useState({
    firDocument: null as File | null,
    investigationNotes: "",
    evidenceFiles: [] as File[],
    unlockDate: "",
    category: "",
    description: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "fir" | "evidence") => {
    if (e.target.files) {
      if (type === "fir") {
        setEvidenceData((prev) => ({ ...prev, firDocument: e.target.files![0] }))
      } else {
        const newFiles = Array.from(e.target.files)
        setEvidenceData((prev) => ({
          ...prev,
          evidenceFiles: [...prev.evidenceFiles, ...newFiles],
        }))
      }
    }
  }

  const removeEvidenceFile = (index: number) => {
    setEvidenceData((prev) => ({
      ...prev,
      evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!evidenceData.investigationNotes || !evidenceData.unlockDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        type: "error",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate IPFS upload and blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Evidence Uploaded Successfully",
        description: "Evidence has been securely stored on IPFS and recorded on blockchain",
        type: "success",
      })

      router.push(`/officer/case/${params.id}`)
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading the evidence. Please try again.",
        type: "error",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/officer/case/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight neon-text">Upload Evidence</h1>
          <Badge variant="outline">{params.id}</Badge>
        </div>

        <Card className="glassmorphism border-purple-500/20">
          <CardHeader>
            <CardTitle>Evidence Upload Form</CardTitle>
            <CardDescription>
              Upload investigation evidence and set unlock parameters for case {params.id}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* FIR Document Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium">FIR Document</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="fir-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-blue-500/30 hover:border-blue-500/50 bg-blue-950/10 hover:bg-blue-950/20 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FileText className="w-8 h-8 mb-4 text-blue-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload FIR</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB)</p>
                    </div>
                    <input
                      id="fir-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileChange(e, "fir")}
                    />
                  </label>
                </div>
                {evidenceData.firDocument && (
                  <div className="flex items-center gap-2 p-3 bg-blue-950/20 rounded-lg border border-blue-500/20">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-sm">{evidenceData.firDocument.name}</span>
                    <span className="text-xs text-gray-400">
                      ({(evidenceData.firDocument.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Investigation Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">
                  Investigation Notes <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Detailed investigation findings, methodology, and conclusions..."
                  rows={6}
                  value={evidenceData.investigationNotes}
                  onChange={(e) => setEvidenceData((prev) => ({ ...prev, investigationNotes: e.target.value }))}
                  required
                />
              </div>

              {/* Evidence Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Evidence Category</Label>
                <Select
                  value={evidenceData.category}
                  onValueChange={(value) => setEvidenceData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select evidence category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital_forensics">Digital Forensics</SelectItem>
                    <SelectItem value="surveillance">Surveillance</SelectItem>
                    <SelectItem value="documentation">Documentation</SelectItem>
                    <SelectItem value="witness_statements">Witness Statements</SelectItem>
                    <SelectItem value="physical_evidence">Physical Evidence</SelectItem>
                    <SelectItem value="financial_records">Financial Records</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Evidence Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Evidence Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the evidence being uploaded..."
                  rows={3}
                  value={evidenceData.description}
                  onChange={(e) => setEvidenceData((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <Separator />

              {/* Additional Evidence Files */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Additional Evidence Files</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="evidence-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-purple-500/30 hover:border-purple-500/50 bg-purple-950/10 hover:bg-purple-950/20 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-purple-400" />
                      <p className="mb-2 text-sm text-gray-400">
                        <span className="font-semibold">Click to upload evidence</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">Images, Videos, Documents, Data files (MAX. 50MB each)</p>
                      <p className="text-xs text-purple-400 mt-1">
                        Multiple files supported - Upload as many as needed
                      </p>
                    </div>
                    <input
                      id="evidence-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".png,.jpg,.jpeg,.pdf,.doc,.docx,.mp4,.mov,.json,.csv,.txt,.zip,.rar,.xlsx,.pptx"
                      onChange={(e) => handleFileChange(e, "evidence")}
                    />
                  </label>
                </div>

                {evidenceData.evidenceFiles.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Uploaded Evidence Files ({evidenceData.evidenceFiles.length})</Label>
                      <div className="text-sm text-muted-foreground">
                        Total size:{" "}
                        {(evidenceData.evidenceFiles.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024).toFixed(
                          2,
                        )}{" "}
                        MB
                      </div>
                    </div>

                    <div className="grid gap-3 max-h-64 overflow-y-auto">
                      {evidenceData.evidenceFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-purple-950/20 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="flex-shrink-0">{getFileTypeIcon(file.name)}</div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span>•</span>
                                <span>{getFileType(file.name)}</span>
                                <span>•</span>
                                <span className="text-green-400">Ready to upload</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => previewFile(file, index)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEvidenceFile(index)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* File Upload Summary */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-black/20 rounded-lg border border-white/5">
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-400">{evidenceData.evidenceFiles.length}</div>
                        <div className="text-xs text-muted-foreground">Total Files</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-400">
                          {evidenceData.evidenceFiles.filter((f) => f.type.startsWith("image/")).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Images</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-400">
                          {
                            evidenceData.evidenceFiles.filter(
                              (f) => f.type.includes("pdf") || f.type.includes("document"),
                            ).length
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">Documents</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-400">
                          {evidenceData.evidenceFiles.filter((f) => f.type.startsWith("video/")).length}
                        </div>
                        <div className="text-xs text-muted-foreground">Videos</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Drag and Drop Zone */}
                <div className="text-center p-4 border border-dashed border-purple-500/30 rounded-lg bg-purple-950/5">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>Pro Tip:</strong> You can select multiple files at once or drag and drop files directly
                    here
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported formats: Images (PNG, JPG), Documents (PDF, DOC), Videos (MP4, MOV), Data (JSON, CSV, TXT,
                    ZIP)
                  </p>
                </div>
              </div>

              <Separator />

              {/* Unlock Date */}
              <div className="space-y-2">
                <Label htmlFor="unlock-date">
                  Evidence Unlock Date <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="unlock-date"
                    type="datetime-local"
                    value={evidenceData.unlockDate}
                    onChange={(e) => setEvidenceData((prev) => ({ ...prev, unlockDate: e.target.value }))}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Evidence will be automatically unlocked for admin access after this date
                </p>
              </div>

              {/* Security Notice */}
              <Card className="border-yellow-500/30 bg-yellow-950/10">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-300">Security Notice</h4>
                      <p className="text-sm text-yellow-200/80 mt-1">
                        All evidence will be encrypted and stored on IPFS with blockchain verification. The unlock date
                        cannot be modified once set. Ensure all information is accurate before submission.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                <Button type="button" variant="outline" asChild>
                  <Link href={`/officer/case/${params.id}`}>Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  disabled={isUploading}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                >
                  {isUploading ? (
                    <>
                      <Clock className="mr-2 h-4 w-4 animate-spin" />
                      Uploading to IPFS...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Evidence
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Upload Progress */}
        {isUploading && (
          <Card className="glassmorphism border-blue-500/20">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 animate-spin text-blue-400" />
                  <span className="font-medium">Uploading Evidence to Blockchain</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Files encrypted and prepared</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 animate-spin text-blue-400" />
                    <span>Uploading to IPFS network...</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>Recording transaction on blockchain</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
