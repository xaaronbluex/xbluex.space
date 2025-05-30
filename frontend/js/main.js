// Additional frontend logic can go here
console.log('Frontend loaded successfully ^3^');

// Clock function to display HKT time
function displayClock() {
    const clockElement = document.getElementById('clock');
    if (!clockElement) return;

    const now = new Date();
    // Adjust for HKT (UTC+8)
    const hktOffset = 8 * 60; // 8 hours in minutes
    const hktTime = new Date(now.getTime() + (hktOffset * 60 * 1000) + (now.getTimezoneOffset() * 60 * 1000));

    let hours = hktTime.getHours();
    const minutes = String(hktTime.getMinutes()).padStart(2, '0');
    const seconds = String(hktTime.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    clockElement.textContent = timeString;
}

//start clock on page load
displayClock();
setInterval(displayClock, 1000); // Update clock every second


// Matrix Digital Rain
const canvas = document.getElementById("Matrix");
const context = canvas.getContext("2d");

canvas.width = window.visualViewport.width;
canvas.height = window.visualViewport.height;

const katakana =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const chinese = "日月金木水火土竹戈十大中一弓人心手口尸廿山女田已卜";
const nums = "0123456789";

const alphabet = katakana + latin + nums + chinese;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
  rainDrops[x] = 1;
}

const draw = () => {
  context.fillStyle = "rgba(0, 0, 0, 0.1)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "#0F0";
  context.font = fontSize + "px monospace";

  for (let i = 0; i < rainDrops.length; i++) {
    const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

    if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      rainDrops[i] = 0;
    }
    rainDrops[i]++;
  }
};

setInterval(draw, 30);