interface KeyFindingProps {
  children: React.ReactNode
}

export default function KeyFinding({ children }: KeyFindingProps) {
  return (
    <div className="key-finding border-l-[3px] border-accent-teal bg-accent-teal-light rounded-r-lg p-5 my-8">
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="text-sm font-medium text-text-primary leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}
