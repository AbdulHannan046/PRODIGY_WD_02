/* scripts.js */

document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let running = false;
    let elapsedTime = 0;
    let startTime;
    const timeDisplay = document.querySelector('.time-display');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapBtn = document.getElementById('lapBtn');
    const lapsList = document.querySelector('.laps');

    startPauseBtn.addEventListener('click', () => {
        if (running) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    resetBtn.addEventListener('click', resetTimer);
    lapBtn.addEventListener('click', recordLap);

    function startTimer() {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000);
        startPauseBtn.textContent = 'Pause';
        running = true;
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        startTime = null;
        running = false;
        startPauseBtn.textContent = 'Start';
        timeDisplay.textContent = '00:00:00';
        lapsList.innerHTML = '';
    }

    function updateTime() {
        elapsedTime = Date.now() - startTime;
        timeDisplay.textContent = formatTime(elapsedTime);
    }

    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    function recordLap() {
        if (!running) return;
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});
