var nginx = require('./nginx')
, program = require('commander')
;

program
  .version('0.0.1')
  .option('-i, --interval [value]', 'interval micro sec')
  .parse(process.argv);
;

setInterval(function(){
  nginx.checkBadGateway(['restartNginx']);
}, program.interval || 60000);