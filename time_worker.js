const time_patients = require('./time_patient.js');

exports.Result = function(id, counterPatients, fA, workersAmount, probability, randomDealTime) {
  var Worker = {
    Patients: [],
    Max: 50,
    hasRoom: function() {
      return this.Patients.length < this.Max
    },
    ID: id
  };

  Patients = []

  var counterWorkTime = counterPatients*fA;
  var frequenyAllocation = fA*workersAmount*((probability/100)/(1/workersAmount));
  for(let i=0; i<counterWorkTime; i+=frequenyAllocation) {
    Patients.push(time_patients.Patient(i));
  }

  var amount_of_Patients = Patients.length;
  var aOP = amount_of_Patients;
  var now = 0;
  var total_waiting_time = 0;
  var checking_time = 0;

  while(true) {
    var _Patient = []
    if(_Patient.length === 0) {
    // 如果暫存器沒有人，就把一個病人放進去等候
      _Patient.push(Patients.shift())
      amount_of_Patients -= 1;
    }
    if(Worker.hasRoom()) {
      let patient = _Patient.shift();
      // patient.arriveTime = now
      Worker.Patients.push(patient)
    } else {
      _Patient[0].arriveTime = now
    }
    if(Worker.Patients.length > 0) {
    // 如果有病人在等候線等待
      var Patient = Worker.Patients.shift()
      if(Patient.arriveTime > now) {
        now = Patient.arriveTime;
      } else {
        Patient.waitingTime = now - Patient.arriveTime;
        total_waiting_time += Patient.waitingTime
      }
      Patient.dealTime = randomDealTime();
      checking_time += Patient.dealTime;
      now += Patient.dealTime;
    }
    if(amount_of_Patients == 0) {
      break;
    }
  }
  return {
    total_wait: total_waiting_time,
    average_wait: total_waiting_time/aOP,
    use_rate: checking_time/now*100,
    cost_time: now,
    ID: Worker.ID
  }
}
