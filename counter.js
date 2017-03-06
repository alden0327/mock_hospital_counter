exports.Counter = function(workers_init) {
  var _workers = workers_init,
    once_deplete = 10,
    work = (patients) => {
      var had_cost=0;
      if(patients > 0) {
        console.log('\nCounter now has '+patients+' patients');
        while(had_cost < once_deplete) { // this process's live condition
          thisTime_bigger = findWorkerLastMostRoom(_workers);
          if(thisTime_bigger.worker_id === null) {
            console.log('Every workers has no room');
            break;
          } else {
            for(let i in _workers) {
              if(_workers[i].id === thisTime_bigger.worker_id) {
                _workers[i].add_patients(1);
                console.log('Send patient to Worker '+_workers[i].id);
                had_cost++;
              }
            }
          }
        }
      } else {
        // No patients waiting, so Counter has no work to do.
        console.log('There has no patients waiting, so Counter has no work');
      }
      return had_cost;
    };
  return {
    work: work,
    workers: _workers,
  };
}

function findWorkerLastMostRoom(workers) {
  var most_last=0, mostOne_ID=null;
  for(let now in workers) {
    if(most_last < workers[now].last()) {
      most_last = workers[now].last();
      mostOne_ID = workers[now].id;
    }
  }
  return {
    val: most_last,
    worker_id: mostOne_ID
  };
}
