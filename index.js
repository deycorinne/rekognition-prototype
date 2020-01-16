require('dotenv').config();

var _ = require('lodash');
var express = require('express');
var path = require('path');
var app = express();

var awsHelpers = require('./helpers/aws');
var fileHelpers = require('./helpers/file');

var FILE_PATH = process.argv[2];

// Set up App
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) =>  {
    // read sample JSON file
    fileHelpers.readJsonFile('sample.json').then(data => {
        // for right now I dont care about who the person is, just where their face is
        var faces = _.map(data.Persons, person => {
            var time = person.Timestamp;
            return {
                [time]: person.Person.BoundingBox
            };
        });

        // TODO: we need to loop through the faces once a user clicks play and update the canvas styles based on timestamp
        let styles = faces[0];
        res.send(
            `<div class="video-with-shapes" style="position: relative;">
                <video style=" width: 100%" controls>
                    <source src="test-video.mp4" type="video/mp4">
                </video>
                <div class="canvas" 
                style="
                    position: absolute; 
                    right: 0; 
                    bottom: 0; 
                    z-index: 1; 
                    border: 5px solid white; 
                    top: ${styles["0"].Top * 100}%;
                    left: ${styles["0"].Left * 100}%;
                    width: ${styles["0"].Width * 100}%;
                    height: ${styles["0"].Height * 100}%"
                    >
            </div>`
        )
    });
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`))

/*
awsHelpers.gets3Object(FILE_PATH).then(video => {

    // var bitmap = new createjs.VideoBuffer(video.Body); // TODO: update to use our video from s3-- this should be an html element? maybe use a dif library
    // var g = new createjs.Graphics(); // init new graphics clas

    awsHelpers.startRekFaceDetection(FILE_PATH).then(data => {
        console.log(data)

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
*/
