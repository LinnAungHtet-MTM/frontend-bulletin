export interface PaginationMeta {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
}

export interface SearchType {
  name?: string;
  email?: string;
  role?: number;
  start_date?: string;
  end_date?: string;
}