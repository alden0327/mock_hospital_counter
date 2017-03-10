const time_worker = require('./time_worker.js');
var workers = [
  time_worker.Result(0),
  time_worker.Result(1),
  time_worker.Result(2),
  time_worker.Result(3),
  time_worker.Result(4),
];

var TotalUseTime = 0,
  total_waiting_time = 0;
for (var i in workers) {
  var worker = workers[i];
  total_waiting_time += worker.total_wait;
  console.log("Patients at Worker "+worker.ID+" total wait "+worker.total_wait+" mins");
  if(worker.cost_time > TotalUseTime) {
    TotalUseTime = worker.cost_time;
  }
}
console.log("Total waiting time: "+total_waiting_time+" mins");
console.log("Average waiting time: "+total_waiting_time/1000+" mins");
for (var i in workers) {
  var worker = workers[i];
  console.log("Worker "+worker.ID+" cost time: "+worker.cost_time+" mins");
  console.log("Worker "+worker.ID+" use rate: "+worker.cost_time/TotalUseTime*100+" %");
}
