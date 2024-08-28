import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/system';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary?.main || '#1976d2',
  color: theme.palette.common?.white || '#ffffff', 
  padding: theme.spacing(1),
  position:'sticky'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action?.hover || '#f5f5f5',
  },
  height: 40, 
}));

const ReposTable = ({ repos }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 2,maxHeight:500 }}>
      <Table stickyHeader size="small" sx={{ minWidth: 650 }} aria-label="GitHub Repositories Table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Repository Name</StyledTableCell>
            <StyledTableCell align="left">Language</StyledTableCell>
            <StyledTableCell align="left">Created At</StyledTableCell>
            <StyledTableCell align="left">Updated At</StyledTableCell>
            <StyledTableCell align="left">Stars</StyledTableCell>
            <StyledTableCell align="left">Forks</StyledTableCell>
            <StyledTableCell align="left">Open Issues</StyledTableCell>
            <StyledTableCell align="left">Repo Link</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((repo) => (
              <StyledTableRow key={repo.id}>
                <TableCell component="th" scope="row">
                  {repo.name}
                </TableCell>
                <TableCell align="left">{repo.language || 'N/A'}</TableCell>
                <TableCell align="left">
                  {new Date(repo.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{repo.stargazers_count}</TableCell>
                <TableCell align="left">{repo.forks_count}</TableCell>
                <TableCell align="left">{repo.open_issues_count}</TableCell>
                <TableCell align="left">
                  <Link href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    repos
                  </Link>
                </TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
      
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={repos.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ReposTable;
