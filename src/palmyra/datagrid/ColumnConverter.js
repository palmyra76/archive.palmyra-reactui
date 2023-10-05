import {
    createColumnHelper
} from '@tanstack/react-table'

import { getFormatFn } from './CellFormatter';

const columnHelper = createColumnHelper();

function generateColumns(columnDefs){
    return columnDefs.map(def => convert(def));
}

function convert(columnDef){
    //TODO -- reformat this code - break into three functions
    // getHeader, getFooter, getCellRenderer
    var renderer = columnDef.cellRenderer;
    if(renderer){
        let header = columnDef.header;
        if(header){
            header = {header:header}
        }else
            header = getHeader(columnDef);
        return columnHelper.display({
            id: columnDef.name,
            ...header,
            cell: renderer
          });
    }

    let header = getHeader(columnDef);
    let cell = getFormatFn(columnDef);
    return columnHelper.accessor(columnDef.name, {
        id:columnDef.name,
       ...header, ...cell
      });
}


function getHeader(columnDef){
    let header = columnDef.label;
    return {header: () => <span>{header}</span>, 
    footer: info => info.column.id};
}

export {generateColumns}