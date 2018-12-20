const fs = require('fs');  //access file system

var logger = ((logMessage, logFunction, logLevel) => {
  var now = new Date().toString();
  var log = `${now}: ${logFunction}: ${logLevel}: ${logMessage}`;
  console.log(`${log}`);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('unable to append to server.log');
    }
  });

});

module.exports.logger = logger;
