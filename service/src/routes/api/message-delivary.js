const cron = require('node-cron')

const {
  User,
} = require('../../models')

module.exports = async (socket, socketId, userId, notificationPeriod) => {
  try {
    cron.schedule(`${notificationPeriod} * * * * *`, async () => {
      const { message, _id: id } = await User.findById(userId).lean().exec()
      const random = Math.floor((Math.random() * message.length))

      let lowerMsg = message[random].text.toLowerCase()

      if (lowerMsg.includes('sale')) {
        lowerMsg = lowerMsg.concat('!')
      } else if (lowerMsg.includes('new')) {
        lowerMsg = '~~'.concat(lowerMsg)
      } else if (lowerMsg.includes('limited edition')) {
        lowerMsg = lowerMsg.toLocaleUpperCase()
      }

      console.log('lowerMsg: ', lowerMsg)

      const pack = {
        text: lowerMsg,
        type: message[random].type,
        index: random,
        id,
      }

      console.log('pack sent: ', pack)

      socket.to(socketId).emit('notification', pack)
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with message-delivery', { message: e.toString() })
  }
}
