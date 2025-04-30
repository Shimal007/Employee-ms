export default function StatsCards({ employees }) {
    const total = employees.length;
    const active = employees.filter(e => !e.onLeave).length;
    const onLeave = employees.filter(e => e.onLeave).length;
  
    return (
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon blue">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <h3>{total}</h3>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">
            <i className="fas fa-user-check"></i>
          </div>
          <div className="stat-info">
            <h3>{active}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange">
            <i className="fas fa-plane"></i>
          </div>
          <div className="stat-info">
            <h3>{onLeave}</h3>
            <p>On Leave</p>
          </div>
        </div>
      </div>
    );
  }