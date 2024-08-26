import  React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserContext from '../context/UserContext';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import ChartUtil from '../utils/ChartUtil';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  margin:'10px',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {

  const {globalState} = useContext(UserContext)
  const accountCreatedAt = globalState.userObject.created_at?dayjs(globalState.userObject?.created_at).format('DD MMMM YYYY HH:mm:ss'):'';
  const accountUpdatedAt = globalState.userObject.created_at?dayjs(globalState.userObject?.updated_at).format('DD MMMM YYYY HH:mm:ss'):'';
 
  return (
    <Box sx={{marginTop:'0.5ch' }}>
      <Grid container >
        <Grid item xs={4} >
          <Item> <Typography variant='h6'>Followers : {globalState.userObject?.followers}</Typography> </Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <Typography variant='h6'>Following : {globalState.userObject?.following}</Typography></Item>
        </Grid>
        <Grid item xs={4}>
          <Item> <Typography variant='h6'>Repositories : {globalState.userObject?.public_repos}</Typography></Item>
        </Grid>
        <Grid item xs={6} >
          <Item> <Typography variant='h6'>Account Created At :  {accountCreatedAt}</Typography> </Item>
        </Grid>
        <Grid item xs={6} >
          <Item> <Typography variant='h6'>Updated At :  {accountUpdatedAt}</Typography> </Item>
        </Grid>
        <Grid item xs={12}>
          <Item><ChartUtil  chartData={globalState.columnChartData}/> </Item>
        </Grid>
      </Grid>
    </Box>
  );
}