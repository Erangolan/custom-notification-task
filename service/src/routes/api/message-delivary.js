const cron = require('node-cron')

const {
  User,
} = require('../../models')

module.exports = async (socket, socketId, userId) => {
  try {
    const {
      message,
      _id: id,
      notificationPeriod,
      durationPeriod,
    } = await User.findById(userId).lean().exec()

    cron.schedule(`*/${notificationPeriod} * * * * *`, async () => {
      const random = Math.floor((Math.random() * message.length))

      const lowerMsg = message[random].text.toLowerCase()
      let msgToDisplay

      if (lowerMsg.includes('sale')) {
        msgToDisplay = message[random].text.concat('!')
      } else if (lowerMsg.includes('new')) {
        msgToDisplay = '~~'.concat(message[random].text)
      } else if (lowerMsg.includes('limited edition')) {
        msgToDisplay = lowerMsg.toLocaleUpperCase()
      }

      const pack = {
        text: msgToDisplay || message[random].text,
        type: message[random].type,
        index: random,
        durationPeriod,
        id,
      }

      console.log('pack sent: ', pack)

      socket.to(socketId).emit('notification', pack)
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with message-delivery', { message: e.toString() })
  }
}
