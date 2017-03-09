const time_worker = require('./time_worker.js');
var workers = [
  time_worker.Result(),
  time_worker.Result(),
  time_worker.Result(),
  time_worker.Result(),
  time_worker.Result(),
];

var TotalUseTime = 0,
  total_waiting_time = 0;
for (var i in workers) {
  var worker = workers[i];
  total_waiting_time += worker.total_wait;
  if(worker.cost_time > TotalUseTime) {
    TotalUseTime = worker.cost_time;
  }
}
console.log(total_waiting_time);
for (var i in workers) {
  var worker = workers[i];
  console.log(worker.cost_time/TotalUseTime*100+"%");
}
