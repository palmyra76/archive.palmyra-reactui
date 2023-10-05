import React, { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { TableCell } from '@mui/material';

const ColumnHeader = ({ header, children, onSortChange, onHeaderStyle }) => {

    const [sortOrder, setSortOrder] = useState('');
    const column= header.id;

    const handleSortColumn = () => {
        if (onSortChange === undefined)
            return;

        var order = sortOrder;
        switch (order) {
            case 'asc':
                order = 'desc'
                break;
            case 'desc':
                order = '';
                break;
            default:
                order = 'asc'
                break;
        }
        setSortOrder(order);
        onSortChange(column, order)
    };

    
    const headerStyle = onHeaderStyle(header.original)

    return (
        <TableCell key={header.id} colSpan={header.colSpan} style={headerStyle}>
            <div style={{ display: 'flex', gap: '5px', cursor: 'pointer' }} onClick={() => handleSortColumn()}>
                {children}
                {sortOrder === 'asc' ? (
                    <ArrowUpwardIcon style={{ fontSize: '22px', color: 'rgb(0,0,0,0.65)' }} />
                ) :
                    sortOrder === 'desc' ? (
                        <ArrowDownwardIcon style={{ fontSize: '22px', color: 'rgb(0,0,0,0.65)' }} />
                    ) : null}

            </div>
        </TableCell>
    )
}

export default ColumnHeader;
