import { useState } from 'react';

export default function SalaryModal({ employee, onClose, onSave }) {
  const [formData, setFormData] = useState({
    base: employee.salary?.base || 0,
    bonus: employee.salary?.bonus || 0,
    deductions: employee.salary?.deductions || 0,
    paymentFrequency: employee.salary?.paymentFrequency || 'monthly'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'base' || name === 'bonus' || name === 'deductions' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleSubmit = () => {
    onSave({
      salary: formData
    });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Edit Salary for {employee.name}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Base Salary</label>
            <input
              type="number"
              name="base"
              value={formData.base}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Bonus</label>
            <input
              type="number"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Deductions</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Payment Frequency</label>
            <select
              name="paymentFrequency"
              value={formData.paymentFrequency}
              onChange={handleChange}
              className="form-select"
            >
              <option value="monthly">Monthly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-warning" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}