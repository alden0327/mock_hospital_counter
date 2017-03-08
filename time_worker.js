const time_patients = require('./time_patient.js');

Patients = []

for(let i=0; i<1000; i+=5) {
  Patients.push(new time_patients.Patient(i));
}

var now = 0;

for (var i in Patients) {
  var Patient = Patients[i]
  if(Patient.arriveTime > now) {
    now = Patient.arriveTime;
  } else {
    Patient.waitingTime = now - Patient.arriveTime;
  }
  Patient.dealTime = 1;
  now += Patient.dealTime
}

var total_waiting_time = 0;
for (var i in Patients) {
  Patient = Patients[i];
  total_waiting_time += Patient.waitingTime;
}

console.log(total_waiting_time);
