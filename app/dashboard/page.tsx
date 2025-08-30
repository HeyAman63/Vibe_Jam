"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/stat-card"
import { IssueForm } from "@/components/issue-form"

type Citizen = { email: string; name: string }

export default function DashboardPage() {
  const router = useRouter()
  const [citizen, setCitizen] = useState<Citizen | null>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem("citizen")
    const c = raw ? JSON.parse(raw) : null
    setCitizen(c)
    if (!c) router.replace("/login")
  }, [router])

  function logout() {
    window.localStorage.removeItem("citizen")
    window.location.href = "/login"
  }

  return (
    <main className="min-h-dvh bg-[#0b1120] text-slate-100">
      <header className="border-b border-cyan-500/20">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" aria-hidden />
            <h1 className="text-lg font-semibold text-balance">Smart City 2070</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-300">{citizen ? `Hello, ${citizen.name}` : "Guest"}</span>
            <Button variant="secondary" className="bg-slate-800 hover:bg-slate-700" asChild>
              <Link href="/mayor">Chat with Mayor</Link>
            </Button>
            <Button onClick={logout} className="bg-cyan-600 hover:bg-cyan-500">
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-8 grid gap-6">
        <div>
          <h2 className="text-xl font-semibold">City Status</h2>
          <p className="text-slate-400">Real-time overview of key resources</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Energy" value="65% Renewables" hint="25% Nuclear • 10% Backup" />
          <StatCard title="Water" value="78% Reservoir" hint="Stable supply" />
          <StatCard title="Transport" value="Hyperloop: Active" hint="Drones: Congested" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <IssueForm />
          <RecentIssues />
        </div>
      </section>
    </main>
  )
}

function RecentIssues() {
  const [issues, setIssues] = useState<
    { id: string; category: string; description: string; mayorReply?: string; createdAt: string }[]
  >([])

  useEffect(() => {
    const stored = window.localStorage.getItem("issues") || "[]"
    setIssues(JSON.parse(stored))
  }, [])

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-lg p-4">
      <h3 className="font-semibold mb-2">Recent Issues</h3>
      <ul className="space-y-3">
        {issues.length === 0 && <li className="text-sm text-slate-400">No issues yet. Submit one to get started.</li>}
        {issues.map((i) => (
          <li key={i.id} className="border border-slate-800 rounded-md p-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-slate-300">{i.category}</div>
              <div className="text-xs text-slate-500">{new Date(i.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-sm mt-1">{i.description}</div>
            {i.mayorReply && (
              <div className="text-sm mt-2">
                <span className="text-cyan-400">Mayor:</span> {i.mayorReply}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
