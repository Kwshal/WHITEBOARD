let canvas = document.getElementById('whiteboard');
let ctx = canvas.getContext('2d');
let drawing = false;
ctx.lineWidth = 10;

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

let icons = [...document.getElementsByClassName('page-type-icon')];

icons.forEach(icon => {
     icon.addEventListener('click', () => {
          icons.forEach(i => i.classList.remove('selected'));
          icon.classList.add('selected');
     });
});

let button1 = document.getElementById('live');
let button2 = document.getElementById('mobile');
let button3 = document.getElementById('desktop');


