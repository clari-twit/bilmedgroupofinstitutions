import React, { useRef, useState } from 'react';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useSelector } from 'react-redux';

const customTableStyle = {
  tableCellStyle: {
    textWrap: 'nowrap'
  },
  addExtraTableCellStyle: {
    minWidth: '100px'
  },
  iconStyle: {
    color: 'var(--gray)'
  },
  subTableCellStyle: {
    borderBottom: 'unset',
  },
  firstCellIconButtonStyle: {
    padding: '0'
  },
  arrowIconBoxStyle: {
    textAlign: 'right',
    position: 'fixed',
    bottom: '40px',
    right: '40px',
    zIndex: 3,
    cursor: 'pointer',
    padding: '12px',
    backgroundColor: 'var(--neutral)',
    borderRadius: '50%'
  },
  arrowIconStyle: {
    display: 'flex',
    justifyContent: 'center',
  }
}

function CustomTable({ columnsData, overflowX, importData, iconOfCollapsibleTable, firstIconInTheTable, nameHeaderOfIconInTable, StarBorderIcon, nameHeaderOfCollapsibleTable, KeyboardArrowDownIcon, KeyboardArrowUpIcon, isPagination, isInfinitivePagination, padding, handleRowClick }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openSubTable, setOpenSubTable] = useState(false);
  const scrollRef = useRef();
  const slectedRow = useSelector((state => state?.tableRowSelect?.tableRowSelect?.id));

  // A function to change the page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // A function to change the row per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // {UpperArrow Function to scroll top}
  const handleArrowUpClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tableCellStyle = {
    ...customTableStyle.tableCellStyle,
    padding: padding !== undefined ? padding : '16px',
  };
  const tablesData = isInfinitivePagination ? importData : importData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {importData?.length > 0 && (
        <TableContainer component="div" sx={{ ...(isPagination ? {} : { overflowX: overflowX || 'initial' }) }} ref={scrollRef} className="tabView">
          {/* Main table */}
          <Table stickyHeader aria-label="sticky table" minWidth="1000px">
            <TableHead>
              <TableRow>
                {/* In the header name of the table that contains the icon */}
                {firstIconInTheTable === true && <TableCell sx={customTableStyle.addExtraTableCellStyle}>{nameHeaderOfIconInTable}</TableCell>}
                {/* In the header name of the collapsible table */}
                {iconOfCollapsibleTable === true &&
                  <TableCell sx={customTableStyle.addExtraTableCellStyle}>{nameHeaderOfCollapsibleTable}</TableCell>}
                {/* In the header name of the table */}
                {columnsData?.map((column) => (
                  <TableCell
                    key={column}
                    sx={tableCellStyle}
                    minWidth={(column.headerName === 'Avatar' ? '50px' : '200px') && (column.headerName === 'Status' ? '500px' : '200px')}
                    width={column.field === 'checkbox' ? '50px' : 'unset'}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="tabViewScrollY">
              {tablesData?.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    onClick={handleRowClick ? (event) => handleRowClick(event, row) : undefined}
                    style={{
                      backgroundColor: slectedRow === row?.id ? 'var(--fullLightGray)' : 'var(--white)',
                    }}
                  >
                    {/* The name of the icon is inside the table */}
                    {firstIconInTheTable === true && <TableCell sx={customTableStyle.addExtraTableCellStyle}><StarBorderIcon sx={customTableStyle.iconStyle} /></TableCell>}
                    {/* The name of the icon is inside the collapsible table */}
                    {iconOfCollapsibleTable === true &&
                      <TableCell sx={customTableStyle.subTableCellStyle}>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          sx={customTableStyle.firstCellIconButtonStyle}
                          onClick={() => setOpenSubTable(!openSubTable)}
                        >
                          {openSubTable ? <KeyboardArrowUpIcon sx={customTableStyle.iconStyle} /> : <KeyboardArrowDownIcon sx={customTableStyle.iconStyle} />}
                        </IconButton>
                      </TableCell>}
                    {/* The name of the data is inside the table */}
                    {columnsData?.map((column) => {
                      const res = column?.valueGetter ? column.valueGetter(row) : row?.[column.field] ?? '';
                      return (
                        <TableCell key={column.field} sx={{ ...tableCellStyle, borderBottom: iconOfCollapsibleTable === true ? 'unset' : '1px solid rgba(224, 224, 224, 1)' }}>
                          {/* Check if the field is an image */}
                          {column.is_image ? (
                            <img src={res} alt="" style={{ ...column.style }} />
                          ) : (
                            res
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {/* Collapsible table */}
                  {iconOfCollapsibleTable === true &&
                    <TableRow>
                      <TableCell colSpan={columnsData.length + 1}>
                        <Collapse in={openSubTable} timeout="auto" unmountOnExit>
                          <Box marginY={1}>
                            <Typography variant="h6" gutterBottom component="div">
                              History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableBody>
                                <TableRow>
                                  <TableCell>BOM Number {index + 1}</TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>}
                </React.Fragment>
              ))}
            </TableBody>
            {/* {ArrowButton to Scroll top} */}
            {isInfinitivePagination &&
              <Box
                sx={customTableStyle.arrowIconBoxStyle}
                onClick={handleArrowUpClick}
              >
                <ArrowUpwardIcon sx={customTableStyle.arrowIconStyle} />
              </Box>}
          </Table>
        </TableContainer>
      )}
      {/* ----Table pagination for---- */}
      {
        isPagination && importData?.length > 0 && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={importData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )
      }
    </>
  );
}

export default CustomTable;
