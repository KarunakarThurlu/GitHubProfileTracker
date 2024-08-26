import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import Dashboard from '../pages/Dashboard';
import { Link } from 'react-router-dom';


const SideMenu = ({open}) =>{

 return(
    <div onClick={open} >
      <List>
        <ListItem component={Link} to='/profile'>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem component={Link} to='/'>
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to='/repositories'>
          <ListItemIcon>
            <CollectionsBookmarkRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Repos" />
        </ListItem>
        <ListItem component={Link} to='/followers'>
          <ListItemIcon>
            <SupervisorAccountRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Followers" />
        </ListItem>
        <ListItem component={Link} to='/following'>
          <ListItemIcon>
            <SwitchAccountRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Following" />
        </ListItem>
      </List>
     
    </div>
 )
}
export default SideMenu;