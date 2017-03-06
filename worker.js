exports.Worker = function(max_q, ID) {
  var waiting_patients = 0,
    MAX_Queue = max_q,
    once_deplete = 2,
    id = ID,
    last = () => {
      return MAX_Queue - waiting_patients;
    },
    work = () => {
      console.log('Worker '+id+' now had '+waiting_patients+' patients');
      if(waiting_patients - once_deplete >= 0) {
        waiting_patients -= once_deplete;
        console.log('Deplete '+once_deplete+' patients');
      } else {
        console.log('Deplete '+(waiting_patients-0)+' patients');
        waiting_patients = 0;
      }
      console.log("Worker "+id+" Last: "+waiting_patients+" patients");
      return waiting_patients;
    },
    add_patients = (amount) => {
      waiting_patients += amount;
    };
    return {
      last: last,
      work: work,
      add_patients: add_patients,
      id: id
    };
}
