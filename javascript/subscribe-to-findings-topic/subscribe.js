const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const DYNAMODB_TABLE_NAME = 'bucketav-scan-results';

exports.handler = async (event) => {
  console.log(JSON.stringify(event));
  await Promise.all(event.Records.map(record => {
    const { bucket, key, status } = JSON.parse(record.Sns.Message);
    return dynamodb.putItem({
      Item: {
        bucket_key: { S: `${bucket}/${key}` },
        status: { S: status }
      },
      TableName: DYNAMODB_TABLE_NAME
    }).promise();
  }));
};
