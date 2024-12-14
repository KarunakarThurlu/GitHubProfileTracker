import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SwitchAccountRoundedIcon from '@mui/icons-material/SwitchAccountRounded';
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { Avatar } from '@mui/material';


const SideMenu = ({onClose}) =>{

  const { globalState } = useContext(UserContext);

 return(
    <div onClick={onClose} >
      <List>
        <ListItem component={Link} to='/GitHubProfileTracker/profile'>
          <ListItemIcon>
          <Avatar
              alt="Profile Image"
              src={globalState.userObject?.avatar_url}
              sx={{ width: 30, height: 30, cursor: 'pointer' }}
              
            />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem component={Link} to='/GitHubProfileTracker'>
          <ListItemIcon>
            <DashboardRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to='/GitHubProfileTracker/repositories'>
          <ListItemIcon>
            <CollectionsBookmarkRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Repos" />
        </ListItem>
        <ListItem component={Link} to='/GitHubProfileTracker/followers'>
          <ListItemIcon>
            <SupervisorAccountRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Followers" />
        </ListItem>
        <ListItem component={Link} to='/GitHubProfileTracker/following'>
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