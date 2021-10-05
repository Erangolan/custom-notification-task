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
    console.log(index)
    await User.updateOne(
      { userId }, { $pull: { message: { index } } },
    )

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
