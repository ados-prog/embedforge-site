
let timerInterval;

function startTimer() {
  let time = window.currentTask?.time || 30;
  const timer = document.getElementById('timer');

  clearInterval(timerInterval);

  timer.innerText = time;

  timerInterval = setInterval(() => {
    time--;
    timer.innerText = time;

    if (time <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}
