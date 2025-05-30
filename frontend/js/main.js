console.log('Frontend loaded successfully ^3^');

// --- Matrix Digital Rain ---
const matrixCanvas = document.getElementById("Matrix");
if (matrixCanvas && matrixCanvas.getContext) {
    const ctx = matrixCanvas.getContext("2d");
    if (ctx) {
        matrixCanvas.width = window.visualViewport.width;
        matrixCanvas.height = window.visualViewport.height;

        const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
        const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        const chinese = "日月金木水火土竹戈十大中一弓人心手口尸廿山女田已卜";
        const nums = "0123456789";
        const alphabet = katakana + latin + nums + chinese;

        const fontSize = 16;
        const columns = Math.floor(matrixCanvas.width / fontSize);
        const rainDrops = new Array(columns).fill(1);
        const rainSpeed = 2;

        function drawMatrix() {
            ctx.fillStyle = "rgba(3, 4, 8, 0.1)";
            ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

            ctx.fillStyle = "blue";
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.random() * alphabet.length);
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > matrixCanvas.height && Math.random() > 0.9) {
                    rainDrops[i] = 0;
                }
                rainDrops[i] += rainSpeed;
            }

            requestAnimationFrame(drawMatrix);
        }

        drawMatrix();

        window.addEventListener('resize', () => {
            matrixCanvas.width = window.visualViewport.width;
            matrixCanvas.height = window.visualViewport.height;
            rainDrops.length = Math.floor(matrixCanvas.width / fontSize);
            rainDrops.fill(1);
        });
    } else {
        console.error('Matrix canvas context not supported');
    }
} else {
    console.error('Matrix canvas element not found');
}

// --- Clock (HKT) ---
const clockElement = document.getElementById("clock");
if (clockElement) {
    function updateClock() {
        try {
            const now = new Date();
            const hktTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" }));

            const hours = hktTime.getHours() % 12 || 12;
            const minutes = String(hktTime.getMinutes()).padStart(2, '0');
            const seconds = String(hktTime.getSeconds()).padStart(2, '0');
            const ampm = hktTime.getHours() >= 12 ? 'PM' : 'AM';
            clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;

            requestAnimationFrame(updateClock);
        } catch (error) {
            console.error('Clock error:', error.message);
            clockElement.textContent = 'Clock error';
        }
    }

    updateClock();
} else {
    console.error('Clock element not found');
}

// --- 3D ASCII Donut ---
document.addEventListener('DOMContentLoaded', () => {
    const donutElement = document.getElementById('donut');
    
    if (!donutElement) {
        console.error('Donut element not found.');
        return;
    }

    // Screen dimensions for ASCII art (adjusted to make the donut smaller)
    const screenWidth = 50; // Reduced width
    const screenHeight = 60; // Reduced height

    // Torus parameters
    const R1 = 1;
    const R2 = 2;
    const K2 = 5;

    // K1 must be recalculated with the new screenWidth
    const K1 = screenWidth * K2 * 3 / (8 * (R1 + R2));

    let A = 0;
    let B = 0;

    let animationId = null;

    const luminanceChars = '.,-~:;=!*#$@';

    function renderFrame() {
        const cosA = Math.cos(A);
        const sinA = Math.sin(A);
        const cosB = Math.cos(B);
        const sinB = Math.sin(B);

        const output = Array(screenHeight).fill().map(() => Array(screenWidth).fill(' '));
        const zbuffer = Array(screenHeight).fill().map(() => Array(screenWidth).fill(0));

        for (let theta = 0; theta < 2 * Math.PI; theta += 0.07) {
            const costheta = Math.cos(theta);
            const sintheta = Math.sin(theta);

            for (let phi = 0; phi < 2 * Math.PI; phi += 0.02) {
                const cosphi = Math.cos(phi);
                const sinphi = Math.sin(phi);

                const circlex = R2 + R1 * costheta;
                const circley = R1 * sintheta;

                const x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB;
                const y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB;
                const z = K2 + cosA * circlex * sinphi + circley * sinA;

                const ooz = 1 / z;

                const xp = Math.floor(screenWidth / 2 + K1 * ooz * x);
                const yp = Math.floor(screenHeight / 2 - K1 * ooz * y);

                const L = cosphi * costheta * sinB 
                        - cosA * costheta * sinphi 
                        - sinA * sintheta 
                        + cosB * (cosA * sintheta - costheta * sinA * sinphi);
                
                if (L > 0 && xp >= 0 && xp < screenWidth && yp >= 0 && yp < screenHeight) {
                    if (ooz > zbuffer[yp][xp]) {
                        zbuffer[yp][xp] = ooz;
                        const luminanceIndex = Math.floor(L * (luminanceChars.length - 1) / Math.sqrt(2));
                        output[yp][xp] = luminanceChars[luminanceIndex] || luminanceChars[0];
                    }
                }
            }
        }

        let frameString = '';
        for (let j = 0; j < screenHeight; j++) {
            for (let i = 0; i < screenWidth; i++) {
                frameString += output[j][i];
            }
            frameString += '\n';
        }

        donutElement.textContent = frameString;

        A += 0.04;
        B += 0.02;
    }

    function animateDonut() {
        renderFrame();
        animationId = requestAnimationFrame(animateDonut);
    }

    animateDonut();
});