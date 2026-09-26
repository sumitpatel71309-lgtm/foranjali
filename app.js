const vib = new Audio('vib.mp3');
const bgm = new Audio('bgm.mp3');
const vibration = document.querySelector('.vibrate');
const on = document.querySelector('.on');
const btn = document.querySelector('.bt');
const main = document.querySelector('.main');
let source = document.querySelector('.picture');
let current = 0;
const image=[
    "anjalioff.png",
    "anjalion.png",
];
function interact(tag1 , tag2){
tag1.replaceWith(tag2);
}
document.addEventListener('DOMContentLoaded',()=>{
    interact(main,on);
    setInterval(()=>{
        current = (current + 1)%image.length;
        source.src = image[current];
    },500);
});

btn.addEventListener('click',()=>{
    interact(on,main);
    bgm.loop=true;
    bgm.play();
});

vibration.addEventListener('pointerdown',()=>{
    setInterval(()=>{if(navigator.vibrate)
        navigator.vibrate(900)},300);
    bgm.pause();
    vib.loop = true;
    vib.play();
    vibration.classList.add('active');
    setTimeout( ()=>{
        vibration.classList.remove('active');
        vibration.classList.add('deactive');
    },500);
})