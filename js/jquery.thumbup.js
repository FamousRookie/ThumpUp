(function($) {
	function HopeThumbTips() {
		this.regional = [];
		this.regional[''] = {};
		this._defaults = {
			showStr: "+1",
			startSize: "12px",
			endSize: "30px",
			interval: 600,
			color: "red",
			onAnimate: function() {
				var that = this;
				if(!that.hasClass('hope-thump-tips-animation')) {
					this.addClass('hope-thump-tips-animation').on('webkitAnimationEnd', function() {
						that.removeClass('hope-thump-tips-animation');
					});
				}
			},
			onRemote: function() {},
			callback: function() {}
		};
		$.extend(this._defaults, this.regional['']);
	};

	$.extend(HopeThumbTips.prototype, {
		markerClassName: 'hope-thump-tips',
		propertyName: 'hopeThumbTips',
		//初始化函数
		setDefaults: function(options) {
			$.extend(this._defaults, options || {});
			return this;
		},
		_attachPlugin: function(target, options) {
			target = $(target);
			if(target.hasClass(this.markerClassName)) {
				return;
			}
			var inst = {
				options: $.extend(this._defaults, options || {})
			};
			target.addClass(this.markerClassName)
				.data(this.propertyName, inst)
				.on('click', function(e) {
					var showStr = (typeof inst.options.showStr == 'string' ? inst.options.showStr : inst.options.showStr.apply($(this)));
					var showColor = (typeof inst.options.color == 'string' ? inst.options.color : inst.options.color.apply($(this)));
					$("body").append("<span class='num'>" + showStr + "</span>");
					var box = $(".num");
					var left = $(this).offset().left + $(this).width() / 2;
					var top = $(this).offset().top - $(this).height();
					box.css({
						"position": "absolute",
						"left": left + "px",
						"top": top + "px",
						"z-index": 9999,
						"font-size": inst.options.startSize,
						"line-height": inst.options.endSize,
						"color": showColor
					});
					box.animate({
						"font-size": inst.options.endSize,
						"opacity": "0",
						"top": top - parseInt(inst.options.endSize) + "px"
					}, options.interval, function() {
						box.remove();
						inst.options.callback();
					});
					//执行动画
					inst.options.onAnimate.apply($(this), arguments);
					//执行ajax
					inst.options.onRemote.apply($(this), arguments);
				});
		}

	});

	$.fn.hopeThumbTips = function(options) {
		return this.each(function() {
			if(typeof options == 'string') {
				throw '未知参数.' + options;
			} else {
				var plugin = new HopeThumbTips();
				plugin._attachPlugin(this, options || {});
			}
		});
	};
	// var plugin = $.hopeThumbTips = new HopeThumbTips();
})($);