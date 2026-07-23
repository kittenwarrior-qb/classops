export function vietnameseNameKey(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const given = parts[parts.length - 1]
  return [given, ...parts.slice(0, -1)].join(' ')
}

export function sortByVietnameseName<T>(items: T[], getName: (item: T) => string): T[] {
  const collator = new Intl.Collator('vi', { sensitivity: 'base' })
  return [...items].sort((a, b) => collator.compare(vietnameseNameKey(getName(a)), vietnameseNameKey(getName(b))))
}

export function removeDiacritics(value: string): string {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
}

export function matchesSearch(text: string, query: string): boolean {
  const normalize = (value: string) => removeDiacritics(value).toLowerCase().trim()
  return normalize(text).includes(normalize(query))
}
