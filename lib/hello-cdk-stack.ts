import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';



export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const api = new apigateway.RestApi(this, 'Api', {
      restApiName: 'MyApi',
    });

    const lambda_function_one = new lambda.Function(this, 'Function', {
      runtime: lambda.Runtime.PYTHON_3_10,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('src'),
    });

    api.root.addMethod('GET', new apigateway.LambdaIntegration(lambda_function_one));

   
    const queue = new sqs.Queue(this, 'HelloCdkQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });
    
  }
}
