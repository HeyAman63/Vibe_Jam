"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useIssues } from "@/components/use-issues"

type IssueFormProps = {
  defaultCenter?: { lat: number; lng: number }
  defaultZoom?: number
}

export function IssueForm({ defaultCenter = { lat: 37.7749, lng: -122.4194 }, defaultZoom = 13 }: IssueFormProps) {
  const { addIssue } = useIssues()

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState<"low" | "medium" | "high">("medium")

  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)

  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  // dynamic import for react-leaflet to avoid SSR issues
  const [RL, setRL] = useState<any>(null)
  useEffect(() => {
    let mounted = true
    Promise.all([import("react-leaflet"), import("leaflet")]).then(([reactLeaflet, L]) => {
      if (mounted) setRL({ ...reactLeaflet, L: L.default })
    })
    return () => {
      mounted = false
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const finalLat = lat ?? defaultCenter.lat
      const finalLng = lng ?? defaultCenter.lng

      // Add to local store
      addIssue({
        title,
        description,
        category,
        severity,
        lat: finalLat,
        lng: finalLng,
      })

      // Ask the Mayor for an immediate response (not persisted in issues store)
      const res = await fetch("/api/mayor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `New civic issue reported.\nTitle: ${title}\nCategory: ${category}\nSeverity: ${severity}\nLocation: (${finalLat}, ${finalLng})\nDescription: ${description}`,
        }),
      })
      const data = (await res.json()) as { mayorReply?: string; error?: string }
      const reply = data.mayorReply ?? data.error ?? "No response."
      setResult(reply)

      // Reset form
      setTitle("")
      setCategory("")
      setDescription("")
      setSeverity("medium")
      setLat(null)
      setLng(null)
    } catch {
      setResult("Failed to submit issue.")
    } finally {
      setSubmitting(false)
    }
  }

  const MapMini = () => {
    if (!RL) {
      return (
        <div className="w-full rounded-md border bg-background/50 h-56 flex items-center justify-center text-sm text-muted-foreground">
          Loading map...
        </div>
      )
    }
    const MapContainer = RL.MapContainer
    const TileLayer = RL.TileLayer
    const CircleMarker = RL.CircleMarker
    const useMapEvents = RL.useMapEvents

    const ClickHandler = () => {
      useMapEvents({
        click(e: any) {
          const { lat, lng } = e.latlng
          setLat(lat)
          setLng(lng)
        },
      })
      return null
    }

    return (
      <div className="w-full overflow-hidden rounded-md border h-56">
        <MapContainer
          center={[lat ?? defaultCenter.lat, lng ?? defaultCenter.lng]}
          zoom={defaultZoom}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {lat != null && lng != null ? (
            <CircleMarker
              center={[lat, lng]}
              radius={8}
              pathOptions={{ color: "#60a5fa", fillColor: "#60a5fa", fillOpacity: 0.6 }}
            />
          ) : null}
          <ClickHandler />
        </MapContainer>
      </div>
    )
  }

  return (
    <Card className="bg-card border">
      <CardHeader>
        <CardTitle className="text-balance">Submit an Issue</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sector 5 water shortage"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Water, Energy, Transport, etc."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="severity">Severity</Label>
            <select
              id="severity"
              className="w-full rounded-md border bg-background px-3 py-2"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as "low" | "medium" | "high")}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the problem clearly with any context."
              required
            />
          </div>

          <div className="grid gap-2">
            <Label>Location</Label>
            <MapMini />
            <p className="text-xs text-muted-foreground">
              Click the map to set a location. Current:{" "}
              {lat != null && lng != null ? `(${lat.toFixed(5)}, ${lng.toFixed(5)})` : "not set (will use center)"}.
            </p>
          </div>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>

          {result && (
            <div className="text-sm">
              <span className="font-medium">Mayor:</span> {result}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
