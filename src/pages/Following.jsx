import React, { useContext, useEffect, useRef } from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserCard from '../components/UserCard';
import UserContext from '../context/UserContext';

const Following = () => {

    const { getUserFollowingData, globalState } = useContext(UserContext);

    useEffect(() => {
        if (globalState.userObject?.login)
            getUserFollowingData(globalState.userObject.login)
    }, [])

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <>
            <Box sx={{ position: 'relative', width: '100%' }}>
                {globalState.following?.length !== 0 && <IconButton
                    onClick={scrollLeft}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '0',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        },
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>}
                {globalState.following?.length !== 0 && <IconButton
                    onClick={scrollRight}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: '0',
                        transform: 'translateY(-50%)',
                        zIndex: 10,
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        color: 'white',
                        '&:hover': {
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        },
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>
                }
                <Box
                    ref={scrollContainerRef}
                    sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        padding: 1,
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    <Grid container spacing={2} sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {globalState.following?.map((follower, index) => (
                            <Grid item key={follower.id} sx={{ minWidth: '300px', minHeight: '300px' }}>
                                <UserCard
                                    profileImage={follower.avatar_url}
                                    name={follower.login}
                                    github={follower.html_url}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default Following;
