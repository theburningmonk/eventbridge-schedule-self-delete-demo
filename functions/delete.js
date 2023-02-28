const Scheduler = require('aws-sdk/clients/scheduler')
const SchedulerClient = new Scheduler()

module.exports.handler = async (event) => {
  const name = event.requestPayload.name

  await SchedulerClient.deleteSchedule({
    Name: name
  }).promise()
}
