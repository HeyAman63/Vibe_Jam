"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const citizen = typeof window !== "undefined" ? window.localStorage.getItem("citizen") : null
    if (citizen) router.replace("/dashboard")
  }, [router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (!email || !password) {
        setError("Please enter email and password.")
        return
      }
      const citizen = { email, name: email.split("@")[0] || "Citizen" }
      window.localStorage.setItem("citizen", JSON.stringify(citizen))
      router.push("/dashboard")
    } catch {
      setError("Unable to sign in.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh flex items-center justify-center bg-[#0b1120]">
      <Card className="w-full max-w-sm border-cyan-500/30 bg-[#0b1120] text-slate-100">
        <CardHeader>
          <CardTitle className="text-balance">AI-Governed Smart City 2070</CardTitle>
          <CardDescription className="text-slate-400">Sign in to access the city dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                className="bg-slate-900/60 border-slate-700 text-slate-100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aman@citizens.ai"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-slate-900/60 border-slate-700 text-slate-100"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={loading} className="bg-cyan-600 hover:bg-cyan-500">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-slate-400">
            Demo login only. We can switch to real auth + DB (e.g., Supabase) on request.
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
