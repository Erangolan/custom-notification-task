const {
  User,
} = require('../../models')

const INIT_MSG = require('../../init-message.json')

const messageDelivery = require('./message-delivary')

module.exports = (async (req, res) => {
  const {
    app,
    query: {
      id: socketId,
    },
  } = req

  try {
    const socket = app.get('socketIO')
    const notificationPeriod = Math.floor(Math.random() * (6) + 5)
    const durationPeriod = Math.floor(Math.random() * (3) + 1)
    const user = new User({ message: INIT_MSG, notificationPeriod, durationPeriod })
    await user.save()

    const { _id: userId } = user

    // console.log('new user created')

    messageDelivery(socket, socketId, userId, notificationPeriod, durationPeriod)
    return res.json({
      message: 'success',
      user,
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with notifications route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
