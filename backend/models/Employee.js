const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  position: { type: String, required: true },
  department: String,
  joinDate: { type: Date, default: Date.now },
  onLeave: { type: Boolean, default: false },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  salary: {
    base: { type: Number, default: 0 },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    paymentFrequency: { 
      type: String, 
      enum: ['monthly', 'bi-weekly', 'weekly'],
      default: 'monthly'
    },
    bankAccount: {
      accountNumber: String,
      bankName: String,
      ifscCode: String
    }
  }
});

// ✅ Prevent OverwriteModelError on hot reloads
const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

module.exports = Employee;
