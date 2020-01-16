require('dotenv').config();

var _ = require('lodash');
var express = require('express');
var path = require('path');
var app = express();

var awsHelpers = require('./helpers/aws');
var fileHelpers = require('./helpers/file');

// var FILE_PATH = process.argv[2];
var FILE_PATH = "test-video.mp4";

// Set up App
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) =>  {
    // read sample JSON file
    fileHelpers.readJsonFile('sample.json').then(data => {
        // for right now I dont care about who the person is, just where their face is
        var faces = _.map(data.Persons, person => {
            return {
                "bounds": person.Person.BoundingBox,
                "time": person.Timestamp,
                "index": person.Person.Index
            };
        });

        // TODO: we need to loop through the faces once a user clicks play and update the canvas styles based on timestamp
        let styles = faces[0];
        let faceString = JSON.stringify(faces);
        res.send(
            `<div class="video-with-shapes" style="position: relative;">
                <video style=" width: 100%" controls id="faceVideo">
                    <source src="${FILE_PATH}" type="video/mp4">
                </video>
                <div class="canvas" id="faceBox"
                    style="
                        position: absolute; 
                        z-index: 1; 
                        border: 5px solid #34eb74; 
                        top: ${styles.bounds.Top * 100}%;
                        left: ${styles.bounds.Left * 100}%;
                        width: ${styles.bounds.Width * 100}%;
                        height: ${styles.bounds.Height * 100}%"
                    > </div>

                <script type="text/javascript">
                    var faces = ${faceString};
                </script>
                <script type="text/javascript" src="video.js"></script>

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
