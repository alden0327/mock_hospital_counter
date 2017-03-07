exports.Patient = (arrivedTime) => {
  var _arrivedTime = arrivedTime,
    _dealwithCounterTime = 1, // 1 min
    _arrivedWorkerTime = _arrivedTime + _dealwithCounterTime,
    _startWorkerTime,
    _dealwithWorkerTime = 5;
  var startBeDealByWorker = (now) => {
    _startWorkerTime = now
  },
  startWithWorker = () => {
    return _startWorkerTime
  },
  waitingTime = () => {
    return _startWorkerTime - _arrivedWorkerTime;
  },
  dealWithWorker = () => {
    return _dealwithWorkerTime
  },
  return {
    startWithWorker: startWithWorker,
    waitingTime: waitingTime,
    startBeDealByWorker: startBeDealByWorker,
    dealWithWorker: dealWithWorker,
  };
}
