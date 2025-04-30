// backend/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

// Prevent OverwriteModelError on hot reloads
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;