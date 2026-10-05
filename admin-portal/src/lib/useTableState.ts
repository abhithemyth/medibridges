import { useMemo, useState } from 'react'

type SortDir = 'asc' | 'desc'

interface Options<T> {
  data: T[]
  pageSize?: number
  searchKeys: (keyof T)[]
  initialSort?: { key: keyof T; dir: SortDir }
}

export function useTableState<T>({ data, pageSize = 8, searchKeys, initialSort }: Options<T>) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<{ key: keyof T; dir: SortDir } | null>(initialSort ?? null)

  const filtered = useMemo(() => {
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((k) => String(row[k] ?? '').toLowerCase().includes(q))
    )
  }, [data, query, searchKeys])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    const arr = [...filtered]
    arr.sort((a, b) => {
      const av = a[sort.key]
      const bv = b[sort.key]
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av
      }
      const as = String(av ?? '').toLowerCase()
      const bs = String(bv ?? '').toLowerCase()
      return sort.dir === 'asc' ? as.localeCompare(bs) : bs.localeCompare(as)
    })
    return arr
  }, [filtered, sort])

  const total = sorted.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(page, pageCount)
  const paged = sorted.slice((safePage - 1) * pageSize, safePage * pageSize)

  function toggleSort(key: keyof T) {
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: 'asc' }
      if (prev.dir === 'asc') return { key, dir: 'desc' }
      return null
    })
    setPage(1)
  }

  function updateQuery(v: string) {
    setQuery(v)
    setPage(1)
  }

  return {
    query,
    setQuery: updateQuery,
    page: safePage,
    setPage,
    sort,
    toggleSort,
    rows: paged,
    total,
    pageSize,
    filtered: sorted,
  }
}
