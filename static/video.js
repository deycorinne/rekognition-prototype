(function(window) {
    var vid = window.document.getElementById("faceVideo");
    var videoWidth = vid.offsetWidth;
    var videoHeight = vid.offsetHeight;
    var faceBox = window.document.getElementById("faceBox");

    // for right now we know each video will have at least one person, 
    // as we find more we will generate random colors for their respective boxes
    var peopleColors = ["#34eb74"];
    
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

        // if we find a face/person, update the box styles
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
                if (peopleColors[currentPerson]) {
                    faceBox.style["border-color"] = `${peopleColors[currentPerson]}`;
                } else {
                    let newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                    faceBox.style["border-color"] = `${newColor}`;
                    peopleColors[currentPerson] = newColor;
                }
            }
        }
    };
})(window);
