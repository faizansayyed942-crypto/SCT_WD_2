let startTime = 0;
let elapsed = 0;
let interval = null;
let running = false;
let lapNo = 0;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  let milli = ms % 1000;

  return (
    String(h).padStart(2, '0') + ":" +
    String(m).padStart(2, '0') + ":" +
    String(s).padStart(2, '0') + "." +
    String(milli).padStart(3, '0')
  );
}

function update() {
  const now = Date.now();
  const time = elapsed + (running ? now - startTime : 0);
  display.textContent = formatTime(time);
}

document.getElementById("startBtn").onclick = () => {
  if (running) return;
  running = true;
  startTime = Date.now();
  interval = setInterval(update, 10);
};

document.getElementById("pauseBtn").onclick = () => {
  if (!running) return;
  running = false;
  elapsed += Date.now() - startTime;
  clearInterval(interval);
};

document.getElementById("resetBtn").onclick = () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  elapsed = 0;
  lapNo = 0;
  display.textContent = "00:00:00.000";
  laps.innerHTML = "";
};

document.getElementById("lapBtn").onclick = () => {
  if (!running && elapsed === 0) return;

  const now = Date.now();
  const time = elapsed + (running ? now - startTime : 0);
  lapNo++;

  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapNo}</span><span>${formatTime(time)}</span>`;
  laps.prepend(li);
};
