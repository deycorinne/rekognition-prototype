var fs = require('fs');

module.exports = {
    readJsonFile: function(file) {
        return new Promise((resolve, reject) => {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                    return reject(err);
                } else {
                    return resolve(JSON.parse(data));
                }
            });
        });
    }
};