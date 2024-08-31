import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import InputAdornment from '@mui/material/InputAdornment';
import Drawer from '@mui/material/Drawer';
import SideMenu from './SideMenu';
import { Box, TextField, Avatar, Grid } from '@mui/material';
import UserContext from '../context/UserContext';
import UserProfile from './UserProfile';
import Notifier from '../utils/Notifier';
import SearchField from './SearchField';

const AppHeader = () => {

  const [state, setState] = useState({
    drawerOpen: false,
    gitHubUserName: '',
    chipValue: '',
    showUserProfile: false,
    searchApplied: false,
    showWarning: false,
    warningMessage: '',
    messageSeverity: ''
  });

  const { getUserProfile, globalState, clearUserData } = useContext(UserContext);

  const toggleDrawer = (open) => (event) => {
    setState(prevState => ({ ...prevState, drawerOpen: open }))
  };

  const handleChange = (e) => {
    setState(prevState => ({ ...prevState, gitHubUserName: e.target.value }))
  }

  const clearSearch = () => {
    setState(prevState => ({ ...prevState, searchApplied: false, gitHubUserName: '', chipValue: '' }))
    clearUserData()
  }

  const handleSearch = () => {
    if (state.gitHubUserName !== '') {
      getUserProfile(state.gitHubUserName)
      setState(prevState => ({
        ...prevState,
        searchApplied: true,
        chipValue: state.gitHubUserName,
        gitHubUserName: '',
        showWarning:false,
        warningMessage:'',
        messageSeverity:''
      }))
    } else {
      setState(prevState => ({ ...prevState, showWarning: true, warningMessage: "Please enter github user name!", messageSeverity: 'warning' }))
    }

  }
  const closeUserProfile = () => {
    setState(prevState => ({ ...prevState, showUserProfile: false }))
  }
  const showUserProfile = () => {
    setState(prevState => ({ ...prevState, showUserProfile: true }))
  }

  const handleNotifierClose = () => {
    setState(prevState => ({ ...prevState, showWarning: false }))
  }

  return (
    <>
      <Notifier open={state.showWarning} onClose={handleNotifierClose} message={state.warningMessage} severity={state.messageSeverity} />
      <UserProfile open={state.showUserProfile} onClose={closeUserProfile} />
      <AppBar position="static" color='primary'>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: { xs: 2, sm: 0 },
                  justifyContent: { xs: 'center', sm: 'flex-start' }, // Center on mobile, left-align on larger screens
                }}
              >
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ marginLeft: { xs: 1, sm: 1 } }}>
                  GitHub Profile Tracker
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" justifyContent={{ xs: 'center', sm: 'flex-end' }} flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
              <TextField
                size='small'
                id="outlined-uncontrolled"
                value={state.gitHubUserName}
                placeholder={state.chipValue === '' ? 'Enter GitHub User Name':''}
                onChange={handleChange}
                sx={{ marginBottom: { xs: 1, sm: 0 }, bgcolor: 'white', borderRadius: 1, width: { xs: '100%', sm: 300 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      {state.searchApplied && <SearchField username={state.chipValue} clearSearch={clearSearch} avatarUrl={globalState.userObject?.avatar_url} />}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {
                        state.searchApplied ?
                          <IconButton onClick={clearSearch} edge="end">
                            <CloseRoundedIcon />
                          </IconButton> :
                          <IconButton onClick={handleSearch} edge="end">
                            <SearchIcon />
                          </IconButton>
                      }
                    </InputAdornment>
                  ),
                }}
              />
              <Avatar
                alt="Profile Image"
                src={globalState.userObject?.avatar_url}
                sx={{ width: 40, height: 40, marginLeft: { xs: 0, sm: 2 }, marginBottom: { xs: 2, sm: 0 }, marginTop: { xs: 1, sm: 0 }, cursor: 'pointer' }}
                onClick={showUserProfile}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <SideMenu onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
};

export default AppHeader;
