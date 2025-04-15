import { deleteEmployee } from '../services/api';

export default function EmployeeTable({ employees, onEdit, onDelete, showAlert }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        onDelete();
        showAlert('Employee deleted!', 'success');
      } catch (error) {
        showAlert('Failed to delete employee', 'error');
      }
    }
  };

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
              {employees.map((emp, i) => (
                <tr key={emp._id}>
                  <td>{i + 1}</td>
                  <td>
                    <div className="employee-info">
                      <img 
                        src={`https://randomuser.me/api/portraits/${emp.gender === 'female' ? 'women' : 'men'}/${i + 1}.jpg`}
                        className="avatar" 
                        alt="Employee" 
                      />
                      <div className="employee-details">
                        <div className="employee-name">{emp.name}</div>
                        <div className="employee-email">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{emp.position}</td>
                  <td>{emp.department || '-'}</td>
                  <td>
                    <span className={`status ${emp.onLeave ? 'status-on-leave' : 'status-active'}`}>
                      {emp.onLeave ? 'On Leave' : 'Active'}
                    </span>
                  </td>
                  <td>{new Date(emp.joinDate).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn edit" onClick={() => onEdit(emp)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(emp._id)}>
                      <i className="fas fa-trash"></i>
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