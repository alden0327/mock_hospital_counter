const worker = require('./worker');
const counter = require('./counter');

var workers = worker.workers

var last_patients = 10000;
const Counter = counter.Counter(workers);
var Had_patients = true;

while(Had_patients) {
  var notyet = 0;
  var thisTimeDeal = Counter.work(last_patients);
  var workers = Counter.workers;
  for (let i in workers) {
    notyet += workers[i].work();
  }
  last_patients -= thisTimeDeal;

  if(notyet <=0 ) {
    Had_patients = false;
  }
}
