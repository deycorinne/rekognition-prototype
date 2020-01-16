var fs = require('fs');

module.exports = {
    readJsonFile: function(file) {
        var obj;
        fs.readFile('file', 'utf8', function (err, data) {
            if (err) throw err;
            return JSON.parse(data);
        });
    }
};