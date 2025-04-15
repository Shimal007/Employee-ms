import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployee } from '../services/api';

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const data = await fetchEmployee(id);
        setEmployee(data);
      } catch (err) {
        setError('Failed to load employee details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadEmployee();
  }, [id]);

  if (loading) return <div className="content-area">Loading...</div>;
  if (error) return <div className="content-area">{error}</div>;
  if (!employee) return <div className="content-area">Employee not found</div>;

  return (
    <div className="content-area">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-secondary"
        style={{ marginBottom: '20px' }}
      >
        ← Back to Employees
      </button>

      <div className="employee-detail-card">
        <div className="profile-header">
          <img
            src={`https://randomuser.me/api/portraits/${employee.gender === 'female' ? 'women' : 'men'}/${id.slice(-2)}.jpg`}
            alt={employee.name}
            className="profile-avatar"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=random`;
            }}
          />
          <div>
            <h1>{employee.name}</h1>
            <p className="position">{employee.position}</p>
            <p className="department">{employee.department || 'No department assigned'}</p>
          </div>
        </div>

        <div className="detail-sections">
          <div className="detail-section">
            <h2>Personal Information</h2>
            <div className="detail-row">
              <span>Email:</span>
              <span>{employee.email}</span>
            </div>
            <div className="detail-row">
              <span>Phone:</span>
              <span>{employee.phone || 'Not provided'}</span>
            </div>
            <div className="detail-row">
              <span>Gender:</span>
              <span>{employee.gender || 'Not specified'}</span>
            </div>
          </div>

          <div className="detail-section">
            <h2>Employment Details</h2>
            <div className="detail-row">
              <span>Join Date:</span>
              <span>{new Date(employee.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-row">
              <span>Status:</span>
              <span className={`status ${employee.onLeave ? 'status-on-leave' : 'status-active'}`}>
                {employee.onLeave ? 'On Leave' : 'Active'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}