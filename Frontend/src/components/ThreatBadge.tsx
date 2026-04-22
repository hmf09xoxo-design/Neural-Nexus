import clsx from 'clsx'

interface Props {
  label: string
  score?: number
  size?: 'sm' | 'md'
}

function getThreatLevel(label: string | null | undefined, score?: number) {
  const l = (label ?? '').toLowerCase()
  if (l.includes('safe') || l.includes('real') || l.includes('legitimate') || l === 'ham') {
    return 'safe'
  }
  if (l.includes('suspicious') || (score !== undefined && score > 0.4 && score < 0.7)) {
    return 'suspicious'
  }
  return 'threat'
}

export default function ThreatBadge({ label, score, size = 'md' }: Props) {
  const safeLabel = label ?? 'Unknown'
  const level = getThreatLevel(safeLabel, score)

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 font-semibold rounded-full uppercase tracking-wide',
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1',
        level === 'safe' && 'bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30',
        level === 'suspicious' && 'bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30',
        level === 'threat' && 'bg-red-500/15 text-red-400 ring-1 ring-red-500/30',
      )}
    >
      <span
        className={clsx(
          'w-1.5 h-1.5 rounded-full',
          level === 'safe' && 'bg-emerald-400',
          level === 'suspicious' && 'bg-amber-400',
          level === 'threat' && 'bg-red-400',
        )}
      />
      {safeLabel}
    </span>
  )
}
