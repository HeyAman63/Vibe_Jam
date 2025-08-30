import { Suspense } from "react"
import { IssueForm } from "@/components/issue-form"
import { IssueMap } from "@/components/issue-map"
import { useState } from "react"
import { useIssues } from "@/components/use-issues"

function MapClient() {
  "use client"
  const { issues, vote, byFilters } = useIssues()
  const [status, setStatus] = useState<"open" | "in-progress" | "resolved" | "all">("all")
  const [category, setCategory] = useState<string | "all">("all")
  const [minVotes, setMinVotes] = useState(0)

  const filtered = byFilters({ status, category, minVotes })
  const categories = Array.from(new Set(issues.map((i) => i.category || "general")))

  return (
    <main className="container mx-auto max-w-6xl p-4 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-balance">Civic Map</h1>
        <p className="text-sm text-muted-foreground">
          Report issues by clicking on the map, filter by status/category, and upvote to prioritize.
        </p>
      </header>

      <section className="rounded-lg border p-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Status</label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select
              className="w-full rounded-md border bg-background px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Minimum votes</label>
            <input
              type="number"
              min={0}
              className="w-full rounded-md border bg-background px-3 py-2"
              value={minVotes}
              onChange={(e) => setMinVotes(Number.parseInt(e.target.value || "0", 10))}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <IssueMap
          issues={filtered}
          onVote={(id) => vote(id, 1)}
          filters={{ status, category, minVotes }}
          initialCenter={{ lat: 37.7749, lng: -122.4194 }}
          initialZoom={12}
          height={480}
        />
      </section>

      <section className="rounded-lg border p-4 space-y-3">
        <h2 className="text-lg font-semibold">Submit a new issue</h2>
        <IssueForm defaultCenter={{ lat: 37.7749, lng: -122.4194 }} />
      </section>
    </main>
  )
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Loading civic map...</div>}>
      <MapClient />
    </Suspense>
  )
}
