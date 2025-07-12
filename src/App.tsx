import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import TalentDiscovery from './pages/TalentDiscovery';
import TalentProfile from './pages/TalentProfile';
import ProjectPosting from './pages/ProjectPosting';
import Dashboard from './pages/Dashboard';
import { UserType } from './types';

function App() {
  const [userType, setUserType] = useState<UserType>('agency');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation 
          userType={userType} 
          setUserType={setUserType}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route path="/" element={<LandingPage setUserType={setUserType} setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/discover" element={<TalentDiscovery userType={userType} />} />
          <Route path="/talent/:id" element={<TalentProfile userType={userType} />} />
          <Route path="/post-project" element={<ProjectPosting />} />
          <Route path="/dashboard" element={<Dashboard userType={userType} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;