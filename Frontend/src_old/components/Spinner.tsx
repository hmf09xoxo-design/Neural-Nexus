import clsx from 'clsx'

export default function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'inline-block rounded-full border-2 border-slate-600 border-t-violet-500 animate-spin',
        className ?? 'w-5 h-5'
      )}
    />
  )
}
