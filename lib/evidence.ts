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
  doi?: string
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

export function getStimulationTypes(studies: Study[]): string[] {
  const types = new Set(studies.map((s) => s.stimulationType))
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

export interface StudyFilters {
  condition?: string
  studyType?: string
  stimulationType?: string
  yearMin?: number
  yearMax?: number
}

export function applyDropdownFilters(
  studies: Study[],
  filters: StudyFilters
): Study[] {
  return studies.filter((study) => {
    if (filters.condition && study.condition !== filters.condition) return false
    if (filters.studyType && study.studyType !== filters.studyType) return false
    if (filters.stimulationType && study.stimulationType !== filters.stimulationType) return false
    if (filters.yearMin && study.year < filters.yearMin) return false
    if (filters.yearMax && study.year > filters.yearMax) return false
    return true
  })
}
