let canvas = document.getElementById('whiteboard');
let ctx = canvas.getContext('2d');
let drawing = false;


canvas.addEventListener('mousedown', (e) => {
     drawing = true;
     ctx.beginPath();
     ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mousemove', (e) => {
     if (drawing) {
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
     }
});

canvas.addEventListener('mouseup', () => {
     drawing = false;
});

canvas.addEventListener('mouseleave', () => {
     drawing = false;
});

canvas.addEventListener('touchstart', (e) => {
     drawing = true;
     ctx.beginPath();
     ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('touchmove', (e) => {
     if (drawing) {
          ctx.lineTo(e.offsetX, e.offsetY);
          ctx.stroke();
     }
});

canvas.addEventListener('touchend', () => {
     drawing = false;
});

canvas.addEventListener('touchcancel', () => {
     drawing = false;
});
