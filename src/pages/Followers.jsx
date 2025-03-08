import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, IconButton, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UserCard from '../components/UserCard';
import UserContext from '../context/UserContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Followers = () => {

    const { getUserFollowers, globalState } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 50;
    const hasFetchedInitial = useRef(false);

    // Fetch followers function
    const fetchFollowers = async (githubUserName, pageNum) => {
        try {
            const response = await getUserFollowers(githubUserName, perPage, pageNum);
            const pagesCount = calculateTotalPagesCount(response);
            setTotalPages(prev => (pagesCount > prev ? pagesCount : prev));
            if (Array.isArray(response.data) && response.data.length === 0 && pageNum > 1) {
                setPage(prev => prev - 1);
            }
        } catch (error) {
            console.error("Failed to fetch followers:", error);
            setTotalPages(1);
        }
    };

    // Initial fetch on mount, only if login is available
    useEffect(() => {
        const effectId = Math.random();
        console.log('useEffect triggered', { effectId, page, login: globalState.userObject?.login });

        if (globalState.userObject?.login && !hasFetchedInitial.current) {
            hasFetchedInitial.current = true; // Mark as fetched
            fetchFollowers(globalState.userObject.login, page);
        }
    }, []);

    // Calculate total pages from response headers
    const calculateTotalPagesCount = (response) => {
        if (!response) return 1;
        const linkHeader = response.headers?.get('Link');
        if (linkHeader) {
            const lastPageMatch = linkHeader.match(/page=(\d+)>; rel="last"/);
            if (lastPageMatch) {
                return parseInt(lastPageMatch[1], 10);
            }
        }
        // If no Link header, assume single page or rely on previous totalPages
        return totalPages > 1 ? totalPages : 1;
    };

    const scrollContainerRef = useRef(null);

    const scrollLeft = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    // Handle page change
    const handlePageChange = (event, newPage) => {
        if (newPage !== undefined && newPage !== null && newPage > 0) {
            setPage(newPage);
            // Fetch new page data immediately
            if (globalState.userObject?.login) {
                getUserFollowers(globalState.userObject.login, perPage, newPage);
            }
        }
    };


    return (
        <>
            <Box sx={{ position: 'relative', width: '100%' }}>
                {globalState.followers?.length !== 0 && <IconButton
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
                {globalState.followers?.length !== 0 && <IconButton
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
                        {globalState.followers?.map((follower, index) => (
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
            {globalState.followers?.length !== 0 &&
                <Stack spacing={2} direction='row' sx={{ justifyContent: 'center' }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        variant="outlined"
                        onChange={handlePageChange}
                        disabled={totalPages <= 1}
                    />
                </Stack>}
        </>
    );
};

export default Followers;
