import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper';
import './Grid.css';
import ColumnHeader from './ColumnHeader'

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


function TableX({ columnDefs, rowData, onRowClick, onRowStyle, onHeaderStyle, onSortColumn }) {
  const table = useReactTable({
    data: rowData,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel(),
  })

  const [sortColumn, setSortColumn] = useState({});

  useEffect(() => {
    onSortColumn(sortColumn);
  }, [sortColumn])

  const onSortChange = (column, sortOrder) => {
    var sort = { ...sortColumn };

    if (sortOrder == '') {
      delete sort[column];
    } else {
      sort[column] = sortOrder;
    }
    setSortColumn(sort);
  }


  const onSort = onSortColumn ? onSortChange : undefined;

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className='table'>
          <TableHead className='table-head'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    header.isPlaceholder ? null : (
                      <ColumnHeader header={header}
                        onSortChange={onSort}
                        onHeaderStyle={onHeaderStyle}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </ColumnHeader>
                    )
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody >
            {
              table.getRowModel().rows
                .map(row => {
                  const rowStyle = onRowStyle(row.original);
                  return (
                    <TableRow key={row.id} className='table-row' >
                      {row.getVisibleCells().map(cell => {
                        return (
                          <TableCell key={cell.id} style={rowStyle} onClick={() => onRowClick(row.original)}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}

                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TableX;