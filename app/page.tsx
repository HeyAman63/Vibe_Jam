"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const citizen = typeof window !== "undefined" ? window.localStorage.getItem("citizen") : null
    router.replace(citizen ? "/dashboard" : "/login")
  }, [router])
  return null
}
