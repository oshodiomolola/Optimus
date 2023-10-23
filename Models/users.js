const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const validator = require('validator');

const Schema = mongoose.Schema

const userSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
    autoIncrement: true,
    required: true,
    unique: true
  },

  firstname: {
    type: String,
    required: [true, 'Please tell me your name!'], 
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'please tell me your name!'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlenght: 6,
    unique: true,
    trim: true
  },
  passwordConfirm: {
type: String,
required: [true, 'Please confirm your password'],
trim: true
  },
  photo: {
    type: String,
    trim: true
  }
})

userSchema.pre("save", async function(next){
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next
})

userSchema.methods.checkValidPassword = async function() {
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

const User = mongoose.model('User', userSchema);
module.exports = User