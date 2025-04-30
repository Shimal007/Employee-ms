import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Payroll from './pages/Payroll';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import PrivateRoute from './components/PrivateRoute';
import { isAuthenticated } from './services/api';
import EmployeeDetail from './pages/EmployeeDetail';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login />
          } />
          
          <Route path="/" element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div className="main-content">
                  <Topbar onSearch={handleSearch} searchTerm={searchTerm} />
                  <Navigate to="/dashboard" />
                </div>
              </div>
            </PrivateRoute>
          } />

          <Route path="/dashboard" element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div className="main-content">
                  <Topbar onSearch={handleSearch} searchTerm={searchTerm} />
                  <Dashboard onSearch={handleSearch} />
                </div>
              </div>
            </PrivateRoute>
          } />

          <Route path="/employees" element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div className="main-content">
                  <Topbar onSearch={handleSearch} searchTerm={searchTerm} />
                  <Employees />
                </div>
              </div>
            </PrivateRoute>
          } />

          <Route path="/employees/:id" element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div className="main-content">
                  <Topbar onSearch={handleSearch} searchTerm={searchTerm} />
                  <EmployeeDetail />
                </div>
              </div>
            </PrivateRoute>
          } />

          <Route path="/payroll" element={
            <PrivateRoute>
              <div className="app-container">
                <Sidebar setIsLoggedIn={setIsLoggedIn} />
                <div className="main-content">
                  <Topbar onSearch={handleSearch} searchTerm={searchTerm} />
                  <Payroll />
                </div>
              </div>
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;