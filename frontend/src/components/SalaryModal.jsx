import { useState } from 'react';
import { saveAs } from 'file-saver';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// PDF Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    textAlign: 'center'
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: '1 solid #eee'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  total: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1 solid #000',
    fontWeight: 'bold'
  }
});

// PDF Payslip Component
const PayslipPDF = ({ employee, formData, period }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text>COMPANY NAME</Text>
        <Text>PAYSLIP FOR {period}</Text>
      </View>
      
      <View style={styles.section}>
        <Text>Employee: {employee.name}</Text>
        <Text>Position: {employee.position}</Text>
        <Text>Employee ID: {employee._id}</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.row}>
          <Text>Base Salary:</Text>
          <Text>${formData.base.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Bonus:</Text>
          <Text>${formData.bonus.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text>Deductions:</Text>
          <Text>-${formData.deductions.toFixed(2)}</Text>
        </View>
        <View style={[styles.row, styles.total]}>
          <Text>NET PAY:</Text>
          <Text>${(formData.base + formData.bonus - formData.deductions).toFixed(2)}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text>Payment Frequency: {formData.paymentFrequency}</Text>
        <Text>Bank: {employee.salary?.bankAccount?.bankName || 'Not specified'}</Text>
        <Text>Account: {employee.salary?.bankAccount?.accountNumber || 'Not specified'}</Text>
      </View>
    </Page>
  </Document>
);

export default function SalaryModal({ employee, onClose, onSave }) {
  const [formData, setFormData] = useState({
    base: employee.salary?.base || 0,
    bonus: employee.salary?.bonus || 0,
    deductions: employee.salary?.deductions || 0,
    paymentFrequency: employee.salary?.paymentFrequency || 'monthly',
    bankAccount: employee.salary?.bankAccount || {
      accountNumber: '',
      bankName: '',
      ifscCode: ''
    }
  });

  const [period, setPeriod] = useState(new Date().toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'base' || name === 'bonus' || name === 'deductions' 
        ? parseFloat(value) || 0 
        : value
    }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      bankAccount: {
        ...prev.bankAccount,
        [name]: value
      }
    }));
  };

  const handleSubmit = () => {
    onSave({
      salary: formData
    });
  };

  const exportToCSV = () => {
    const headers = [
      'Employee ID,Name,Position,Base Salary,Bonus,Deductions,Net Pay,Payment Frequency'
    ];
    const data = [
      `"${employee._id}","${employee.name}","${employee.position}",` +
      `${formData.base},${formData.bonus},${formData.deductions},` +
      `${formData.base + formData.bonus - formData.deductions},` +
      `${formData.paymentFrequency}`
    ];
    
    const csv = [...headers, ...data].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `payroll_${employee.name.replace(' ', '_')}.csv`);
  };

  return (
    <div className="modal">
      <div className="modal-content" style={{ maxWidth: '700px' }}>
        <div className="modal-header">
          <h3>Salary Management for {employee.name}</h3>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Base Salary ($)</label>
                <input
                  type="number"
                  name="base"
                  value={formData.base}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Bonus ($)</label>
                <input
                  type="number"
                  name="bonus"
                  value={formData.bonus}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Deductions ($)</label>
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
            
            <div className="col-md-6">
              <h5>Bank Details</h5>
              <div className="form-group">
                <label>Bank Name</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankAccount.bankName}
                  onChange={handleBankChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Account Number</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.bankAccount.accountNumber}
                  onChange={handleBankChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>IFSC Code</label>
                <input
                  type="text"
                  name="ifscCode"
                  value={formData.bankAccount.ifscCode}
                  onChange={handleBankChange}
                  className="form-control"
                />
              </div>
              
              <div className="form-group">
                <label>Pay Period</label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer d-flex justify-content-between">
          <div>
            <button 
              className="btn btn-outline-secondary me-2"
              onClick={exportToCSV}
            >
              Export to CSV
            </button>
            
            <PDFDownloadLink
              document={<PayslipPDF employee={employee} formData={formData} period={period} />}
              fileName={`payslip_${employee.name.replace(' ', '_')}.pdf`}
            >
              {({ loading }) => (
                <button className="btn btn-outline-primary">
                  {loading ? 'Preparing PDF...' : 'Generate Payslip'}
                </button>
              )}
            </PDFDownloadLink>
          </div>
          
          <div>
            <button className="btn btn-warning me-2" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}