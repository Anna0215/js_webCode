"use strict";

/* 防抖 */
var delay = function () {
	var timer = 0;
	return function (callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
}();

/* 节流 */
var throttle = function throttle(func, delay) {
	var timer = null;
	return function () {
		var context = this;
		var args = arguments;
		if (!timer) {
			timer = setTimeout(function () {
				func.apply(context, args);
				timer = null;
			}, delay);
		}
	};
};

/* 全屏 */
var fullScreen = function fullScreen() {
	var docElm = document.documentElement;
	//W3C
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	}
	//FireFox
	else if (docElm.mozRequestFullScreen) {
			docElm.mozRequestFullScreen();
		}
		//Chrome等
		else if (docElm.webkitRequestFullScreen) {
				docElm.webkitRequestFullScreen();
			}
			//IE11
			else if (elem.msRequestFullscreen) {
					elem.msRequestFullscreen();
				}
};

// /* 防抖 */
// const delay = (function() {
	// let timer = 0
	// return function(callback, ms) {
		// clearTimeout(timer)
		// timer = setTimeout(callback, ms)
	// }
// })()

// /* 节流 */
// var throttle = function(func, delay) {
	// var timer = null;
	// return function() {
		// var context = this;
		// var args = arguments;
		// if (!timer) {
			// timer = setTimeout(function() {
				// func.apply(context, args);
				// timer = null;
			// }, delay);
		// }
	// }
// }


// /* 全屏 */
// var fullScreen = function() {
	// var docElm = document.documentElement;
	//W3C
	// if (docElm.requestFullscreen) {
		// docElm.requestFullscreen();
	// }
	//FireFox
	// else if (docElm.mozRequestFullScreen) {
		// docElm.mozRequestFullScreen();
	// }
	//Chrome等
	// else if (docElm.webkitRequestFullScreen) {
		// docElm.webkitRequestFullScreen();
	// }
	//IE11
	// else if (elem.msRequestFullscreen) {
		// elem.msRequestFullscreen();
	// }
// }