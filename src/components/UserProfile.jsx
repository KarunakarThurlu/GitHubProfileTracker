import React, { useContext } from 'react';
import { Dialog, DialogContent, Avatar, Button, Typography as MuiTypography } from '@mui/material';
import UserContext from '../context/UserContext';


const UserProfile = ({ open, onClose }) => {

  const { globalState } = useContext(UserContext);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <Avatar
            alt="Profile Image"
            src={globalState.userObject?.avatar_url}
            sx={{ width: '100%', height: '100%' }} 
          />
        </DialogContent>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </Dialog>
    </>
  );
};

export default UserProfile;
