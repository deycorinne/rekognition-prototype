const AWS = require("aws-sdk");

// TODO: fill in AWS data- Erin will configure this
const ID = process.env.AWS_KEY_ID;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;
const BUCKET = process.env.S3_BUCKET;
const ROLE_ARN = process.env.AWS_ROLE_ARN;
const SNS_TOPIC_ARN = process.env.AWS_SNS_TOPIC_ARN;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

var rekognition = new AWS.Rekognition();

module.exports = {
    gets3Object: function(file) {
        return new Promise((resolve, reject) => {
            var params = { Bucket: BUCKET, Key: file };

            s3.getObject(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return reject(err);
                } else {
                    console.log(data);
                    return resolve(data);
                }
            });
        })
    },

    startRekFaceDetection: function(file) {
        return new Promise((resolve, reject) => {
            var params = {
                Video: {
                    S3Object: {
                        Bucket: BUCKET,
                        Name: file
                    }
                },
                FaceAttributes: "DEFAULT",
                NotificationChannel: {
                    RoleArn: ROLE_ARN /* The Amazon SNS topic to which Amazon Rekognition to posts the completion status. */,
                    SNSTopicArn: SNS_TOPIC_ARN /* The ARN of an IAM role that gives Amazon Rekognition publishing permissions to the Amazon SNS topic. */
                }
            };

            rekognition.startFaceDetection(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return reject(err);
                } else {
                    console.log(data);
                    return resolve(data);
                }
            });
        })
    },

    getRekFaceDetection: function(job) {
        return new Promise((resolve, reject) => {
            // When finished, Rekognition publishes a status to the ASNS topic that you specify in NotificationChannel
            // TODO: first check that the status value published to the Amazon SNS topic is SUCCEEDED
            var params = {
                JobId: job
            };
            rekognition.getFaceDetection(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return reject(err);
                } else {
                    console.log(data);
                    return resolve(data);
                }
            });
        })
    }
};
