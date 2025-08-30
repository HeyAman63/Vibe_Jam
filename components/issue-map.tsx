"use client"

import { useEffect, useMemo, useState } from "react"
import "leaflet/dist/leaflet.css"
import type { Issue, IssueSeverity } from "./use-issues"

type Filters = {
  status?: "open" | "in-progress" | "resolved" | "all"
  category?: string | "all"
  minVotes?: number
}

export function IssueMap({
  issues,
  onVote,
  filters,
  onLocationPicked,
  initialCenter = { lat: 37.7749, lng: -122.4194 },
  initialZoom = 12,
  height = 500,
}: {
  issues: Issue[]
  onVote?: (id: string) => void
  filters?: Filters
  onLocationPicked?: (lat: number, lng: number) => void
  initialCenter?: { lat: number; lng: number }
  initialZoom?: number
  height?: number
}) {
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

  const displayIssues = useMemo(() => {
    if (!filters) return issues
    const { status = "all", category = "all", minVotes = 0 } = filters
    return issues.filter((i) => {
      if (status !== "all" && i.status !== status) return false
      if (category !== "all" && category && i.category !== category) return false
      if (i.votes < (minVotes ?? 0)) return false
      return true
    })
  }, [issues, filters])

  function colorForSeverity(sev: IssueSeverity) {
    if (sev === "high") return "#ef4444"
    if (sev === "medium") return "#f59e0b"
    return "#22c55e"
  }

  if (!RL) {
    return (
      <div className="w-full rounded-md border bg-background/50" style={{ height }}>
        <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
          Loading map...
        </div>
      </div>
    )
  }

  const MapContainer = RL.MapContainer
  const TileLayer = RL.TileLayer
  const CircleMarker = RL.CircleMarker
  const Popup = RL.Popup
  const useMapEvents = RL.useMapEvents

  const ClickHandler = () => {
    useMapEvents({
      click(e: any) {
        const { lat, lng } = e.latlng
        onLocationPicked?.(lat, lng)
      },
    })
    return null
  }

  return (
    <div className="w-full overflow-hidden rounded-md border" style={{ height }}>
      <MapContainer
        center={[initialCenter.lat, initialCenter.lng]}
        zoom={initialZoom}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {displayIssues.map((i) => (
          <CircleMarker
            key={i.id}
            center={[i.lat, i.lng]}
            radius={10}
            pathOptions={{
              color: colorForSeverity(i.severity),
              fillColor: colorForSeverity(i.severity),
              fillOpacity: 0.7,
            }}
          >
            <Popup>
              <div className="space-y-2">
                <div className="font-medium">{i.title}</div>
                {i.description ? <div className="text-sm text-muted-foreground">{i.description}</div> : null}
                <div className="text-xs">
                  <span className="mr-2 inline-block rounded bg-secondary px-2 py-0.5">{i.category || "general"}</span>
                  <span className="mr-2 inline-block rounded bg-secondary px-2 py-0.5">{i.status}</span>
                  <span className="inline-block rounded bg-secondary px-2 py-0.5">votes: {i.votes}</span>
                </div>
                {onVote ? (
                  <button
                    className="w-full rounded-md bg-primary px-3 py-1.5 text-primary-foreground text-sm hover:opacity-90"
                    onClick={() => onVote(i.id)}
                  >
                    Upvote
                  </button>
                ) : null}
              </div>
            </Popup>
          </CircleMarker>
        ))}

        <ClickHandler />
      </MapContainer>
    </div>
  )
}
