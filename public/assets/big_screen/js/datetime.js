'use strict';

setInterval(function () {
	var date = new Date();
	var y = date.getFullYear();
	var MM = date.getMonth() + 1;
	MM = MM < 10 ? '0' + MM : MM;
	var d = date.getDate();
	d = d < 10 ? '0' + d : d;
	var h = date.getHours();
	h = h < 10 ? '0' + h : h;
	var m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	var s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	var updateTime = h + ':' + m + ':' + s;
	document.getElementById('now-time').innerHTML = updateTime;
	document.getElementById('now-year').innerHTML = y + '-' + MM + '-' + d;
	var days = date.getDay();
	switch (days) {
		case 1:
			days = '星期一';
			break;
		case 2:
			days = '星期二';
			break;
		case 3:
			days = '星期三';
			break;
		case 4:
			days = '星期四';
			break;
		case 5:
			days = '星期五';
			break;
		case 6:
			days = '星期六';
			break;
		case 0:
			days = '星期日';
			break;
	}

	document.getElementById('now-week').innerHTML = days;
}, 1000);

/* setInterval(() => {
	let date = new Date();
	let y = date.getFullYear();
	let MM = date.getMonth() + 1;
	MM = MM < 10 ? ('0' + MM) : MM;
	let d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	let h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	let m = date.getMinutes();
	m = m < 10 ? ('0' + m) : m;
	let s = date.getSeconds();
	s = s < 10 ? ('0' + s) : s;
	let updateTime = h + ':' + m + ':' + s;
	document.getElementById('now-time').innerHTML = updateTime;
	document.getElementById('now-year').innerHTML = y + '-' + MM + '-' + d;
	var days = date.getDay();
	switch (days) {
		case 1:
			days = '星期一';
			break;
		case 2:
			days = '星期二';
			break;
		case 3:
			days = '星期三';
			break;
		case 4:
			days = '星期四';
			break;
		case 5:
			days = '星期五';
			break;
		case 6:
			days = '星期六';
			break;
		case 0:
			days = '星期日';
			break
	}

	document.getElementById('now-week').innerHTML = days;

}, 1000);
 */