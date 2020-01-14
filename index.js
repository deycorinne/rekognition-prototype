import AWS from 'aws-sdk';
var rekognition = new AWS.Rekognition();


// TODO: maybe allow the user to upload a video to s3 first? or just pass in a video name that is alrady stored there
// TODO: fill in AWS data- Erin will configure this
var params = {
    Video: {
        /* required */
        S3Object: {
            Bucket: "STRING_VALUE",
            Name: "STRING_VALUE",
            Version: "STRING_VALUE"
        }
    },
    ClientRequestToken: "STRING_VALUE",
    FaceAttributes: DEFAULT | ALL,
    JobTag: "STRING_VALUE",
    NotificationChannel: {
        RoleArn: "STRING_VALUE" /* required */,
        SNSTopicArn: "STRING_VALUE" /* required */
    }
};

// first start our face detection process
rekognition.startFaceDetection(params, function(err, data) {
    if (err) {
        // an error occurred
        console.log(err, err.stack);
    } else {
        // successful response
        console.log(data);

        // When finished, Rekognition publishes a status to the ASNS topic that you specify in NotificationChannel
        // TODO: first check that the status value published to the Amazon SNS topic is SUCCEEDED
        var params = {
            JobId: data.JobId
        };
        rekognition.getFaceDetection(params, function(err, data) {
            if (err) {
                // an error occurred
                console.log(err, err.stack);
            } else {
                // successful response
                console.log(data);

                var bitmap = new createjs.Bitmap("imagePath.jpg"); // TODO: update to use our video from s3
                var g = new createjs.Graphics(); // init new graphics class

                // extract our faces from the results
                let faces = data.Faces;
                for(var i=0; i < faces.length; i++){
                    // to begin, something simple: grab the BoundingBox of each face 
                    // draw our rect using the face data found in face.BoundingBox
                    g.drawRect(face.BoundingBox);

                    // TODO add new rect to video bitmap at face.Timestamp
                }

                // TODO: when done looping through all faces and drawing their rects, save the new video to s3
            }
        });
    }
});
