import React, { useEffect, useState } from 'react';
import { TablePagination, TextField, InputAdornment, Button, Tooltip, ClickAwayListener } from '@mui/material';
import { generateColumns } from './ColumnConverter';
import { AiOutlineSearch } from 'react-icons/ai';
import { default as defaultEmptyChild } from './EmptyChildTable';
import TableX from "../datagrid/TableX";
import MenuIcon from '@mui/icons-material/Menu';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import DensityLargeIcon from '@mui/icons-material/DensityLarge';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';

function Gridx(props, options) {
  const { columns,children, EmptyChild, store, onRowClick, pageSize, quickSearch } = props;

  const [totalData, setTotalData] = useState(null);
  const [filter, setFilter] = useState({});
  const [sortOrder, setSortOrder] = useState({});
  const EmptyChildContainer = EmptyChild || defaultEmptyChild;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDensity, setSelectedDensity] = useState('standard');

  var pageSizeOptions = pageSize instanceof Array ? pageSize : [pageSize];
  var defaultPageSize = pageSize instanceof Array ? pageSize[0] : pageSize;

  const [page, setPage] = useState({
    pageNo: 0, pageSize: defaultPageSize
  });

  const nextPage = (event, newPage) => {
    setPage({ ...page, pageNo: newPage });
    setQuery({ ...page, pageSize: newPage });
  };

  const [query, setQuery] = useState({});
  const [data, setData] = useState(() => []);

  useEffect(() => {
    refreshData();
  }, [query, filter, sortOrder])

  const columnDefs = generateColumns(columns);

  const refreshData = () => {
    const params = { page, filter, sortOrder };
    store.query(params, (d) => {
      setData(d.result);
      setTotalData(d.total);
    });
  }

  const handleDensityChange = (density) => {
    setSelectedDensity(density);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleRowDensityChange = () => {
    if (selectedDensity === 'compact') {
      return { padding: '7px' };
    } else if (selectedDensity === 'comfortable') {
      return { padding: '30px', fontSize: '18px' };
    } else {
      return { padding: '15px' };
    }
  }

  const handleHeaderDensityChange = () => {
    if (selectedDensity === 'compact') {
      return { padding: '7px' };
    } else if (selectedDensity === 'comfortable') {
      return { padding: '30px', fontSize: '18px' };
    } else {
      return { padding: '15px' };
    }
  }

  const handleFilter = (event) => {
    const val = event.target.value;
    const key = quickSearch
    setFilter({ [key]: val });
  };

  const handleRowClick = (rowData) => {
    if (onRowClick) {
      onRowClick(rowData);
    }
  }
  const handleRowsPerPageChange = (event) => {
    const newPage = parseInt(event.target.value, 10);
    setPage({ ...page, pageSize: newPage });
  }

  const onSortColumn = (sortOrder) => {
    setSortOrder(sortOrder);
  }

  const onExportClick = () => {
    console.log('Export Clicked');
  }

  const width = 200;
  const visiblePagination = !!pageSize;
  const visibleFilter = !!quickSearch;
  return (
    <div>
      {null != data ? data.length == 0 ? (
        <EmptyChildContainer />
      ) : (
        <div>
          {children}
          <div className='grid-header'>
            <div className='grid-header-filter'>
              {visibleFilter && (
                <TextField
                  sx={{ width: width }}
                  type="text"
                  value={filter.quickSearch}
                  onChange={handleFilter}
                  style={{ border: "0px" }}
                  size="small"
                  placeholder="Name"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AiOutlineSearch className="card-filter-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            </div>
            <ClickAwayListener onClickAway={() => { setDropdownOpen(false) }}>
              <div className='grid-header-button' onClick={toggleDropdown}>
                <Tooltip title='Density' placement='top'>
                  <Button className='grid-btn' disableRipple>
                    <MenuIcon className='grid-button-icon' />
                  </Button>
                </Tooltip>
                {dropdownOpen && (
                  <div className="density-dropdown-content">
                    <ul>
                      <li onClick={() => handleDensityChange('standard')}>
                        <MenuIcon className='density-icon' />
                        <span className='drodown-content-text'>Standard</span>
                      </li>
                      <li onClick={() => handleDensityChange('compact')}>
                        <DensitySmallIcon className='density-icon' />
                        <span className='drodown-content-text'>Compact</span>
                      </li>
                      <li onClick={() => handleDensityChange('comfortable')}>
                        <DensityLargeIcon className='density-icon' />
                        <span className='drodown-content-text'>Comfortable</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </ClickAwayListener>
            <div className='grid-header-button' onClick={onExportClick}>
              <Tooltip title='Export' placement='top'>
                <Button className='grid-btn' disableRipple>
                  <FileDownloadOutlinedIcon className='grid-button-icon' />
                </Button>
              </Tooltip>
            </div>
            <div className='grid-filter'>
              {visiblePagination && (
                <TablePagination
                  component="div"
                  count={totalData}
                  page={page.pageNo}
                  onPageChange={nextPage}
                  rowsPerPage={page.pageSize}
                  rowsPerPageOptions={pageSizeOptions || []}
                  onRowsPerPageChange={handleRowsPerPageChange}
                />
              )}
            </div>
          </div>
          <TableX columnDefs={columnDefs}
            rowData={data} onRowClick={handleRowClick} onRowStyle={handleRowDensityChange}
            onHeaderStyle={handleHeaderDensityChange} onSortColumn={onSortColumn}
          />
        </div>) : (<div></div>)}
    </div>
  )
}

export default Gridx;