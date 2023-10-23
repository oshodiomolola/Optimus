const mongoose = require('mongoose');
const schema = mongoose.Schema;
const shortid = require('shortid')

const taskSchema = new schema({
_id: {
  type: String,
  default: shortid.generate,
  autoIncrement: true,
  required: true,
  unique: true
},

name: {
type: String,
required: [true, 'A task must have a name'],
trim: true
},

status: {
  type: String,
  enum: ['pending', 'completed', 'deleted'],
  default: 'pending'
},
user: {
  type: mongoose.Schema.ObjectId,
  ref: 'user',
  required: true
},
createdAt: {
  type: Date,
default: Date.now
}
},
{
  toJSON: {virtual: true},
  toObject: {virtual: true}
})

taskSchema.pre()