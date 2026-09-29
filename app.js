// 1. Audio Setup & Selection
const bgm = new Audio('bgm.mp3');
const vib = new Audio('vib.mp3');
const div1 = document.querySelector('.on');
const div2 = document.querySelector('.main');
const div3 = document.querySelector('.journey');
const div4 = document.querySelector('.age-calculator');
const div5 = document.querySelector('.memory-container');

const btn1 = document.querySelector('.bt');
const clickBtn = document.querySelector('.vibrate');

let source = document.querySelector('.picture');
let current = 0;

const image = [
    "anjalioff.png",
    "anjalion.png"
];

const memory = [
    "anjali3.jpeg", "anjalii1.jpg", "anjali4.jpg", "anjalii2.jpg", 
    "anjali5.png", "anjalii3.jpg", "anjali6.png", "anjalii4.jpg", 
    "anjali7.png", "anjalii5.jpg", "anjali8.png", "anjalii6.jpg", 
    "anjali9.png", "anjalii7.jpg"
];

// Helper Function for Forcefully Displaying Elements
function showDiv(element, displayType = 'flex') {
    if (element) {
        element.style.setProperty('display', displayType, 'important');
    }
}

function hideDiv(element) {
    if (element) {
        element.style.setProperty('display', 'none', 'important');
    }
}

// Initial Stage Visibility
showDiv(div1, 'flex');
hideDiv(div2);
hideDiv(div3);
hideDiv(div4);
hideDiv(div5);

// Header Image Alternate Loop
setInterval(() => {
    if (source) {
        current = (current + 1) % image.length;
        source.src = image[current];
    }
}, 500);

// STAGE 1 -> STAGE 2
btn1.addEventListener('click', () => {
    hideDiv(div1);
    showDiv(div2, 'flex');
    
    bgm.loop = true;
    bgm.play().catch(e => console.log("Audio play error:", e));
});

// STAGE 2 -> STAGE 3 (Click Button -> Journey for 5 Seconds)
clickBtn.addEventListener('click', () => {
    hideDiv(div2);
    showDiv(div3, 'flex');
    bgm.pause();
    vib.loop =true;
    vib.play();
    // 5 Seconds baad Stage 4 (Age Calculator)
    setTimeout(() => {
        startAgeStage();
    }, 5000);
});

// Age Calculator Functionality
const dob = new Date("2009-09-30T00:00:00");
let ageTimer = null;

function calcAge() {
    let time = new Date();
    let yearss = time.getFullYear() - dob.getFullYear();
    let monthss = time.getMonth() - dob.getMonth();
    let dayss = time.getDate() - dob.getDate();

    if (dayss < 0) {
        monthss--;
        dayss += new Date(time.getFullYear(), time.getMonth(), 0).getDate();
    }
    if (monthss < 0) {
        yearss--;
        monthss += 12;
    }

    let sec = String(time.getSeconds()).padStart(2, '0');
    let da = String(dayss).padStart(2, '0');
    let min = String(time.getMinutes()).padStart(2, '0');
    let hou = String(time.getHours()).padStart(2, '0');
    let mon = String(monthss).padStart(2, '0');

    let hrEl = document.querySelector('#hours');
    let minEl = document.querySelector('#minutes');
    let secEl = document.querySelector('#seconds');
    let yrEl = document.querySelector('#years');
    let monEl = document.querySelector('#months');
    let dayEl = document.querySelector('#days');

    if (hrEl) hrEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${hou}\u00A0Hours`;
    if (minEl) minEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${min}\u00A0Minutes`;
    if (secEl) secEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${sec}\u00A0Seconds`;
    if (yrEl) yrEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${yearss}\u00A0Years`;
    if (monEl) monEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${mon}\u00A0Months`;
    if (dayEl) dayEl.innerText = `\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${da}\u00A0Days`;
}

// STAGE 4 (Age Calculator for 10 Seconds)
function startAgeStage() {
    hideDiv(div3);
    showDiv(div4, 'flex');
    
    calcAge();
    ageTimer = setInterval(calcAge, 1000);

    // 10 Seconds baad Stage 5 (Memory Slideshow)
    setTimeout(() => {
        clearInterval(ageTimer);
        startMemoryStage();
    }, 10000);
}

// STAGE 5 (Memory Slideshow Infinite)
function startMemoryStage() {
    hideDiv(div4);
    showDiv(div5, 'flex');

    let memIndex = 0;
    setInterval(() => {
        memIndex = (memIndex + 1) % memory.length;
        let mains = document.querySelector('.pics');
        if (mains) {
            mains.src = memory[memIndex];
        }
    }, 1500);
}
