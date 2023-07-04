def handler(event, context):
    print(event)
    return {"body": "Hello", "statusCode": 200, "headers": {"Content-Type": "text/plain"}}
