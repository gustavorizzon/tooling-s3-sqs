'use strict';

const AWS = require('aws-sdk')

const host = process.env.LOCALSTACK_HOST || "localhost"
const port = Number(process.env.EDGE_PORT || 4566)

const s3Config = {
	s3ForcePathStyle: true,
	endpoint: new AWS.Endpoint(`http://${host}:${port}`)
}

const s3 = new AWS.S3(s3Config)

module.exports.hello = async (event) => {
	const allBuckets = await s3.listBuckets().promise()
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello World!',
        input: event,
      },
      null,
      2
    ),
  };
};
