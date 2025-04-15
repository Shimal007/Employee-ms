import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeDetail from './pages/EmployeeDetail';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Payroll from './pages/Payroll';
function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Routes>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/employees" element={<Employees />} />
  <Route path="/employees/:id" element={<EmployeeDetail />} />
  <Route path="/payroll" element={<Payroll />} />
  <Route path="/" element={<Dashboard />} />
</Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;