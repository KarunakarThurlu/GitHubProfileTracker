import React from 'react';
import { Card, CardContent, Avatar, Typography, Grid } from '@mui/material';

const UserCard = ({
    profileImage,
    name,
    github
}) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto', padding: 2 }}>
            <CardContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Avatar
                            alt={name}
                            src={profileImage}
                            sx={{ width: 100, height: 100 }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6" align="center">
                            {name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                {github}
                            </Typography>
                        
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default UserCard;

