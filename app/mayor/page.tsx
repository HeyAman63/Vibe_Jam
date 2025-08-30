"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

type Message = { role: "user" | "mayor"; content: string }

export default function MayorPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "mayor",
      content: "I am Mayor AI-2070. I manage energy, water, and transport with fairness and logic. How may I assist?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const citizen = window.localStorage.getItem("citizen")
    if (!citizen) router.replace("/login")
  }, [router])

  async function send() {
    if (!input.trim()) return
    const userMsg: Message = { role: "user", content: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/mayor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMsg.content }),
      })
      const data = (await res.json()) as { mayorReply?: string; error?: string }
      const reply: Message = { role: "mayor", content: data.mayorReply ?? data.error ?? "No response." }
      setMessages((m) => [...m, reply])
    } catch {
      setMessages((m) => [...m, { role: "mayor", content: "System error." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-[#0b1120] text-slate-100">
      <header className="border-b border-cyan-500/20">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Mayor AI-2070</h1>
          <Button variant="secondary" className="bg-slate-800 hover:bg-slate-700" asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-6 grid gap-4">
        <Card className="bg-slate-900/60 border-cyan-500/20">
          <CardHeader>
            <CardTitle>Citizen Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[50vh] overflow-y-auto space-y-3 pr-2">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`rounded-md px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "bg-slate-800/80 border border-slate-700"
                      : "bg-cyan-900/20 border border-cyan-700/30"
                  }`}
                >
                  <span className={m.role === "user" ? "text-slate-300" : "text-cyan-300"}>
                    {m.role === "user" ? "Citizen: " : "Mayor: "}
                  </span>
                  <span className="text-slate-100">{m.content}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Allocate more energy to hospitals."
                className="bg-slate-900/60 border-slate-700 text-slate-100"
                onKeyDown={(e) => {
                  if (e.key === "Enter") send()
                }}
              />
              <Button onClick={send} disabled={loading} className="bg-cyan-600 hover:bg-cyan-500">
                {loading ? "Thinking..." : "Send"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
