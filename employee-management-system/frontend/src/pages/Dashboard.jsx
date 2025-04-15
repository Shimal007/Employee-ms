import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import StatsCards from '../components/StatsCards';
import EmployeeTable from '../components/EmployeeTable';
import EmployeeModal from '../components/EmployeeModal';
import Alert from '../components/Alert';
import { fetchEmployees } from '../services/api';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { loadEmployees(); }, []);

  useEffect(() => {
    const filtered = employees.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.department && e.department.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      showAlert(`Error: ${error.message}`, 'error');
    }
  };

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Topbar onSearch={(e) => setSearchTerm(e.target.value)} />
        <div className="content-area">
          <div className="page-header">
            <div className="page-title">
              <h1>Employee Management</h1>
              <p>Manage all employees in one place</p>
            </div>
            <button className="btn btn-primary" onClick={() => {
              setCurrentEmployee(null);
              setIsModalOpen(true);
            }}>
              <i className="fas fa-plus"></i> Add Employee
            </button>
          </div>

          <StatsCards employees={employees} />
          <EmployeeTable 
            employees={filteredEmployees}
            onEdit={(emp) => {
              setCurrentEmployee(emp);
              setIsModalOpen(true);
            }}
            onDelete={loadEmployees}
            showAlert={showAlert}
          />
        </div>
      </div>

      {isModalOpen && (
        <EmployeeModal
          employee={currentEmployee}
          onClose={() => setIsModalOpen(false)}
          onSave={loadEmployees}
          showAlert={showAlert}
        />
      )}

      {alert && <Alert message={alert.message} type={alert.type} />}
    </div>
  );
}