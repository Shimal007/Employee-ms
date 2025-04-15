import { Link } from 'react-router-dom';

export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Employee List</h3>
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
                        src={`https://randomuser.me/api/portraits/${
                          employee.gender === 'female' ? 'women' : 'men'
                        }/${index + 1}.jpg`}
                        className="employee-avatar"
                        alt={employee.name}
                      />
                      <div>
                        <div className="employee-name">{employee.name}</div>
                        <div className="employee-email">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{employee.position}</td>
                  <td>{employee.department || '-'}</td>
                  <td>
                    <span className={`status ${employee.onLeave ? 'status-on-leave' : 'status-active'}`}>
                      {employee.onLeave ? 'On Leave' : 'Active'}
                    </span>
                  </td>
                  <td>{new Date(employee.joinDate).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => onEdit(employee)}
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => onDelete(employee._id)}
                    >
                      <i className="fas fa-trash"></i> Delete
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
}