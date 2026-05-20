// ==============================
// BLOCK RIGHT CLICK
// ==============================

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// ==============================
// BLOCK REFRESH
// ==============================

document.addEventListener("keydown", function(e) {

  // F5
  if (e.key === "F5") {
    e.preventDefault();
  }

  // CTRL + R
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
    e.preventDefault();
  }

});

// ==============================
// TIMER SETTINGS
// ==============================
const TIMER_DURATION = (1 * 60 * 60) + (5 * 60); // 1 hour 5 minutes
//const TIMER_DURATION = 65 * 60; // 30 minutes

let endTime = localStorage.getItem("examEndTime");

if (!endTime) {

  endTime = new Date().getTime() + TIMER_DURATION * 1000;

  localStorage.setItem("examEndTime", endTime);
}

// ==============================
// TIMER FUNCTION
// ==============================

function updateTimer() {

  const now = new Date().getTime();

  const distance = endTime - now;

  const timer = document.getElementById("timer");

  const submitBtn = document.getElementById("submitBtn");

  const timeUpMessage = document.getElementById("timeUpMessage");

  // ==============================
  // TIME FINISHED
  // ==============================

  if (distance <= 0) {

    timer.innerHTML = "00:00";

    // SHOW MESSAGE
    timeUpMessage.style.display = "block";

    // DISABLE SUBMIT BUTTON
    submitBtn.classList.add("disabled-btn");

    submitBtn.removeAttribute("href");

    // DISABLE WHOLE PAGE
    document.body.classList.add("exam-ended");

    // CLEAR TIMER
    localStorage.removeItem("examEndTime");

    return;
  }

  // ==============================
  // TIMER RUNNING
  // ==============================

const hours = Math.floor(distance / (1000 * 60 * 60));

const minutes = Math.floor(
  (distance % (1000 * 60 * 60)) / (1000 * 60)
);

const seconds = Math.floor(
  (distance % (1000 * 60)) / 1000
);

timer.innerHTML =
  String(hours).padStart(2, '0') + ":" +
  String(minutes).padStart(2, '0') + ":" +
  String(seconds).padStart(2, '0');

 

// ==============================
// START TIMER
// ==============================

setInterval(updateTimer, 1000);

updateTimer();
