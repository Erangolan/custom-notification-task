const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const schema = {
  message: {
    type: Array,
    default: [
      { type: 'info', text: 'New auction next month' },
      { type: 'info', text: 'Big sale next week' },
      { type: 'warning', text: 'Limited edition books for next auction' },
      { type: 'success', text: 'New books with limited edition coming next week' },
      { type: 'error', text: 'Last items with limited time offer' },
    ],
  },
}

const userSchema = new mongoose.Schema(schema, { timestamps: { createdAt: true } })
const User = mongoose.model('Notification', userSchema)
module.exports = User
