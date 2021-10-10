const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = {
  message: { type: Array, require: true },
  notificationPeriod: { type: Number, require: true },
  durationPeriod: { type: Number, require: true },
}

const userSchema = new mongoose.Schema(schema, { timestamps: { createdAt: true } })
const User = mongoose.model('User', userSchema)
module.exports = User
