var exec = require('child_process').exec
, async = require('async')
;

var tasks;
module.exports = tasks = {};

tasks.conf = {};
tasks.conf.nginx = {
  script: '/etc/init.d/nginx'
}

tasks.upgradetNginx = function(cb){
  handleEtcInitdScript('nginx', 'upgrade', cb);
}

tasks.restartNginx = function(cb){
  handleEtcInitdScript('nginx', 'restart', cb);
}

function handleEtcInitdScript(scriptName, cmd, cb){
  var throwCommand =　tasks.conf[scriptName].script + ' ' + cmd;
  exec(throwCommand, function(err, stdout, stderr){
    if(err){
      console.log(err.toString());
      cb();
      return;
    }
    if(stdout){
      console.log(stdout);
    }
    cb();
  });
}