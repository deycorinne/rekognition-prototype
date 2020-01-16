require("dotenv").config();

var _ = require("lodash");
var express = require("express");
var path = require("path");
var app = express();

// var awsHelpers = require("./helpers/aws");
var fileHelpers = require("./helpers/file");

// var FILE_PATH = process.argv[2];
var FILE_PATH = "test-video.mp4";

// Set up App
app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
    // TODO: use AWS to get JSON from rekognition but for now...
    // read sample JSON file
    fileHelpers.readJsonFile("sample.json").then(data => {
        // for right now I dont care about who the person is, just where their face is
        var faces = _.compact(_.map(data.Persons, person => {
            if (person.Person.Face) {
                return {
                    bounds: person.Person.Face.BoundingBox,
                    time: person.Timestamp,
                    index: person.Person.Index
                };
            } else {
                return null;
            }
            
        }));

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
        );
    });
});

app.listen(3000, () => console.log(`Example app listening on port 3000!`));

/*
awsHelpers.startRekFaceDetection(FILE_PATH).then(data => {
    console.log(data)
}).catch(err => {
    console.log("There was an error detecting faces: ", err.message);
});
*/
