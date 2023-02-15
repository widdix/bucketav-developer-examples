// npm i aws-sdk

const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const DYNAMODB_TABLE_NAME = 'bucketav-scan-results';

function getSignedUrl (bucket, key, cb) {
  dynamodb.getItem({
    Key: {
      bucket_key: { S: `${bucket}/${key}` }
    },
    TableName: DYNAMODB_TABLE_NAME
  }, (err, data) => {
    if (err) {
      cb(err);
    } else {
      if (data.Item !== undefined && data.Item.status.S === 'clean') {
        s3.getSignedUrl('getObject', {
          Bucket: bucket,
          Key: key
        }, (err, signedUrl) => {
          if (err) {
            cb(err);
          } else {
            cb(null, signedUrl);
          }
        });
      } else {
        cb(null, null);
      }
    }
  });
}

getSignedUrl('bucketav-files', 'virus1.txt', (err, signedUrl) => {
  if (err) {
    console.error('something went wrong', err);
  } else {
    if (signedUrl === null) {
      console.log('download not possible (file infected, unscannable, or not yet scanned)');
    } else {
      console.log(signedUrl);
    }
  }
});
