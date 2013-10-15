var exec = require('child_process').exec
  , async = require('async')
  , tasks = require('./tasks')
;

var program = require('commander');
program
  .option('-u, --url [value]', 'url string')
  .parse(process.argv);


exports.checkBadGateway = function(taskList){

  console.log('checkBadGateway...');
  exec('curl -I ' + program.url + ' -k', function(err, stdout, stderr){
    if(err){
      return;
    }
    if(stdout){
      var header = stdout.split('\n');
      if(header[0] && header[0].match('502')){
        async.series(taskList.map(function(val){
          return tasks[val];
        }), function(err, data){
          console.log('Task processing was done.');
        })
      }
    }

  });
}
