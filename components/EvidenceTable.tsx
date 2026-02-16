'use client'

import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import {
  Study,
  applyDropdownFilters,
  getConditions,
  getStudyTypes,
  getStimulationTypes,
  getYearRange,
} from '@/lib/evidence'
import CopyCitation from './CopyCitation'

interface EvidenceTableProps {
  studies: Study[]
}

export default function EvidenceTable({ studies }: EvidenceTableProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [condition, setCondition] = useState('')
  const [studyType, setStudyType] = useState('')
  const [stimulationType, setStimulationType] = useState('')
  const [sortBy, setSortBy] = useState<'year-desc' | 'year-asc' | 'relevance'>('year-desc')

  const conditions = useMemo(() => getConditions(studies), [studies])
  const studyTypes = useMemo(() => getStudyTypes(studies), [studies])
  const stimulationTypes = useMemo(() => getStimulationTypes(studies), [studies])
  const yearRange = useMemo(() => getYearRange(studies), [studies])

  const [yearMin, setYearMin] = useState(yearRange.min)
  const [yearMax, setYearMax] = useState(yearRange.max)

  // Build Fuse index for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(studies, {
        keys: [
          { name: 'title', weight: 0.35 },
          { name: 'keyFinding', weight: 0.25 },
          { name: 'authors', weight: 0.15 },
          { name: 'journal', weight: 0.1 },
          { name: 'condition', weight: 0.1 },
          { name: 'tags', weight: 0.05 },
        ],
        threshold: 0.35,
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [studies]
  )

  const filteredStudies = useMemo(() => {
    // Step 1: fuzzy search or full list
    let results: Study[]
    const isSearching = searchQuery.trim().length >= 2

    if (isSearching) {
      results = fuse.search(searchQuery).map((r) => r.item)
    } else {
      results = [...studies]
    }

    // Step 2: apply dropdown + year filters
    results = applyDropdownFilters(results, {
      condition,
      studyType,
      stimulationType,
      yearMin,
      yearMax,
    })

    // Step 3: sort (skip if searching with relevance — Fuse already ranked)
    if (isSearching && sortBy === 'relevance') {
      return results
    }
    if (sortBy === 'year-desc') {
      results.sort((a, b) => b.year - a.year)
    } else if (sortBy === 'year-asc') {
      results.sort((a, b) => a.year - b.year)
    }

    return results
  }, [studies, searchQuery, condition, studyType, stimulationType, yearMin, yearMax, sortBy, fuse])

  const clearFilters = () => {
    setSearchQuery('')
    setCondition('')
    setStudyType('')
    setStimulationType('')
    setYearMin(yearRange.min)
    setYearMax(yearRange.max)
    setSortBy('year-desc')
  }

  const hasActiveFilters =
    searchQuery ||
    condition ||
    studyType ||
    stimulationType ||
    yearMin !== yearRange.min ||
    yearMax !== yearRange.max

  const activeFilterCount = [
    condition,
    studyType,
    stimulationType,
    yearMin !== yearRange.min || yearMax !== yearRange.max ? 'year' : '',
  ].filter(Boolean).length

  return (
    <div>
      {/* Search */}
      <div className="bg-white border border-border rounded-xl p-6 mb-4">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              if (e.target.value.trim().length >= 2) setSortBy('relevance')
            }}
            placeholder="Search studies — try &quot;depression&quot;, &quot;taVNS anxiety&quot;, or &quot;anti-inflammatory&quot;..."
            className="w-full pl-10 pr-4 py-3 bg-bg-primary border border-border rounded-lg text-sm text-text-body placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSortBy('year-desc')
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-text-light hover:text-text-muted"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-border rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Condition */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-light mb-1.5">
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
            >
              <option value="">All Conditions</option>
              {conditions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Study Type */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-light mb-1.5">
              Study Type
            </label>
            <select
              value={studyType}
              onChange={(e) => setStudyType(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
            >
              <option value="">All Types</option>
              {studyTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Stimulation Type */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-light mb-1.5">
              Stimulation
            </label>
            <select
              value={stimulationType}
              onChange={(e) => setStimulationType(e.target.value)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
            >
              <option value="">All Types</option>
              {stimulationTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <label className="block font-mono text-[10px] tracking-[0.1em] uppercase text-text-light mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="w-full px-3 py-2 bg-bg-primary border border-border rounded-lg text-sm text-text-body focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal transition-colors"
            >
              <option value="year-desc">Newest First</option>
              <option value="year-asc">Oldest First</option>
              {searchQuery.trim().length >= 2 && (
                <option value="relevance">Relevance</option>
              )}
            </select>
          </div>
        </div>

        {/* Year range */}
        <div className="mt-4 pt-4 border-t border-border-light">
          <div className="flex items-center gap-4">
            <label className="font-mono text-[10px] tracking-[0.1em] uppercase text-text-light shrink-0">
              Year Range
            </label>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="number"
                value={yearMin}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  if (!isNaN(v)) setYearMin(Math.max(yearRange.min, Math.min(v, yearMax)))
                }}
                min={yearRange.min}
                max={yearMax}
                className="w-20 px-2 py-1.5 bg-bg-primary border border-border rounded-lg text-sm text-text-body font-mono text-center focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal"
              />
              <div className="flex-1 relative px-1">
                <div className="h-1 bg-border-light rounded-full" />
                <div
                  className="absolute top-0 h-1 bg-accent-teal/40 rounded-full"
                  style={{
                    left: `${((yearMin - yearRange.min) / (yearRange.max - yearRange.min)) * 100}%`,
                    right: `${100 - ((yearMax - yearRange.min) / (yearRange.max - yearRange.min)) * 100}%`,
                  }}
                />
              </div>
              <input
                type="number"
                value={yearMax}
                onChange={(e) => {
                  const v = parseInt(e.target.value)
                  if (!isNaN(v)) setYearMax(Math.min(yearRange.max, Math.max(v, yearMin)))
                }}
                min={yearMin}
                max={yearRange.max}
                className="w-20 px-2 py-1.5 bg-bg-primary border border-border rounded-lg text-sm text-text-body font-mono text-center focus:outline-none focus:ring-2 focus:ring-accent-teal/20 focus:border-accent-teal"
              />
            </div>
          </div>
        </div>

        {/* Active filters summary */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-text-muted">
                {filteredStudies.length} of {studies.length} studies
              </span>
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-accent-teal-light text-accent-teal">
                  {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''} active
                </span>
              )}
              {/* Active filter pills */}
              {condition && (
                <button
                  onClick={() => setCondition('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {condition}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {studyType && (
                <button
                  onClick={() => setStudyType('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent-teal-light text-accent-teal border border-accent-teal/20 hover:bg-accent-teal/10 transition-colors"
                >
                  {studyType}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              {stimulationType && (
                <button
                  onClick={() => setStimulationType('')}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  {stimulationType}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            <button
              onClick={clearFilters}
              className="text-sm text-accent-blue hover:underline shrink-0 ml-4"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="space-y-3">
        {filteredStudies.map((study) => {
          const primaryUrl = study.doi || study.pubmedUrl
          const primaryLabel = study.doi ? 'DOI' : 'PubMed'
          const hasSecondaryLink = !!study.doi

          return (
            <div
              key={study.id}
              className="bg-white border border-border rounded-xl p-5 hover:shadow-md hover:shadow-black/5 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-text-primary leading-snug mb-2">
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

              <div className="mt-3 pt-3 border-t border-border-light flex items-center justify-between gap-4">
                {study.subjects ? (
                  <span className="font-mono text-[11px] text-text-light">
                    n = {study.subjects.toLocaleString()} subjects
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-3 shrink-0">
                  <CopyCitation
                    authors={study.authors}
                    title={study.title}
                    journal={study.journal}
                    year={study.year}
                    doi={study.doi}
                    pubmedUrl={study.pubmedUrl}
                  />
                  {hasSecondaryLink && (
                    <a
                      href={study.pubmedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-text-muted hover:text-accent-blue transition-colors"
                    >
                      PubMed
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                  <a
                    href={primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium bg-accent-blue/10 text-accent-blue hover:bg-accent-blue/20 transition-colors"
                  >
                    View Study
                    <span className="font-mono text-[10px] opacity-70">({primaryLabel})</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          )
        })}

        {filteredStudies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">No studies match your search.</p>
            {searchQuery && (
              <p className="text-sm text-text-light mt-1">
                Try broadening your search or removing some filters.
              </p>
            )}
            <button
              onClick={clearFilters}
              className="mt-3 text-sm text-accent-blue hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
