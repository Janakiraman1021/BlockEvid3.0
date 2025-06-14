import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HexagonIcon, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="p-4 border border-purple-500/50 rounded-lg bg-black/50 animate-pulse-glow">
            <HexagonIcon className="h-16 w-16 text-purple-500" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-6xl font-bold neon-text">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-gray-400">The page you're looking for doesn't exist in the BlockEvid 3.0 system.</p>
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
            <Link href="/login">Access Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
