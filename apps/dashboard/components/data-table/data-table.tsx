import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ho/ui";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Props<TData, TColumns extends ColumnDef<TData>> = {
  data: TData[];
  columns: TColumns[];
  visibleColumns?: {
    [key in keyof TColumns["id"]]: boolean;
  };
  setVisibleColumns?: (
    columns: {
      [key in keyof TColumns["id"]]: boolean;
    },
  ) => void;
  onRowClick?: (row: TData) => void;
} & React.HTMLAttributes<HTMLTableElement>;

export function DataTable<TData, TColumns extends ColumnDef<TData>>({
  data,
  columns,
  visibleColumns,
  setVisibleColumns,
  onRowClick,
  ...rest
}: Props<TData, TColumns>) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility: visibleColumns,
    },
    getCoreRowModel: getCoreRowModel(),
    // @ts-expect-error - TODO: fix this later
    onColumnVisibilityChange: setVisibleColumns,
  });

  return (
    <Table {...rest}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => onRowClick?.(row.original)}
              className={onRowClick && "cursor-pointer"}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
