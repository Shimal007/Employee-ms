import { useState, useEffect } from 'react';
import { fetchEmployees, updateEmployee } from '../services/api';
import SalaryModal from '../components/SalaryModal';

export default function Payroll() {
  const [employees, setEmployees] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isSalaryModalOpen, setIsSalaryModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateNetSalary = (employee) => {
    const base = employee.salary?.base || 0;
    const bonus = employee.salary?.bonus || 0;
    const deductions = employee.salary?.deductions || 0;
    return base + bonus - deductions;
  };

  const handleEditSalary = (employee) => {
    setCurrentEmployee(employee);
    setIsSalaryModalOpen(true);
  };

  const handleSaveSalary = async (updatedData) => {
    try {
      await updateEmployee(currentEmployee._id, updatedData);
      loadEmployees();
    } catch (error) {
      console.error('Error updating salary:', error);
    }
  };

  const calculateTotalPayroll = () => {
    return employees.reduce(
      (total, emp) => total + calculateNetSalary(emp),
      0
    );
  };

  if (loading) return <div className="content-area">Loading payroll data...</div>;

  return (
    <div className="content-area">
      <div className="page-header">
        <h1>Payroll Management</h1>
        <div className="controls">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="month-selector"
          />
          <button className="btn btn-primary">
            <i className="fas fa-file-export"></i> Export Payroll
          </button>
        </div>
      </div>

      <div className="payroll-summary-cards">
        <div className="summary-card total-payroll">
          <h3>Total Payroll</h3>
          <p>${calculateTotalPayroll().toLocaleString()}</p>
        </div>
        <div className="summary-card total-employees">
          <h3>Employees</h3>
          <p>{employees.length}</p>
        </div>
        <div className="summary-card average-salary">
          <h3>Avg. Salary</h3>
          <p>
            ${employees.length > 0
              ? (calculateTotalPayroll() / employees.length).toLocaleString(
                  undefined,
                  { maximumFractionDigits: 2 }
                )
              : 0}
          </p>
        </div>
      </div>

      <div className="payroll-table-container">
        <table className="payroll-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Position</th>
              <th>Department</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Deductions</th>
              <th>Net Salary</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td className="employee-cell">
                  <div className="employee-info">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        employee.gender === 'female' ? 'women' : 'men'
                      }/${employee._id.slice(-2)}.jpg`}
                      alt={employee.name}
                      className="employee-avatar"
                    />
                    <div>
                      <div className="employee-name">{employee.name}</div>
                      <div className="employee-email">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td>{employee.position}</td>
                <td>{employee.department || '-'}</td>
                <td>${(employee.salary?.base || 0).toLocaleString()}</td>
                <td>${(employee.salary?.bonus || 0).toLocaleString()}</td>
                <td>${(employee.salary?.deductions || 0).toLocaleString()}</td>
                <td className="net-salary">
                  <strong>${calculateNetSalary(employee).toLocaleString()}</strong>
                </td>
                <td>{employee.salary?.paymentFrequency || 'monthly'}</td>
                <td>
                  <button
                    className="btn btn-sm btn-edit"
                    onClick={() => handleEditSalary(employee)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="btn btn-sm btn-payslip">
                    <i className="fas fa-file-invoice"></i> Payslip
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isSalaryModalOpen && (
        <SalaryModal
          employee={currentEmployee}
          onClose={() => setIsSalaryModalOpen(false)}
          onSave={handleSaveSalary}
        />
      )}
    </div>
  );
}