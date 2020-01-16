(function(window) {
    var vid = window.document.getElementById("faceVideo");
    var videoWidth = vid.offsetWidth;
    var videoHeight = vid.offsetHeight;
    var faceBox = window.document.getElementById("faceBox");

    // TODO: assign each person a random color, do not hardcode
    var peopleColors = {
        0: "#34eb74",
        1: "1d94f0"
    }
    
    let lastTime = 0;
    let currentPerson = 0;
    vid.ontimeupdate = function(e) {
        let time = Math.round(this.currentTime * 1000);

        // we need to be able to handle rewinding and skipping around in the video
        if (time <= lastTime) {
            lastTime = time;
        }
        // find a face bounds object using relative time
        var person = faces.find(
            element => element["time"] >= lastTime && time >= element["time"]
        );
        if (person) {
            let personNum = person.index;
            
            // update our canvas box to wrap the face
            faceBox.style["top"] = `${person.bounds.Top * videoHeight}px`;
            faceBox.style["left"] = `${person.bounds.Left * videoWidth}px`;
            faceBox.style["width"] = `${person.bounds.Width * videoWidth}px`;
            faceBox.style["height"] = `${person.bounds.Height * videoHeight}px`;
            lastTime = time;

            // if this is a new person, change the color of the box
            if(personNum !=currentPerson){
                currentPerson = personNum;
                faceBox.style["border-color"] = `${peopleColors[currentPerson]}`;
            }
        }
    };
})(window);
