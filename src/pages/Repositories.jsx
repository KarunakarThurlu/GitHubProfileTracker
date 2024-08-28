import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import ReposTable from '../components/ReposTable';

const Repositories = () => {

    const { globalState } = useContext(UserContext);
    

    return (
        <ReposTable repos={globalState.userRepos}/>
    );
};

export default Repositories;
