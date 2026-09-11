export type SortOption = 'relevance' | 'latest' | 'top_sales' | 'price_asc' | 'price_desc'

export interface CatalogFilterState {
  query: string
  category: string
  locations: string[]
  minPrice: number | null
  maxPrice: number | null
  minRating: number | null
  freeShipping: boolean
  isCod: boolean
  discountOnly: boolean
  sort: SortOption
}

export const DEFAULT_FILTERS: CatalogFilterState = {
  query: '',
  category: '',
  locations: [],
  minPrice: null,
  maxPrice: null,
  minRating: null,
  freeShipping: false,
  isCod: false,
  discountOnly: false,
  sort: 'relevance',
}

