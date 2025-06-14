import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, ArrowLeft } from "lucide-react"

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 border border-red-500/50 rounded-lg bg-black/50 animate-pulse-glow">
            <Shield className="h-16 w-16 text-red-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500">403</h1>
          <h2 className="text-2xl font-semibold">Access Denied</h2>
          <p className="text-gray-400">
            You don't have permission to access this resource. Please contact your administrator if you believe this is
            an error.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
