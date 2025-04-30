import { Link } from 'react-router-dom';

export default function Sidebar() {
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
            <Link to="/payroll"> {/* Fixed this line */}
              <i className="fas fa-file-invoice-dollar"></i> Payroll
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}