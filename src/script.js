var scrollLinks = document.getElementsByClassName('scroll')
function toggleNav () {
	'use strict';
	var btn = document.getElementById('slide-nav-btn');
	var slideNav = document.getElementById('slide-nav');
	var slideNavActive = "slide-nav-active";

	btn.addEventListener('click', function () {
		btn.classList.toggle('slide-nav-btn-active');
		slideNav.classList.toggle(slideNavActive);
	});
}

function hreflinks() {
	button.addEventListener,('click', function(e){
		e.preventDefault;
		this.hash;
		var element = document.getElementById('this.hash')
		element.scrollIntoView({
			behavior: 'smooth'
		});
		/**
		setTimeout(function(){
		window.location.hash = id;
		}, 500);
		 */
	})
}

function changeHash(input){
	var next = document.getElementById('section'+input);
	var id = 'section'+input  
	next.scrollIntoView({
		behavior: 'smooth'
	});
	setTimeout(function(){
		window.location.hash = id;
	}, 500);
	
}

function getCurrentUrl(){
	var getUrl = window.location.href;
	var splitUrl = getUrl.split('index.html#section')
	var urlNumber = splitUrl[1]
	if(urlNumber === undefined){
		urlNumber = 1
	}
	return urlNumber;
}

function eventlistener(){
	window.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		var sectionNumber = getCurrentUrl();
		switch (event.key) {
			case "Down": // IE specific value
			case "ArrowDown":
				changeHash(1 + +sectionNumber)
			break;

			case "Up": // IE specific value
			case "ArrowUp":
				if(sectionNumber === '1'){
					return;
				}else{
				changeHash(+sectionNumber - 1);
				}
			break;

			default:
				return; // Quit when this doesn't handle the key event.
		}
	
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}, true);
}

function changeHashScroll(direction){
	var sectionNumber = getCurrentUrl();
		console.log(sectionNumber)
		if (direction === "down"){
			var number = 1 + +sectionNumber;
			setTimeout(function(){
				window.location.hash = 'section' + number;
			}, 1500);
		}
		else{
			if(sectionNumber === '1'){
				return;
			}else{
				var number = +sectionNumber - 1;
				setTimeout(function(){
					window.location.hash = 'section' + number;
				}, 1500);
			}
		}
}
/*
function showAnimate(arrivePoint) {
	var flags = true;
	var timer = setInterval(function() {
		var icur = window.pageYOffset;
		//Buffer movement, speed change at any time
		var speed = (arrivePoint - icur) / 12;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);//Take integer speed
		if (icur || icur == 0) {
			window.scrollTo(0, icur + speed);
		}
		if (arrivePoint !== icur) {
			flags = false;
		} else {
			flags = true;
		}

		if (flags) {
			clearInterval(timer);
			isComplete = true;
		}
	},25);
}

function wheel (e){

	if(isComplete == true){ //Prevent multiple repeat function

		isComplete = false;

		if (e.wheelDelta) {  //IE,Chrome MouseScroll
			stopScroll();
			if (e.wheelDelta > 0) { //When the pulley rolls up
				var arrivePoint = window.pageYOffset - window.innerHeight;
				//arrivePoint cannot be negative
				arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
				showAnimate(arrivePoint);
				changeHashScroll()
				}

				if (e.wheelDelta < 0) { //When the pulley rolls down
					var arrivePoint = window.pageYOffset + window.innerHeight;
					//maximum rolling point
					var maxBottom = document.body.offsetHeight - window.innerHeight;
					//If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
					arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
					showAnimate(arrivePoint);
					changeHashScroll("down")
				}
			}
			else if (e.detail) {  //Firefox MouseScroll
			if (e.detail< 0) { //When the pulley rolls up
				var arrivePoint = document.documentElement.scrollTop - window.innerHeight;
				//arrivePoint cannot be negative
				arrivePoint = arrivePoint < 0 ? 0 :arrivePoint;
				showAnimate(arrivePoint);
				changeHashScroll()
			}
			if (e.detail> 0) { //When the pulley rolls down
				var arrivePoint = document.documentElement.scrollTop + window.innerHeight;
				var maxBottom = document.body.offsetHeight - window.innerHeight;
				//If arrivePoint exceeds the maximum rolling point, then arrivePoint equals the maximum rolling point
				arrivePoint = arrivePoint > maxBottom ? maxBottom : arrivePoint;
				showAnimate(arrivePoint);
				changeHashScroll("down")
			}
		}
	}
}

//Bubble prevention
function stopScroll() {
	var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

	function preventDefault(e) {
		e = e || window.event;
		if (e.preventDefault)
			e.preventDefault();
		e.returnValue = false;
	}

	function preventDefaultForScrollKeys(e) {
		if (keys[e.keyCode]) {
			preventDefault(e);
			return false;
		}
	}
	var oldonwheel, oldonmousewheel1, oldonmousewheel2, oldontouchmove, oldonkeydown
			, isDisabled;
	(function disableScroll() {
		if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
		oldonwheel = window.onwheel;
		window.onwheel = preventDefault; // modern standard

		oldonmousewheel1 = window.onmousewheel;
		window.onmousewheel = preventDefault; // older browsers, IE
		oldonmousewheel2 = document.onmousewheel;
		document.onmousewheel = preventDefault; // older browsers, IE

		oldontouchmove = window.ontouchmove;
		window.ontouchmove = preventDefault; // mobile

		oldonkeydown = document.onkeydown;
		document.onkeydown = preventDefaultForScrollKeys;
		isDisabled = true;
	})();
}

var isComplete = true;

document.addEventListener('DOMMouseScroll', wheel, false); //firefox
document.addEventListener('mousewheel', wheel, false); //chrome, IE
*/
toggleNav();
eventlistener()

function mobileVhFix(){
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	document.getElementById('section1').style['min-height'] = height + 'px';
	document.querySelector('.slide-nav').style['min-height'] = height + 'px';
	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	window.addEventListener('resize', function(event){
		var width2 = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		if(width != width2){
			setTimeout(function(){
				height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				document.getElementById('section1').style['min-height'] = height + 'px';
				document.querySelector('.slide-nav').style['min-height'] = height + 'px';
				width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			}, 500);
		}
	});
}
mobileVhFix();
/*

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
var vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', vh+'px');
// We listen to the resize event
window.addEventListener('resize', function () {
	// We execute the same script as before
	var vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', vh+'px');
});

const appHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()
*/