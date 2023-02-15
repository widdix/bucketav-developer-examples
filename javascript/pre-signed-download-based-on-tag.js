// npm i aws-sdk

const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

function getSignedUrl (bucket, key, cb) {
  s3.getObjectTagging({
    Bucket: bucket,
    Key: key
  }, (err, data) => {
    if (err) {
      cb(err);
    } else {
      const tag = data.TagSet.find(tag => tag.Key === 'bucketav');
      if (tag !== undefined && tag.Value === 'clean') {
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

getSignedUrl('your-bucket', 'path/to/file.pdf', (err, signedUrl) => {
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
