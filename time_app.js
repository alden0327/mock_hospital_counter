const time_worker = require('./time_worker.js');

workers_amount = 5;

var workers = [];

for(let i=0; i<workers_amount; i++) {
  workers[i] = time_worker.Result(0, 1000, 15, workers_amount);
}

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
var average_wait = 0;
console.log("Total waiting time: "+total_waiting_time+" mins");
for (var i in workers) {
  var worker = workers[i];
  total_waiting_time += worker.total_wait;
  console.log("Patients at Worker "+worker.ID+" total wait "+worker.average_wait+" mins");
  average_wait += worker.average_wait;
}
console.log("Average waiting time: "+average_wait/workers_amount+" mins");
for (var i in workers) {
  var worker = workers[i];
  console.log("Worker "+worker.ID+" cost time: "+worker.cost_time+" mins");
  console.log("Worker "+worker.ID+" use rate: "+worker.use_rate+" %");
}
