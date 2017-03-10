const time_patients = require('./time_patient.js');

function randomDealTime() {
  var maxNum = 15;
  var minNum = 5;
  var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  return n;
}

exports.Result = function(id) {
  var Worker = {
    Patients: [],
    Max: 50,
    hasRoom: function() {
      return this.Patients.length < this.Max
    },
    ID: id
  };

  Patients = []

  var counterWorkTime = 1000;
  var frequenyAllocation = 12;
  for(let i=0; i<counterWorkTime; i+=frequenyAllocation) {
    Patients.push(time_patients.Patient(i));
  }

  var amount_of_Patients = Patients.length;
  var now = 0;
  var total_waiting_time = 0;

  while(true) {
    var _Patient = []
    if(_Patient.length === 0) {
      _Patient.push(Patients.shift())
      amount_of_Patients -= 1;
    }
    if(Worker.hasRoom()) {
      Worker.Patients.push(_Patient.shift())
    } else {
      _Patient[0].arriveTime = now
    }
    if(Worker.Patients.length > 0) {
      var Patient = Worker.Patients.shift()
      if(Patient.arriveTime > now) {
        now = Patient.arriveTime;
      } else {
        Patient.waitingTime = now - Patient.arriveTime;
        total_waiting_time += Patient.waitingTime
      }
      Patient.dealTime = randomDealTime();
      now += Patient.dealTime;
    }
    if(amount_of_Patients == 0) {
      break;
    }
  }
  return {
    total_wait: total_waiting_time,
    cost_time: now,
    ID: Worker.ID
  }
}
