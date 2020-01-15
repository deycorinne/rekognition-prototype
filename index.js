require('dotenv').config();;
var awsHelpers = require('./awsHelper');
var FILE_PATH = process.argv[2];


awsHelpers.gets3Object(FILE_PATH).then(video => {

    // var bitmap = new createjs.VideoBuffer(video.Body); // TODO: update to use our video from s3-- this should be an html element? maybe use a dif library
    // var g = new createjs.Graphics(); // init new graphics clas

    awsHelpers.startRekFaceDetection(FILE_PATH).then(result => {
        console.log(result)

        // extract our faces from the results
        let faces = data.Faces;
        for(var i=0; i < faces.length; i++){
            // to begin, something simple: grab the BoundingBox of each face 
            // draw our rect using the face data found in face.BoundingBox
            g.drawRect(face.BoundingBox);

            // TODO add new rect to video bitmap at face.Timestamp
        }

        // TODO: when done looping through all faces and drawing their rects, save the new video to s3

    }).catch(err => {
        console.log("There was an error detecting faces: ", err.message);
    });

});

    