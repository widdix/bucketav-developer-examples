# pip install boto3

import boto3
import json

sqs = boto3.client('sqs')

def scan(queue_url, bucket, key):
    sqs.send_message(
        QueueUrl=queue_url,
        MessageBody=json.dumps({
            'objects': [{
                'bucket': bucket,
                'key': key
            }]
        })
    )


# To get the Scan Queue URL:
# 1. Visit https://console.aws.amazon.com/cloudformation/
# 2. Ensure that you are in the correct region.
# 3. Navigate to Stacks.
# 4. Click on the bucketAV stack (if you followed our docs, the name is bucketav).
# 5. Click on the Outputs tab.
# 6. Use the value next to the output key ScanQueueUrl.
scan('your-scan-queue-url', 'your-bucket', 'path/to/file.pdf')

print('Done')
