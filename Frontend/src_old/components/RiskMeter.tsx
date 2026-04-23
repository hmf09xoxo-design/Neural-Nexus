import clsx from 'clsx'

interface Props {
  score: number
}

export default function RiskMeter({ score }: Props) {
  const pct = Math.round(score * 100)
  const color =
    pct < 40 ? 'bg-emerald-500' : pct < 70 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-slate-400">
        <span>Risk Score</span>
        <span className={clsx('font-bold', pct < 40 ? 'text-emerald-400' : pct < 70 ? 'text-amber-400' : 'text-red-400')}>
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={clsx('h-full rounded-full transition-all duration-700', color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
