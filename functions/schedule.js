const Scheduler = require('aws-sdk/clients/scheduler')
const SchedulerClient = new Scheduler()
const uuid = require('uuid')

const { EXECUTE_ARN, ROLE_ARN } = process.env

/**
 * 
 * @param {import('aws-lambda').APIGatewayEvent} event 
 * @returns {Promise<import('aws-lambda').APIGatewayProxyResult>}
 */
module.exports.handler = async (event) => {
  const name = uuid.v4()
  const resp = await SchedulerClient.createSchedule({
    Name: name,
    ScheduleExpression: `at(${event.body})`,
    FlexibleTimeWindow: {
      Mode: 'OFF'
    },
    Target: {
      Arn: EXECUTE_ARN,
      RoleArn: ROLE_ARN,
      Input: JSON.stringify({
        name
      })
    }
  }).promise()  

  return {
    statusCode: 200,
    body: resp.ScheduleArn
  }
}