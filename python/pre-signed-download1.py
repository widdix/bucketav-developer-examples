# pip install boto3

import boto3

s3 = boto3.client('s3')

def get_signed_url(bucket, key):
    response = s3.get_object_tagging(
        Bucket=bucket,
        Key=key
    )

    tags = response['TagSet']
    tag = next((t for t in tags if t['Key'] == 'bucketav'), None)

    if tag is not None and tag['Value'] == 'clean':
        signed_url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': bucket,
                'Key': key
            }
        )
        return signed_url
    else:
        return None

signed_url = get_signed_url('bucketav-files', 'test.yml')

if signed_url is None:
    print('Download not possible (file infected, unscannable, or not yet scanned)')
else:
    print(signed_url)
