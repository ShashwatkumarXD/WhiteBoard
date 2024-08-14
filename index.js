const colorPicker =document.getElementById("font-color-picker");
const canvasColor = document.getElementById('background-color-picker');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontPicker = document.getElementById('font-size');
const retrieveButton = document.getElementById('retrieveButton');
const ctx = canvas.getContext('2d')

//take the changes from the id="font-color-picker" and then apply them on the mouse.
colorPicker.addEventListener('change',(e)=>{
  ctx.strokeStyle = e.target.value;
  ctx.fillStyle = e.target.value;
})

//move path in x-y axis
canvas.addEventListener('mousedown',(e)=>{
  isDrawing = true;
  lastX = event.offsetX;
  lastY = event.offsetY;
})

//for tracking the path of the mouse.
canvas.addEventListener('mousemove',(e)=>{
  if(isDrawing){
    ctx.beginPath();
    ctx.moveTo(lastX,lastY);
    ctx.lineTo(event.offsetX,event.offsetY);
    ctx.stroke();

    lastX = event.offsetX;
    lastY = event.offsetY;
  }
})

// when we reliese the click botton it will stop drawning.
canvas.addEventListener('mouseup',(e)=>{
  isDrawing =false;
})

// to fill color in the background.
canvasColor.addEventListener('change',(e)=>{
  ctx.fillStyle =e.target.value; // it will select/target the selected area.
  ctx.fillRect(0,0,800,500) // dimension on the canvas.
})

fontPicker.addEventListener('change',(e)=>{
  ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', ()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height)
})

saveButton.addEventListener('click',()=>{
  localStorage.setItem('canvasContents',canvas.toDataURL());

  let link =document.createElement('a');
  link.download = 'my-canvas.png';

  link.href = canvas.toDataURL();

  link.click();
})

retrieveButton.addEventListener('click',()=>{
  let savedCanvas = localStorage.getItem('canvasContents');

  if(savedCanvas){
    let img = new Image();
    img.src = savedCanvas;
    ctx.drawImage(img,0,0)
  }
})