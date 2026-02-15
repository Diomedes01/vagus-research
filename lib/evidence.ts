export interface Study {
  id: string
  title: string
  authors: string
  journal: string
  year: number
  condition: string
  studyType: string
  subjects: number | null
  keyFinding: string
  pubmedUrl: string
  stimulationType: string
  tags: string[]
}

export function getConditions(studies: Study[]): string[] {
  const conditions = new Set(studies.map((s) => s.condition))
  return Array.from(conditions).sort()
}

export function getStudyTypes(studies: Study[]): string[] {
  const types = new Set(studies.map((s) => s.studyType))
  return Array.from(types).sort()
}

export function getJournals(studies: Study[]): string[] {
  const journals = new Set(studies.map((s) => s.journal))
  return Array.from(journals).sort()
}

export function getYearRange(studies: Study[]): { min: number; max: number } {
  const years = studies.map((s) => s.year)
  return { min: Math.min(...years), max: Math.max(...years) }
}

export function filterStudies(
  studies: Study[],
  filters: {
    condition?: string
    studyType?: string
    yearMin?: number
    yearMax?: number
    searchQuery?: string
  }
): Study[] {
  return studies.filter((study) => {
    if (filters.condition && study.condition !== filters.condition) return false
    if (filters.studyType && study.studyType !== filters.studyType) return false
    if (filters.yearMin && study.year < filters.yearMin) return false
    if (filters.yearMax && study.year > filters.yearMax) return false
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        study.title.toLowerCase().includes(query) ||
        study.authors.toLowerCase().includes(query) ||
        study.journal.toLowerCase().includes(query) ||
        study.keyFinding.toLowerCase().includes(query) ||
        study.condition.toLowerCase().includes(query)
      )
    }
    return true
  })
}
