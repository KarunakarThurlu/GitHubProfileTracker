import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  InputAdornment,
  Drawer,
  Box,
  TextField,
  Avatar,
  Grid,
  Chip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import UserContext from "../context/UserContext";
import SideMenu from "./SideMenu";
import UserProfile from "./UserProfile";
import Notifier from "../utils/Notifier";
import { useThemeMode } from "../utils/ThemeContext";

const AppHeader = () => {
  const theme = useTheme(); // Get theme
  const { darkMode, setDarkMode } = useThemeMode(); // Theme context

  const [state, setState] = useState({
    drawerOpen: false,
    gitHubUserName: "",
    chipValue: "",
    showUserProfile: false,
    searchApplied: false,
    showWarning: false,
    warningMessage: "",
    messageSeverity: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const { getUserProfile, globalState, clearUserData } = useContext(UserContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => () => {
    setState((prevState) => ({ ...prevState, drawerOpen: open }));
  };

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, gitHubUserName: e.target.value }));
  };

  const clearSearch = () => {
    setState((prevState) => ({ ...prevState, searchApplied: false, gitHubUserName: "", chipValue: "" }));
    clearUserData();
  };

  const handleSearch = () => {
    if (state.gitHubUserName !== "") {
      getUserProfile(state.gitHubUserName);
      setState((prevState) => ({
        ...prevState,
        searchApplied: true,
        chipValue: state.gitHubUserName,
        gitHubUserName: "",
        showWarning: false,
        warningMessage: "",
        messageSeverity: "",
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        showWarning: true,
        warningMessage: "Please enter GitHub username!",
        messageSeverity: "warning",
      }));
    }
  };

  const closeUserProfile = () => {
    setState((prevState) => ({ ...prevState, showUserProfile: false }));
  };

  const showUserProfile = () => {
    setState((prevState) => ({ ...prevState, showUserProfile: true }));
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Notifier open={state.showWarning} onClose={() => setState({ ...state, showWarning: false })} message={state.warningMessage} severity={state.messageSeverity} />
      <UserProfile open={state.showUserProfile} onClose={closeUserProfile} />

      <AppBar position="static" color="primary">
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            {/* Left - Menu Icon & Title */}
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" } }}>
                <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ marginLeft: 1 }}>
                  GitHub Profile Tracker
                </Typography>
              </Box>
            </Grid>

            {/* Right - Search Field & Avatar */}
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6} display="flex" justifyContent={{ xs: "center", sm: "flex-end" }} alignItems="center">
              <TextField
                size="small"
                value={state.gitHubUserName}
                placeholder={state.chipValue === "" ? "Enter GitHub User Name" : ""}
                onChange={handleChange}
                sx={{
                  borderRadius: 1,
                  width: { xs: "100%", sm: 300 },
                  bgcolor: theme.palette.mode === "dark" ? "#424242" : "#ffffff",
                  input: {
                    color: theme.palette.text.primary, // Adjust text color based on theme
                  },
                }}
                InputProps={{
                  startAdornment: state.searchApplied && (
                    <InputAdornment position="start">
                      <Chip
                        label={state.chipValue}
                        onDelete={clearSearch}
                        variant="outlined"
                        color="success"
                        size="medium"
                        sx={{bgcolor:"#ffffff",
                          color: theme.palette.success.main
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={state.searchApplied ? clearSearch : handleSearch} edge="end" >
                        {state.searchApplied ? <CloseRoundedIcon /> : <SearchIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Avatar with Menu */}
              <Avatar
                alt="Profile Image"
                src={globalState.userObject?.avatar_url}
                sx={{ width: 40, height: 40, cursor: "pointer", marginLeft: 2 }}
                onClick={handleMenuOpen}
              />

              {/* Menu for Avatar */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem onClick={showUserProfile}>View Profile</MenuItem>
                <MenuItem onClick={toggleDarkMode}>
                  <IconButton color="inherit">
                    {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </MenuItem>
              </Menu>
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
