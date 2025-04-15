import { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../services/api';

export default function EmployeeModal({ employee, onClose, onSave, showAlert }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    joinDate: new Date().toISOString().split('T')[0],
    onLeave: false,
    gender: 'male'
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phone: employee.phone || '',
        position: employee.position,
        department: employee.department || '',
        joinDate: employee.joinDate ? new Date(employee.joinDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        onLeave: employee.onLeave || false,
        gender: employee.gender || 'male'
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        await updateEmployee(employee._id, formData);
        showAlert('Employee updated!', 'success');
      } else {
        await createEmployee(formData);
        showAlert('Employee added!', 'success');
      }
      onSave();
      onClose();
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{employee ? 'Edit Employee' : 'Add Employee'}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
            <div className="form-group">
              <label>Join Date</label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                name="onLeave"
                value={formData.onLeave ? 'On Leave' : 'Active'}
                onChange={(e) => handleChange({
                  target: {
                    name: 'onLeave',
                    value: e.target.value === 'On Leave'
                  }
                })}
                className="form-select"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-warning" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {employee ? 'Update' : 'Save'} Employee
          </button>
        </div>
      </div>
    </div>
  );
}