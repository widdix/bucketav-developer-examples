// npm i aws-sdk

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

function scan (queueUrl, bucket, key, cb) {
  sqs.sendMessage({
    MessageBody: JSON.stringify({
      objects: [{
        bucket,
        key
      }]
    }),
    QueueUrl: queueUrl
  }, (err) => {
    if (err) {
      cb(err);
    } else {
      cb();
    }
  });
}

// To get the Scan Queue URL:
// 1. Visit https://console.aws.amazon.com/cloudformation/
// 2. Ensure that you are in the correct region.
// 3. Navigate to Stacks.
// 4. Click on the bucketAV stack (if you followed our docs, the name is bucketav).
// 5. Click on the Outputs tab.
// 6. Use the value next to the output key ScanQueueUrl.
scan('your-scan-queue-url', 'your-bucket', 'path/to/file.pdf', (err) => {  if (err) {
    console.error('something went wrong', err);
  } else {
    console.log('done');
  }
});
