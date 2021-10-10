const {
  User,
} = require('../../models')

module.exports = (async (req, res) => {
  const {
    query: {
      userId,
      index,
    },
  } = req

  try {
    const { message } = await User.findById(userId).lean().exec()

    const messages = message.filter((item, i) => i !== Number(index))

    await User.updateOne({ _id: userId }, { $set: { message: messages } })

    console.log(`message: ${index} deleted from ${userId} DB successfully!`)

    return res.json({
      message: 'success',
    })
  } catch (e) {
    console.log({ stack: e.stack }, 'error with click-notification route', { message: e.toString() })

    return res.status(500).json({
      error: e,
    })
  }
})
