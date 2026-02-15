'use client'

import { useState, useMemo } from 'react'
import { Study, filterStudies, getConditions, getStudyTypes } from '@/lib/evidence'

interface EvidenceTableProps {
  studies: Study[]
}

export default function EvidenceTable({ studies }: EvidenceTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [condition, setCondition] = useState('')
  const [studyType, setStudyType] = useState('')

  const conditions = useMemo(() => getConditions(studies), [studies])
  const studyTypes = useMemo(() => getStudyTypes(studies), [studies])

  const filteredStudies = useMemo(
    () => filterStudies(studies, { searchQuery, condition, studyType }),
    [studies, searchQuery, condition, studyType]
  )

  const clearFilters = () => {
    setSearchQuery('')
    setCondition('')
    setStudyType('')
  }

  const hasActiveFilters = searchQuery || condition || studyType

  return (
    <div>
      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search studies by title, author, or keyword..."
              className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-body placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
            />
          </div>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
          >
            <option value="">All Conditions</option>
            {conditions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={studyType}
            onChange={(e) => setStudyType(e.target.value)}
            className="px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
          >
            <option value="">All Study Types</option>
            {studyTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        {hasActiveFilters && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-text-muted">
              Showing {filteredStudies.length} of {studies.length} studies
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-accent-blue hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredStudies.map((study) => (
          <a
            key={study.id}
            href={study.pubmedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white border border-border rounded-xl p-5 hover:shadow-md hover:shadow-black/5 transition-all group"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent-blue transition-colors leading-snug mb-2">
                  {study.title}
                </h3>
                <p className="text-xs text-text-muted mb-2">
                  {study.authors} &middot;{' '}
                  <span className="font-medium">{study.journal}</span> &middot;{' '}
                  {study.year}
                </p>
                <p className="text-sm text-text-body leading-relaxed">
                  {study.keyFinding}
                </p>
              </div>
              <div className="flex flex-wrap md:flex-col items-start gap-2 md:text-right shrink-0">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent-teal-light text-accent-teal border border-accent-teal/20">
                  {study.studyType}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200">
                  {study.condition}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-gray-50 text-gray-600 border border-gray-200">
                  {study.stimulationType}
                </span>
              </div>
            </div>
            {study.subjects && (
              <div className="mt-3 pt-3 border-t border-border-light">
                <span className="font-mono text-[11px] text-text-light">
                  n = {study.subjects.toLocaleString()} subjects
                </span>
              </div>
            )}
          </a>
        ))}

        {filteredStudies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">No studies match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-2 text-sm text-accent-blue hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
