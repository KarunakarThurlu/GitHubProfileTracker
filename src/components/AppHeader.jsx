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
import { Box, TextField, Avatar } from '@mui/material';
import UserContext from '../context/UserContext';
import UserProfile from './UserProfile';
import SearchField from './SearchField';
import Notifier from '../utils/Notifier';

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
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" >
              GitHub Profile Tracker
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              size='small'
              id="outlined-uncontrolled"
              value={state.gitHubUserName}
              placeholder={state.chipValue === '' &&
                'Enter User Name'}
              onChange={handleChange}
              sx={{ marginRight: 5, bgcolor: 'white', borderRadius: 1, width: 300, border: '20px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    {state.searchApplied === true && <SearchField username={state.chipValue} clearSearch={clearSearch} avatarUrl={globalState.userObject?.avatar_url} />}
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
              sx={{ width: 40, height: 40, marginLeft: 2, cursor: 'pointer' }}
              onClick={showUserProfile}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={state.drawerOpen} onClose={toggleDrawer(false)}>
        <SideMenu onClose={toggleDrawer(false)} />
      </Drawer>
    </>
  );
};

export default AppHeader;
