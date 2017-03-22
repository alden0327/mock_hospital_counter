const time_worker = require('./time_worker.js');

function setDealTimeFunc(min, max) {
  return function() {
    var n = Math.floor(Math.random() * (max - min + 1)) + min;
    return n;
  }
}

var workers = [
    time_worker.Result(0, 1000, 15, 5, 30, setDealTimeFunc(19, 21) ),
    time_worker.Result(1, 1000, 15, 5, 10, setDealTimeFunc(19, 21) ),
    time_worker.Result(2, 1000, 15, 5, 40, setDealTimeFunc(19, 21) ),
    time_worker.Result(3, 1000, 15, 5, 10, setDealTimeFunc(19, 21) ),
    time_worker.Result(4, 1000, 15, 5, 10, setDealTimeFunc(19, 21) ),
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
var average_wait = 0;
console.log("Total waiting time: "+total_waiting_time+" mins");
for (var i in workers) {
  var worker = workers[i];
  total_waiting_time += worker.total_wait;
  console.log("Patients at Worker "+worker.ID+" total wait "+worker.average_wait+" mins");
  average_wait += worker.average_wait;
}
console.log("Average waiting time: "+average_wait/workers.length+" mins");
for (var i in workers) {
  var worker = workers[i];
  console.log("Worker "+worker.ID+" cost time: "+worker.cost_time+" mins");
  console.log("Worker "+worker.ID+" use rate: "+worker.use_rate+" %");
}
