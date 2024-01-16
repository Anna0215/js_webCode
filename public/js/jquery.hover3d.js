

(function ($) {

	$.fn.hover3d = function (options) {

		var settings = $.extend({
			selector: null,
			sensitivity: 30,
			invert: false,
			shine: false,
			hoverInClass: "hover-in",
			hoverOutClass: "hover-out"
		}, options);

		return this.each(function () {

			var $this = $(this),
				$card = $this.find(settings.selector);

			if (settings.shine) {
				$card.append('<div class="shine"></div>');
			}
			var $shine = $(this).find(".shine");

			$shine.css({
				position: "absolute",
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				"z-index": 9
			});

			// Mouse Enter function, this will add hover-in
			// Class so when mouse over it will add transition
			// based on hover-in class
			function enter() {
				$card.addClass(settings.hoverInClass);

				setTimeout(function () {
					$card.removeClass(settings.hoverInClass);
				}, 1000);
			}

			// Mouse movement Parallax effect
			function move(event) {
				var w = $this.innerWidth(),
					h = $this.innerHeight(),
					ax = settings.invert ? (w / 2 - event.offsetX) / settings.sensitivity : -(w / 2 - event.offsetX) / settings.sensitivity,
					ay = settings.invert ? -(h / 2 - event.offsetY) / settings.sensitivity : (h / 2 - event.offsetY) / settings.sensitivity;
				dy = event.offsetY - h / 2,
					dx = event.offsetX - w / 2,
					theta = Math.atan2(dy, dx),
					angle = theta * 180 / Math.PI - 90;

				if (angle < 0) {
					angle = angle + 360;
				}

				$card.css({
					left:ax/2.5+'px',
					top: ay/2.5+'px'
				});
			}

			// Mouse leave function, will set the transform
			// property to 0, and add transition class
			// for exit animation
			function leave() {
				$card.addClass(settings.hoverOutClass);
				$card.css({
					left:0,
					top:0
				});
				setTimeout(function () {
					$card.removeClass(settings.hoverOutClass);
				}, 1000);
			}

			// Mouseenter event binding
			$this.on("mouseenter", function () {
				return enter();
			});

			// Mousemove event binding
			$this.on("mousemove", function (event) {
				return move(event);
			});

			// Mouseleave event binding
			$this.on("mouseleave", function () {
				return leave();
			});

		});

	};

}(jQuery));