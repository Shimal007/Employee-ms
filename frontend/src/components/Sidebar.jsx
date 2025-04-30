import { Link } from 'react-router-dom';

export default function Sidebar({ setIsLoggedIn }) {
  const handleLogout = () => {
    import('../services/api').then((module) => {
      module.logout();
      setIsLoggedIn(false); // Update the logged-in state
      window.location.href = '/login'; // Redirect to login page
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <i className="fas fa-briefcase"></i>
        <h3>HR Portal</h3>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/dashboard">
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/employees">
              <i className="fas fa-users"></i> Employees
            </Link>
          </li>
          <li>
            <Link to="/payroll">
              <i className="fas fa-file-invoice-dollar"></i> Payroll
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </div>
    </div>
  );
}