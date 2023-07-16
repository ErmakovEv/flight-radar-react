import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ISheduleRow from '../SheduleModal/SheduleModal.types';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        sx={{ color: 'var(--main-color)' }}
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        sx={{ color: 'var(--main-color)' }}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight sx={{ color: 'var(--main-color)' }} />
        ) : (
          <KeyboardArrowLeft sx={{ color: 'var(--main-color)' }} />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        sx={{ color: 'var(--main-color)' }}
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        sx={{ color: 'var(--main-color)' }}
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

type CustomPaginationActionsTableProps = {
  rows: Partial<ISheduleRow>[];
  type: boolean;
};

function convertMillisecondsToTime(time: number) {
  return `${(Math.floor(time / 3600) % 24)
    .toString()
    .padStart(2, '0')}:${Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, '0')}`;
}

export default function CustomPaginationActionsTable({
  rows,
  type,
}: CustomPaginationActionsTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        minWidth: '90%',
        backgroundColor: 'var(--sec-bg-color)',
        color: 'var(--main-text-color)',
      }}
    >
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow
            sx={{
              color: 'var(--icao-bg-color)',
              fontFamily: 'Roboto',
            }}
          >
            {type ? <FlightLandIcon /> : <FlightTakeoffIcon />}
          </TableRow>
          <TableRow
            sx={{
              backgroundColor: 'var(--main-color)',
              color: 'var(--main-text-color)',
            }}
          >
            <TableCell align="center">Time</TableCell>
            <TableCell align="center">Flight</TableCell>
            <TableCell align="center">{type ? 'From' : 'To'}</TableCell>
            <TableCell align="center">Airline</TableCell>
            <TableCell align="center">Aircraft</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row?.flight?.identification.row}>
              <TableCell
                style={{
                  maxWidth: 30,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {type
                  ? convertMillisecondsToTime(
                      row?.flight?.time.scheduled.arrival || 0
                    )
                  : convertMillisecondsToTime(
                      row?.flight?.time.scheduled.departure || 0
                    )}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: 50,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {row?.flight?.identification.number.default}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: 85,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {type
                  ? row.flight?.airport?.origin?.name?.slice(0, 15) || 'N/A'
                  : row.flight?.airport?.destination?.name?.slice(0, 15) ||
                    'N/A'}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: 50,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {row.flight?.airline?.name || 'N/A'}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: 50,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {row?.flight?.aircraft.registration}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: 50,
                  padding: 5,
                  color: 'var(--main-text-color)',
                }}
              >
                {row?.flight?.status.text}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={6}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              style={{ color: 'var(--main-color)' }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}