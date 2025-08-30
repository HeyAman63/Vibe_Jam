import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatCard({
  title,
  value,
  hint,
}: {
  title: string
  value: string
  hint?: string
}) {
  return (
    <Card className="bg-slate-900/60 border-cyan-500/20 text-slate-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold">{value}</div>
        {hint ? <div className="text-xs text-slate-400 mt-1">{hint}</div> : null}
      </CardContent>
    </Card>
  )
}
