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