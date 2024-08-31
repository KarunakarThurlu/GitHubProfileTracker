import React from 'react';
import { Card, CardContent, Avatar, Typography, Grid, Link } from '@mui/material';

const UserCard = ({
    profileImage,
    name,
    github
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '80vh',
        }}>
            <Card sx={{ maxWidth: 400, padding: 2,boxShadow:3 }}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Avatar
                                alt={name}
                                src={profileImage}
                                sx={{ width: 250, height: 250 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                <Link href={github} target="_blank" rel="noopener" sx={{textDecoration: 'none'}} color="primary">
                                    Visit GitHub Profile
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserCard;
