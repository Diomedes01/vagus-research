interface TopicTagProps {
  topic: string
  clickable?: boolean
  size?: 'sm' | 'md'
}

const topicColors: Record<string, string> = {
  Foundation: 'bg-blue-50 text-blue-700 border-blue-200',
  Safety: 'bg-green-50 text-green-700 border-green-200',
  Anxiety: 'bg-purple-50 text-purple-700 border-purple-200',
  Depression: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Sleep: 'bg-sky-50 text-sky-700 border-sky-200',
  Inflammation: 'bg-orange-50 text-orange-700 border-orange-200',
  Recovery: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Neuroplasticity: 'bg-pink-50 text-pink-700 border-pink-200',
  'Gut Health': 'bg-amber-50 text-amber-700 border-amber-200',
  Pain: 'bg-red-50 text-red-700 border-red-200',
  Epilepsy: 'bg-violet-50 text-violet-700 border-violet-200',
  'Heart Health': 'bg-rose-50 text-rose-700 border-rose-200',
}

const defaultColor = 'bg-gray-50 text-gray-700 border-gray-200'

export default function TopicTag({ topic, size = 'sm' }: TopicTagProps) {
  const colorClass = topicColors[topic] || defaultColor

  return (
    <span
      className={`inline-flex items-center border rounded-full font-medium ${colorClass} ${
        size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : 'px-3 py-1 text-xs'
      }`}
    >
      {topic}
    </span>
  )
}
