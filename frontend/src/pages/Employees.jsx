import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEmployees } from '../services/api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullscreenAvatar, setFullscreenAvatar] = useState({
    isOpen: false,
    src: '',
    alt: ''
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
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
      setError('Failed to load employees. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fallback avatar function
  const getAvatarUrl = (employee) => {
    const gender = employee.gender || 'male';
    const idHash = employee._id ? employee._id.slice(-2) : Math.floor(Math.random() * 99);
    return `https://randomuser.me/api/portraits/${gender === 'female' ? 'women' : 'men'}/${idHash}.jpg`;
  };

  const openFullscreenAvatar = (src, alt) => {
    setFullscreenAvatar({
      isOpen: true,
      src,
      alt
    });
  };

  const closeFullscreenAvatar = () => {
    setFullscreenAvatar({
      isOpen: false,
      src: '',
      alt: ''
    });
  };

  if (loading) {
    return (
      <div className="content-area">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading employees...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-area">
        <div className="alert alert-error">
          {error} <button onClick={loadEmployees}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="content-area">
      <div className="page-header">
        <h1>Employees by Department</h1>
      </div>

      {/* Fullscreen Avatar Overlay */}
      {fullscreenAvatar.isOpen && (
        <div 
          className="fullscreen-avatar" 
          onClick={closeFullscreenAvatar}
        >
          <img 
            src={fullscreenAvatar.src} 
            alt={fullscreenAvatar.alt} 
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {Object.keys(departments).length > 0 ? (
        Object.keys(departments).map(dept => (
          <div key={dept} className="department-section">
            <h2>{dept} <span className="badge">{departments[dept].length}</span></h2>
            <div className="employee-grid">
              {departments[dept].map(emp => (
                <div key={emp._id} className="employee-card">
                  <div 
                    className="avatar-container"
                    onClick={() => openFullscreenAvatar(getAvatarUrl(emp), emp.name)}
                  >
                    <img 
                      src={getAvatarUrl(emp)}
                      alt={emp.name}
                      className="employee-avatar"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`;
                      }}
                    />
                  </div>
                  <Link to={`/employees/${emp._id}`} className="employee-info">
                    <h3>{emp.name}</h3>
                    <p>{emp.position}</p>
                    {emp.department && <p className="department">{emp.department}</p>}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-employees">
          <p>No employees found. Would you like to add some?</p>
        </div>
      )}
    </div>
  );
}