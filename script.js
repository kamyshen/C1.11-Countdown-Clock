let pause_switch = 0;
let is_on = 0;
const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');
const pause = document.querySelector('.pause');
const resume = document.querySelector('.resume');

function Button(element, fn) {
	this.element = element;
	this.element.addEventListener('click', fn)
}

const plus_fn = _ => {
	if (countSec == 59 && countMin == 59) {
		console.log("У нас 59:59...");
		return;
	}
	countSec < 59 ? countSec++ : (countSec = 0, countMin++);
	updateText();
}

const minus_fn = _ => {
	if (countSec == 0 && countMin == 0) {
		return;
	}
	countSec > 0 ? countSec-- : (countSec = 59, countMin--);
	updateText();
}
const start_fn = _ => {
	if (is_on) return;
	if (pause_switch == 0) (is_on = 1, countDown());
}

const pause_fn = _ => pause_switch = 1;
const resume_fn = _ => pause_switch = 0;

plus_btn = Button(plus, plus_fn);
minus_btn = Button(minus, minus_fn);
start_btn = Button(start, start_fn);
pause_btn = Button(pause, pause_fn);
resume_btn = Button(resume, resume_fn);

let countSec = 0;
let countMin = 0;

const updateText = () =>{
    minutes.innerHTML = (0 + String(countMin)).slice(-2);
    seconds.innerHTML = (0 + String(countSec)).slice(-2);
}

const countDown = () => {	
	let total = countSec + countMin * 60;
    const timeinterval = setTimeout(countDown, 1000);
    if (pause_switch == 1) {
	message.innerHTML = '<p>I am paused.</p>';
	return;
    }
    message.innerHTML = '<p>The clock is ticking...</p>'

    if (total <= 1) {
	clearInterval(timeinterval);
	is_on = 0;
    message.innerHTML = "<p>Time's up</p>"
  }
  if(countSec > 0) countSec--;
  else{
  	countSec = 59;
    countMin--;
  } 
  updateText();
}

window.onload = updateText();

