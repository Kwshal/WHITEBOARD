const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let drawing = false;

function getPointerCoords(event) {
     const point = event.touches ? event.touches[0] : event;
     const rect = canvas.getBoundingClientRect();
     return {
          x: point.clientX - rect.left,
          y: point.clientY - rect.top
     };
}

function startDrawing(event) {
     if (event.cancelable) {
          event.preventDefault();
     }
     const { x, y } = getPointerCoords(event);
     drawing = true;
     ctx.beginPath();
     ctx.moveTo(x, y);
}

function draw(event) {
     if (!drawing) return;
     if (event.cancelable) {
          event.preventDefault();
     }
     const { x, y } = getPointerCoords(event);
     ctx.lineTo(x, y);
     ctx.stroke();
}

function stopDrawing() {
     drawing = false;
}

function resizeCanvas() {
     const ratio = window.devicePixelRatio || 1;
     const displayWidth = Math.min(window.innerWidth - 20, 900);
     const displayHeight = Math.round(displayWidth * 0.75);

     if (canvas.width && canvas.height) {
          const currentImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
          canvas.width = displayWidth * ratio;
          canvas.height = displayHeight * ratio;
          canvas.style.width = `${displayWidth}px`;
          canvas.style.height = `${displayHeight}px`;
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          ctx.lineWidth = 10;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          const tempCanvas = document.createElement('canvas');
          tempCanvas.width = currentImage.width;
          tempCanvas.height = currentImage.height;
          tempCanvas.getContext('2d').putImageData(currentImage, 0, 0);
          ctx.drawImage(tempCanvas, 0, 0, displayWidth, displayHeight);
     } else {
          canvas.width = displayWidth * ratio;
          canvas.height = displayHeight * ratio;
          canvas.style.width = `${displayWidth}px`;
          canvas.style.height = `${displayHeight}px`;
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
     }
}

function addDrawingListeners() {
     if (window.PointerEvent) {
          canvas.addEventListener('pointerdown', startDrawing);
          canvas.addEventListener('pointermove', draw);
          canvas.addEventListener('pointerup', stopDrawing);
          canvas.addEventListener('pointercancel', stopDrawing);
          canvas.addEventListener('pointerleave', stopDrawing);
     } else {
          canvas.addEventListener('mousedown', startDrawing);
          canvas.addEventListener('mousemove', draw);
          canvas.addEventListener('mouseup', stopDrawing);
          canvas.addEventListener('mouseleave', stopDrawing);
          canvas.addEventListener('touchstart', startDrawing, { passive: false });
          canvas.addEventListener('touchmove', draw, { passive: false });
          canvas.addEventListener('touchend', stopDrawing);
          canvas.addEventListener('touchcancel', stopDrawing);
     }
}

window.addEventListener('resize', resizeCanvas);
window.addEventListener('orientationchange', resizeCanvas);
resizeCanvas();
addDrawingListeners();

const icons = [...document.getElementsByClassName('page-type-icon')];
icons.forEach(icon => {
     icon.addEventListener('click', () => {
          icons.forEach(i => i.classList.remove('selected'));
          icon.classList.add('selected');
     });
});


