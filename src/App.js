import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import DebateInterface from './components/DebateInterface';
import SingleChatInterface from './components/SingleChatInterface';
import Settings from './components/Settings';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedModels, setSelectedModels] = useState({
    chatgpt: true,
    claude: true,
    gemini: true,
    perplexity: true,
    qwen: true,
    mistral: true,
    manus: true,
    grok: true,
    llama: false
  });
  
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    const storedModels = localStorage.getItem('selectedModels');
    if (storedModels) {
      setSelectedModels(JSON.parse(storedModels));
    }
  }, []);
  
  // Save selected models when they change
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('selectedModels', JSON.stringify(selectedModels));
    }
  }, [selectedModels, isAuthenticated]);
  
  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };
  
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };
  
  const updateSelectedModels = (models) => {
    setSelectedModels(models);
  };

  return (
    <Router>
      <div className="app">
        {isAuthenticated ? (
          <>
            <Header user={user} onLogout={handleLogout} />
            <div className="main-container">
              <Sidebar user={user} selectedModels={selectedModels} />
              <div className="content-area">
                <Routes>
                  <Route path="/" element={<DebateInterface selectedModels={selectedModels} />} />
                  <Route path="/chat/:model" element={<SingleChatInterface selectedModels={selectedModels} />} />
                  <Route 
                    path="/settings" 
                    element={<Settings 
                      selectedModels={selectedModels} 
                      updateSelectedModels={updateSelectedModels}
                      user={user}
                    />} 
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;
