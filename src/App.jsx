
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import AppHeader from './components/AppHeader';
import Repositories from './pages/Repositories';
import UserState from './context/UserState';
import Following from './pages/Following';
import Followers from './pages/Followers';
import Profile from './pages/Profile';

function App() {

  return (
    <Router>
      <UserState>
        <AppHeader />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/GitHubProfileTracker/" element={<Dashboard />} />
          <Route path="/GitHubProfileTracker/repositories" element={<Repositories />} />
          <Route path="/GitHubProfileTracker/following" element={<Following />} />
          <Route path="/GitHubProfileTracker/followers" element={<Followers />} />
          <Route path="/GitHubProfileTracker/profile" element={<Profile />} />
        </Routes>
      </UserState>
    </Router>
  )
}

export default App
