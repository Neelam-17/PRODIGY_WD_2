// Variables to store time and state
let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

// Update the display with formatted time
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
}

// Update the HTML display
function print(txt) {
    document.getElementById("display").innerHTML = txt;
}

// Start the stopwatch
function start() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
        elapsedTime = Date.now() - startTime;
        print(timeToString(elapsedTime));
    }, 1000);
    running = true;
    document.getElementById("startStopBtn").innerText = "Pause";
}

// Stop the stopwatch
function stop() {
    clearInterval(timerInterval);
    running = false;
    document.getElementById("startStopBtn").innerText = "Start";
}

// Reset the stopwatch
function reset() {
    clearInterval(timerInterval);
    print("00:00:00");
    elapsedTime = 0;
    running = false;
    document.getElementById("startStopBtn").innerText = "Start";
    document.getElementById("lapsList").innerHTML = "";
}

// Record a lap
function lap() {
    let lapsList = document.getElementById("lapsList");
    let li = document.createElement("li");
    li.innerText = timeToString(elapsedTime);
    lapsList.appendChild(li);
}

// Add event listeners
document.getElementById("startStopBtn").addEventListener("click", function() {
    if (!running) {
        start();
    } else {
        stop();
    }
});

document.getElementById("resetBtn").addEventListener("click", function() {
    reset();
});

document.getElementById("lapBtn").addEventListener("click", function() {
    if (running) {
        lap();
    }
});