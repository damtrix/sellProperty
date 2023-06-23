const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  username: {
    type: String,
    required: [true, 'Please provide a short name to help login'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  address: {
    type: String,
    required: [true, 'Please Provide your addrees'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'please provide your phone number'],
    // validate: {
    //   validator: function (v) {
    //     const re = /d{10}/g;
    //     return v.match(re);
    //   },
    //   message: 'Provided phone number is invalid.',
    // },
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin'],
    default: 'buyer',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password of more than 8 character'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    //This will only work on create and save!!!
    validator: function (el) {
      return el === this.password;
    },
    message: 'Passwords are not the same',
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre('save', async function (next) {
  //Only run this function if password was modified
  if (!this.isModified('password')) return next();

  //Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
