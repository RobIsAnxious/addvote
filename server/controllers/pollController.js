import db from 'sequelize-connect'

const pollController = { }

pollController.handlePost = async function (req, res, next) {
  db.sequelize.transaction(async transaction => {
    const createdPoll = await db.models.poll.create({
      question: req.body.question
    }, {
      transaction
    })

    const pollOptions = req.body.options.map(option => {
      return {
        text: option,
        pollID: createdPoll.dataValues.id
      }
    })
    await db.models.pollOption.bulkCreate(pollOptions, {
      transaction
    })
    res.sendStatus(201)
  }).catch(next)
}
export default pollController
