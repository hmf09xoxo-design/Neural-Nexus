import { useCallback, useState } from 'react'
import { Upload } from 'lucide-react'
import clsx from 'clsx'

interface Props {
  onFile: (file: File) => void
  accept?: string
  label?: string
}

export default function FileDropzone({ onFile, accept, label = 'Drop a file or click to upload' }: Props) {
  const [dragging, setDragging] = useState(false)

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) onFile(file)
    },
    [onFile]
  )

  return (
    <label
      className={clsx(
        'flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 cursor-pointer transition-colors',
        dragging
          ? 'border-violet-500 bg-violet-500/10'
          : 'border-slate-600 bg-slate-800/40 hover:border-slate-500 hover:bg-slate-800/60'
      )}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <Upload className="w-8 h-8 text-slate-400" />
      <div className="text-center">
        <p className="text-slate-300 font-medium">{label}</p>
        {accept && <p className="text-xs text-slate-500 mt-1">Accepted: {accept}</p>}
      </div>
      <input
        type="file"
        className="hidden"
        accept={accept}
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile(f) }}
      />
    </label>
  )
}
