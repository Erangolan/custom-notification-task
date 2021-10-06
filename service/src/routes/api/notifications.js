const cron = require('node-cron')

const {
  User,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    app,
    query: {
      id: socketId,
    },
  } = req

  try {
    const socket = app.get('socketIO')
    const user = new User()
    await user.save()

    const { _id: userId } = user

    console.log('new user created')

    const notificationPeriod = Math.floor(Math.random() * (6) + 5)

    cron.schedule(`${notificationPeriod} * * * * *`, async () => {
      const { message, _id: id } = await User.findById(userId).lean().exec()
      const random = Math.floor((Math.random() * message.length))

      const pack = {
        ...message[random],
        index: random,
        id,
      }

      console.log('pack sent: ', pack)

      socket.to(socketId).emit('notification', pack)
    })

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
