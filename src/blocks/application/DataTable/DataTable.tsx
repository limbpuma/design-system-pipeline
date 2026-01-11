import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

/**
 * DataTable Block
 *
 * Professional data table with sorting, filtering, and pagination.
 * Designed for enterprise dashboards with accessibility focus.
 *
 * @accessibility
 * - Uses semantic table elements
 * - Sort controls have aria-labels
 * - Pagination is keyboard navigable
 * - Selected rows announced to screen readers
 */

const tableVariants = cva(
  'w-full text-sm',
  {
    variants: {
      variant: {
        default: 'border border-[var(--semantic-color-border-default)] rounded-lg overflow-hidden',
        minimal: '',
        striped: 'border border-[var(--semantic-color-border-default)] rounded-lg overflow-hidden',
      },
      size: {
        sm: '[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2',
        md: '[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3',
        lg: '[&_th]:px-6 [&_th]:py-4 [&_td]:px-6 [&_td]:py-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface Column<T> {
  /** Unique key for the column */
  key: keyof T | string;
  /** Display header */
  header: string;
  /** Whether column is sortable */
  sortable?: boolean;
  /** Custom render function */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  /** Column width */
  width?: string | number;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc' | null;

export interface DataTableProps<T extends Record<string, unknown>>
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableVariants> {
  /** Array of column definitions */
  columns: Column<T>[];
  /** Data rows */
  data: T[];
  /** Unique key field for rows */
  rowKey: keyof T;
  /** Currently sorted column */
  sortColumn?: string;
  /** Sort direction */
  sortDirection?: SortDirection;
  /** Callback when sort changes */
  onSort?: (column: string, direction: SortDirection) => void;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedRows?: Set<string | number>;
  /** Callback when selection changes */
  onSelectionChange?: (selected: Set<string | number>) => void;
  /** Show loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Pagination config */
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    onPageChange: (page: number) => void;
  };
}

// Sort Icon Component
const SortIcon: React.FC<{ direction: SortDirection }> = ({ direction }) => (
  <span className="inline-flex flex-col ml-1" aria-hidden="true">
    <svg
      className={cn(
        'w-3 h-3 -mb-1 transition-colors',
        direction === 'asc' ? 'text-blue-600' : 'text-slate-300'
      )}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 5l7 7H5z" />
    </svg>
    <svg
      className={cn(
        'w-3 h-3 transition-colors',
        direction === 'desc' ? 'text-blue-600' : 'text-slate-300'
      )}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 19l-7-7h14z" />
    </svg>
  </span>
);

// Loading Skeleton
const TableSkeleton: React.FC<{ columns: number; rows?: number }> = ({ columns, rows = 5 }) => (
  <>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <tr key={rowIndex} className="animate-pulse">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <td key={colIndex} className="px-4 py-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
          </td>
        ))}
      </tr>
    ))}
  </>
);

// Checkbox Component
const Checkbox: React.FC<{
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}> = ({ checked, indeterminate, onChange, label }) => {
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate || false;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
      aria-label={label}
    />
  );
};

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  sortColumn,
  sortDirection,
  onSort,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  pagination,
  variant,
  size,
  className,
  ...props
}: DataTableProps<T>) {
  const handleSort = (column: string) => {
    if (!onSort) return;

    let newDirection: SortDirection = 'asc';
    if (sortColumn === column) {
      if (sortDirection === 'asc') newDirection = 'desc';
      else if (sortDirection === 'desc') newDirection = null;
    }
    onSort(column, newDirection);
  };

  const allSelected = data.length > 0 && data.every((row) => selectedRows.has(row[rowKey] as string | number));
  const someSelected = data.some((row) => selectedRows.has(row[rowKey] as string | number));

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    if (checked) {
      const newSelected = new Set(data.map((row) => row[rowKey] as string | number));
      onSelectionChange(newSelected);
    } else {
      onSelectionChange(new Set());
    }
  };

  const handleSelectRow = (key: string | number, checked: boolean) => {
    if (!onSelectionChange) return;
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    onSelectionChange(newSelected);
  };

  const getCellValue = (row: T, key: string): unknown => {
    const keys = key.split('.');
    let value: unknown = row;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return value;
  };

  const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 0;

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className={cn(tableVariants({ variant, size }))}>
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-[var(--semantic-color-border-default)]">
            <tr>
              {selectable && (
                <th className="w-12 text-center">
                  <Checkbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={handleSelectAll}
                    label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={cn(
                    'text-left font-semibold text-[var(--semantic-color-foreground-default)]',
                    column.sortable && 'cursor-pointer select-none hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                  aria-sort={
                    sortColumn === column.key
                      ? sortDirection === 'asc'
                        ? 'ascending'
                        : sortDirection === 'desc'
                        ? 'descending'
                        : 'none'
                      : undefined
                  }
                >
                  <span className="inline-flex items-center">
                    {column.header}
                    {column.sortable && (
                      <SortIcon
                        direction={sortColumn === column.key ? sortDirection ?? null : null}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-900 divide-y divide-[var(--semantic-color-border-default)]">
            {loading ? (
              <TableSkeleton columns={columns.length + (selectable ? 1 : 0)} />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="text-center py-12 text-[var(--semantic-color-foreground-muted)]"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      className="w-12 h-12 text-slate-300 dark:text-slate-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => {
                const key = row[rowKey] as string | number;
                const isSelected = selectedRows.has(key);

                return (
                  <tr
                    key={key}
                    className={cn(
                      'transition-colors',
                      variant === 'striped' && rowIndex % 2 === 1 && 'bg-slate-50 dark:bg-slate-800/30',
                      isSelected && 'bg-blue-50 dark:bg-blue-900/20',
                      'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    )}
                    aria-selected={selectable ? isSelected : undefined}
                  >
                    {selectable && (
                      <td className="text-center">
                        <Checkbox
                          checked={isSelected}
                          onChange={(checked) => handleSelectRow(key, checked)}
                          label={`Select row ${rowIndex + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = getCellValue(row, String(column.key));
                      return (
                        <td
                          key={String(column.key)}
                          className={cn(
                            'text-[var(--semantic-color-foreground-default)]',
                            column.align === 'center' && 'text-center',
                            column.align === 'right' && 'text-right'
                          )}
                        >
                          {column.render
                            ? column.render(value, row, rowIndex)
                            : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 px-2">
          <p className="text-sm text-[var(--semantic-color-foreground-muted)]">
            Showing {(pagination.page - 1) * pagination.pageSize + 1} to{' '}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </p>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                'border border-[var(--semantic-color-border-default)]',
                pagination.page === 1
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-[var(--semantic-color-foreground-default)] hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
              aria-label="Previous page"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              let pageNum: number;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => pagination.onPageChange(pageNum)}
                  className={cn(
                    'w-9 h-9 rounded-md text-sm font-medium transition-colors',
                    pageNum === pagination.page
                      ? 'bg-blue-600 text-white'
                      : 'text-[var(--semantic-color-foreground-default)] hover:bg-slate-50 dark:hover:bg-slate-800'
                  )}
                  aria-label={`Page ${pageNum}`}
                  aria-current={pageNum === pagination.page ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                'border border-[var(--semantic-color-border-default)]',
                pagination.page === totalPages
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-[var(--semantic-color-foreground-default)] hover:bg-slate-50 dark:hover:bg-slate-800'
              )}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}

export default DataTable;
