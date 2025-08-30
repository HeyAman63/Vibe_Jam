"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

export type IssueStatus = "open" | "in-progress" | "resolved"
export type IssueSeverity = "low" | "medium" | "high"

export type Issue = {
  id: string
  title: string
  description?: string
  category?: string
  status: IssueStatus
  severity: IssueSeverity
  votes: number
  lat: number
  lng: number
  createdAt: number
}

const STORAGE_KEY = "ai_mayor_issues_v1"

function loadIssues(): Issue[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function saveIssues(issues: Issue[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(issues))
}

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([])

  useEffect(() => {
    setIssues(loadIssues())
  }, [])

  useEffect(() => {
    saveIssues(issues)
  }, [issues])

  const addIssue = useCallback(
    (data: Omit<Issue, "id" | "votes" | "createdAt" | "status"> & Partial<Pick<Issue, "status">>) => {
      setIssues((prev) => {
        const issue: Issue = {
          id: crypto.randomUUID(),
          votes: 0,
          createdAt: Date.now(),
          status: data.status ?? "open",
          title: data.title,
          description: data.description,
          category: data.category,
          severity: data.severity ?? "medium",
          lat: data.lat,
          lng: data.lng,
        }
        return [issue, ...prev]
      })
    },
    [],
  )

  const updateIssue = useCallback((id: string, updates: Partial<Issue>) => {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, ...updates } : i)))
  }, [])

  const vote = useCallback((id: string, delta = 1) => {
    setIssues((prev) => prev.map((i) => (i.id === id ? { ...i, votes: Math.max(0, i.votes + delta) } : i)))
  }, [])

  const remove = useCallback((id: string) => {
    setIssues((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const byFilters = useCallback(
    (filters: { status?: IssueStatus | "all"; category?: string | "all"; minVotes?: number }) => {
      const { status = "all", category = "all", minVotes = 0 } = filters ?? {}
      return issues.filter((i) => {
        if (status !== "all" && i.status !== status) return false
        if (category !== "all" && category && i.category !== category) return false
        if (i.votes < minVotes) return false
        return true
      })
    },
    [issues],
  )

  const stats = useMemo(() => {
    const total = issues.length
    const open = issues.filter((i) => i.status === "open").length
    const inProgress = issues.filter((i) => i.status === "in-progress").length
    const resolved = issues.filter((i) => i.status === "resolved").length
    return { total, open, inProgress, resolved }
  }, [issues])

  return { issues, addIssue, updateIssue, vote, remove, byFilters, stats }
}
