const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 10;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let drawing = false;

const icons = [...document.getElementsByClassName('page-type-icon')];
icons.forEach(icon => {
     icon.addEventListener('click', () => {
          icons.forEach(i => i.classList.remove('selected'));
          icon.classList.add('selected');
     });
});

function setLineWidth(width) {
     ctx.lineWidth = width;
}

