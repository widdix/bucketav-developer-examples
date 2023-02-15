# Subscribe to Findings Topic and store result in DynamoDB

The following example:

1. Subscribes to the *Findings Topic*
2. Stores scan results in DynamoDB
3. Queries DynamoDB and extracts the scan result before generating a presigned URL for download.

## Setup instructions

1. Create a DynamoDB table:
    1. Visit the [Amazon DynamoDB Management Console](https://console.aws.amazon.com/dynamodbv2/home#tables).
    2. Navigate to **Tables**.
    3. Click the **Create table** button.
    4. Set **Table name** to `bucketav-scan-results`.
    5. Set **Partition key** to `bucket_key` (String).
    6. Under **Table settings**, select **Customize settings**.
    7. Under **Read/write capacity settings**, select **Capacity mode** `On-demand`.
    8. Click the **Create table** button.
2. Create Lambda function:
    1. Visit the [AWS Lambda Management Console](https://console.aws.amazon.com/lambda/home#/functions)
    2. Navigate to **Functions**.
    3. Click the **Create function** button.
    4. Double check that **Author from scratch** is selcted.
    5. Set **Function name** to `bucketav-scan-results`.
    6. Set **Runtime** to `Node.js 16.x`.
    7. Expand **Change default execution role**.
    8. Set **Execution role** to `Create a new role from AWS policy templates`.
    9. Set **Role name** to `bucketav-scan-results`.
    10. Set **Policy templates** to `Simple microservice permissions DynamoDB` (search for DyanmoDB).
    11. Click the **Create function** button.
    12. Under **Function overview Info**, click the **Add trigger** button.
    13. Select **Source** `SNS`.
    14. Set **SNS topic** to the topic starting with `bucketav-FindingsTopic`.
    15. Under **Code source**, set the source code to the contents of [subscribe.js](subscribe.js)
    16. Click the **Deploy** button.
3. Upload a file to any S3 bucket connected to bucketAV via EventBridge or an S3 Event Notification.
4. Use [download.js](download.js) to generate the pre-signed URL.
