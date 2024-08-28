import React, { useContext } from 'react';
import { Box, Avatar, Typography, Grid, Link, Paper } from '@mui/material';
import UserContext from '../context/UserContext';

const Profile = () => {
    const { globalState } = useContext(UserContext);
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 1,
            maxWidth: 800,
            margin: '0 auto',
          }}
        >
          <Avatar
            src={globalState.userObject.avatar_url}
            alt={globalState.userObject.login}
            sx={{ width: 150, height: 150, marginBottom: 2 }}
          />
          <Typography variant="h4" align="center">
            {globalState.userObject.name}
          </Typography>
          <Typography variant="body1" align="center" sx={{ marginBottom: 2 }}>
            {globalState.userObject.bio}
          </Typography>
    
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Username:</Typography>
                <Typography variant="body1">{globalState.userObject.login}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Company:</Typography>
                <Typography variant="body1">{globalState.userObject.company}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Location:</Typography>
                <Typography variant="body1">{globalState.userObject.location}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Followers:</Typography>
                <Typography variant="body1">{globalState.userObject.followers}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Following:</Typography>
                <Typography variant="body1">{globalState.userObject.following}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ padding: 2 ,minHeight: 50}}>
                <Typography variant="subtitle2">Repositories:</Typography>
                <Typography variant="body1">{globalState.userObject.public_repos}</Typography>
              </Paper>
            </Grid>
          </Grid>
    
          <Link
            href={globalState.userObject.html_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ marginTop: 2, textDecoration: 'none', color: 'primary.main' }}
          >
            View GitHub Profile
          </Link>
        </Box>
      );
};

export default Profile;
