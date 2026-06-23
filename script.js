const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 1;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let drawing = false;

function setLineWidth(width) {
     ctx.lineWidth = width;
}

canvas.addEventListener('pointerdown', (e) => {
     drawing = true;
     ctx.beginPath();
     ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('pointermove', (e) => {
     if (!drawing) return;
     ctx.lineTo(e.offsetX, e.offsetY);
     ctx.stroke();
});

canvas.addEventListener('pointerup', () => {
     drawing = false;
});


function resizeCanvas() {
    // 1. Take a "snapshot" of what is currently drawn on the canvas
    // (Only do this if the canvas already has a width/height initialized)
    let tempImage;
    if (canvas.width > 0 && canvas.height > 0) {
        tempImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    // 2. Get the new physical dimensions
    const rect = canvas.getBoundingClientRect();
    
    // 3. Resize the canvas (This natively clears the screen)
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // 4. Re-configure your drawing tools (Since resizing resets them too!)
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'black';

    // 5. Paste your snapshot back onto the freshly resized canvas
    if (tempImage) {
        ctx.putImageData(tempImage, 0, 0);
    }
}

// Keep your existing event listeners
resizeCanvas();
//3. (Optional but highly recommended) Keep it crisp if the window resizes or phone rotates
window.addEventListener('resize', resizeCanvas);

let colorEl = document.getElementById('color-input');
colorEl.addEventListener('change', (e) => {
     ctx.strokeStyle = e.target.value;
});

let clearBtn = document.getElementById('clear-btn');
clearBtn.addEventListener('click', () => {
     ctx.clearRect(0, 0, canvas.width, canvas.height);
});