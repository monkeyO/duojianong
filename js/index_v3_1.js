$(document).ready(function() {
	$('.module img').addClass('scale');
	$('.menu').addClass('scale');
	setTimeout(function() {
		$('.module img').removeClass('scale');
		$('.menu').removeClass('scale');
	}, 2000)

	var oP = $('.banner .inform .inform-text p');
	var oWrapper = $('.banner .inform .inform-text');
	var pLeft = oP.position.left;
	setInterval(function() {
		pLeft--;
		if(pLeft < -(oP.width() + 10)) {
			pLeft = oWrapper.width();
		}
		oP.css('left', pLeft + 'px');
	}, 30)
	/************************************************* 小球的拖动 **********************************************/
	var flag = false;
	var cur = {
		x: 0,
		y: 0
	}
	var nx, ny, dx, dy, x, y;
//	var oMoveBtn = document.getElementById("move-btn");
//	oMoveBtn.addEventListener("mousedown", function() {
//		down();
//	}, false);
//	oMoveBtn.addEventListener("touchstart", function() {
//		down();
//	}, false)
//	oMoveBtn.addEventListener("mousemove", function() {
//		move();
//	}, false);
//	oMoveBtn.addEventListener("touchmove", function() {
//		move();
//	}, false)
//	document.body.addEventListener("mouseup", function() {
//		end();
//		if(oMoveBtn.offsetLeft < 0) {
//			oMoveBtn.style.left = 0;
//		} else if(oMoveBtn.offsetLeft > $(window).width() - 50) {
//			oMoveBtn.style.left = ($(window).width() - 50) + 'px';
//		}
//		if(oMoveBtn.offsetTop < 0) {
//			oMoveBtn.style.top = 0;
//		} else if(oMoveBtn.offsetTop > $(window).height() - 100) {
//			oMoveBtn.style.top = ($(window).height() - 100) + 'px';
//		}
//	}, false);
//	
//	oMoveBtn.addEventListener("touchend", function() {
//		end();
//		if(oMoveBtn.offsetLeft < 0) {
//			oMoveBtn.style.left = 0;
//		} else if(oMoveBtn.offsetLeft > $(window).width() - 50) {
//			oMoveBtn.style.left = ($(window).width() - 50) + 'px';
//		}
//
//
//		if(oMoveBtn.offsetTop < 0) {
//			oMoveBtn.style.top = 0;
//		} else if(oMoveBtn.offsetTop > $(window).height() - 100) {
//			oMoveBtn.style.top = ($(window).height() - 100) + 'px';
//		}
//	}, false);
//
//	function down() {
//		flag = true;
//		var touch;
//		if(event.touches) {
//			touch = event.touches[0];
//		} else {
//			touch = event;
//		}
//		cur.x = touch.clientX;
//		cur.y = touch.clientY;
//		dx = oMoveBtn.offsetLeft;
//		dy = oMoveBtn.offsetTop;
//	}

//	function move() {
//		if(flag) {
//			var touch;
//			if(event.touches) {
//				touch = event.touches[0];
//			} else {
//				touch = event;
//			}
//			nx = touch.clientX - cur.x;
//			ny = touch.clientY - cur.y;
//			x = dx + nx;
//			y = dy + ny;
//			oMoveBtn.style.left = x + "px";
//			oMoveBtn.style.top = y + "px";
//			document.addEventListener("touchmove", function() {
//				event.preventDefault();
//			}, false);
//		}
//	}

//	function end() {
//		flag = false;
//	}
})