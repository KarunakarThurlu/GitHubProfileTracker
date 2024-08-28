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
  Avatar,
} from '@mui/material';
import { styled } from '@mui/system';
import UserProfile from './UserProfile';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary?.main || '#1976d2',
  color: theme.palette.common?.white || '#ffffff',
  padding: theme.spacing(1),
  position: 'sticky'
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action?.hover || '#f5f5f5',
  },
  height: 40,
}));

const ReposTable = ({ repos }) => {

  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 10,
    showProfile: false
  })

  const handleChangePage = (event, newPage) => {
    setState(prevState=>({...prevState,page:newPage}))
  };

  const handleChangeRowsPerPage = (event) => {
    setState(prevState=>({...prevState,page:0,rowsPerPage:parseInt(event.target.value, 10)}))
  };
  const showUserProfile=()=>{
    setState(prevState=>({...prevState,showProfile:true}))
  }

  return (
    <>
      {state.showProfile && <UserProfile />}
      <TableContainer component={Paper} sx={{ marginTop: 2, maxHeight: 500 }}>
        <Table stickyHeader size="small" sx={{ minWidth: 650 }} aria-label="GitHub Repositories Table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Repository Name</StyledTableCell>
              <StyledTableCell align="left">Owner</StyledTableCell>
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
            {repos?.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
              .map((repo) => (
                <StyledTableRow key={repo.id}>
                  <TableCell component="th" scope="row">
                    {repo.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Avatar
                      alt="Profile Image"
                      src={repo.owner?.avatar_url}
                      sx={{ width: 40, height: 40, cursor: 'pointer' }}
                      onClick={showUserProfile}
                    />
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
                      Repo Link
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
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

    </>
  );
};

export default ReposTable;
