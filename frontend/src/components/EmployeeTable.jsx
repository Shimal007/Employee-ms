// src/components/EmployeeTable.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { deleteEmployee } from '../services/api';

const EmployeeTable = ({ employees, onEdit, onDelete, showAlert }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        onDelete();
        showAlert('Employee deleted successfully!', 'success');
      } catch (error) {
        showAlert(`Error deleting employee: ${error.message}`, 'error');
      }
    }
  };

  const getStatusClass = (onLeave) => {
    return onLeave ? 'status-on-leave' : 'status-active';
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Employee List</h3>
        <div>
          <button className="btn btn-success">
            <i className="fas fa-file-excel"></i> Export
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Employee</th>
                <th>Position</th>
                <th>Department</th>
                <th>Status</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="employee-info">
                      <img 
                        src={`https://randomuser.me/api/portraits/${employee.gender === 'female' ? 'women' : 'men'}/${index + 1}.jpg`}
                        className="avatar" 
                        alt="Employee" 
                      />
                      <div className="employee-details">
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-email">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{employee.position}</td>
                  <td>{employee.department || 'Not specified'}</td>
                  <td>
                    <span className={`status ${getStatusClass(employee.onLeave)}`}>
                      {employee.onLeave ? 'On Leave' : 'Active'}
                    </span>
                  </td>
                  <td>{format(new Date(employee.joinDate), 'MM/dd/yyyy')}</td>
                  <td>
                    <button 
                      className="action-btn edit" 
                      title="Edit" 
                      onClick={() => onEdit(employee)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="action-btn delete" 
                      title="Delete" 
                      onClick={() => handleDelete(employee._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                    <button 
                      className="action-btn view" 
                      title="View"
                      onClick={() => navigate(`/employees/${employee._id}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;