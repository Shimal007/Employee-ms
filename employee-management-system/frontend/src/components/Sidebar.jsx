import React from 'react';
export default function Sidebar() {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <i className="fas fa-briefcase"></i>
          <h3>HR Portal</h3>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li><a href="#" className="active"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
            <li><a href="#"><i className="fas fa-users"></i> Employees</a></li>
            <li><a href="#"><i className="fas fa-file-invoice-dollar"></i> Payroll</a></li>
          </ul>
        </div>
      </div>
    );
  }