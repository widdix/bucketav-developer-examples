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

scan('your-scan-queue-url', 'your-bucket', 'path/to/file.pdf')

print('Done')
