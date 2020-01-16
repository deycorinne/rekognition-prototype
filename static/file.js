var fs = require("fs");

const readJsonFile = function(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", function(err, data) {
            if (err) {
                console.log(err, err.stack);
                return reject(err);
            } else {
                return resolve(JSON.parse(data));
            }
        });
    });
};

export default readJSON;
