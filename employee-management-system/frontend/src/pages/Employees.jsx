import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../services/api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState({});

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      
      // Categorize by department
      const deptMap = {};
      data.forEach(emp => {
        const dept = emp.department || 'Unassigned';
        if (!deptMap[dept]) {
          deptMap[dept] = [];
        }
        deptMap[dept].push(emp);
      });
      setDepartments(deptMap);
    } catch (error) {
      console.error('Error loading employees:', error);
    }
  };

  // Fallback avatar function
  const getAvatarUrl = (employee) => {
    const gender = employee.gender || 'male';
    const idHash = employee._id ? employee._id.slice(-2) : Math.floor(Math.random() * 99);
    return `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${idHash}.jpg`;
  };

  return (
    <div className="content-area">
      <h1>Employees by Department</h1>
      {Object.keys(departments).map(dept => (
        <div key={dept} className="department-section">
          <h2>{dept} ({departments[dept].length})</h2>
          <div className="employee-grid">
            {departments[dept].map(emp => (
              <Link to={`/employees/${emp._id}`} key={emp._id} className="employee-card">
                <div className="avatar-container">
                  <img 
                    src={getAvatarUrl(emp)}
                    alt={emp.name}
                    className="employee-avatar"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`;
                    }}
                  />
                </div>
                <div className="employee-info">
                  <h3>{emp.name}</h3>
                  <p>{emp.position}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}