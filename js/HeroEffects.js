function HeroEffects(container){
	this.container = container;

	this.el = this.container.find( $('.content') );
	this.downArrow = this.container.find( $('.down') );

	this.scrollLength = this.container[0].clientHeight;
	this.elHeight = this.el[0].clientHeight;
	this.topPadding = null;
	this.bottomPadding = null;

	this.log = function(){
		console.log(this.container);
		console.log(this.elHeight);
		console.log(this.scrollLength);
	};
	this.set = function(){
		var totalHeight = this.scrollLength,
			totalPadding = (totalHeight - this.elHeight),
			topPadding = totalPadding * .35,
			bottomPadding = totalPadding * .65;

		if (this.downArrow.length > 0) {
			// topPadding = topPadding - this.downArrow[0].clientHeight;
		}

		this.scrollLength = this.container[0].clientHeight;
		this.bottomPadding = bottomPadding;
		this.topPadding = topPadding;

	};
	this.updateOpacity = function(scrollPos){
		var opacity = 1 - ( scrollPos / (this.scrollLength - this.elHeight) );
		
		this.el.css('opacity', opacity);
	};
	this.updatePosition = function(scrollPos){
		var velocity = this.bottomPadding / (this.scrollLength - this.elHeight),
			position = scrollPos * velocity;

		this.el.css('transform', 'translateY(' + position + 'px)');

	};
	this.fadeDownArrow = function(scrollPos){
		var fadeOutPosition = this.scrollLength * .2,
			opacity = 1 - (scrollPos/fadeOutPosition);

		this.downArrow.css('opacity', opacity);
	};
}


// **********************************************************************************
// Set Height
// **********************************************************************************

var setHeight = function(els){
	els.each(function(){
		var $this = $(this),
			$content = $this.find('.content'),
			contentHeight = $content[0].clientHeight,
			percent = $this.data('height'),
			winHeight = window.innerHeight,
			winWidth = window.innerWidth,
			ratio = winWidth / winHeight, 
			totalHeight = winHeight * percent,
			totalPadding = totalHeight - contentHeight,
			paddingTop = totalPadding * $this.data('padding-top'),
			paddingBottom = totalPadding - paddingTop;

		console.log(totalHeight);
		if (ratio < 1.25 ) {
			var multiplier = 1 - (1.25 - ratio);

			totalHeight = totalHeight * multiplier;
			totalPadding = totalHeight - contentHeight;
			paddingTop = totalPadding * $this.data('padding-top');
			paddingBottom = totalPadding - paddingTop;
			console.log(totalHeight);
			console.log(paddingBottom);
		};

		$this.css({
			'padding-top': paddingTop,
			'padding-bottom': paddingBottom
		});
	});

};



// **********************************************************************************
// Fade In
// **********************************************************************************


function FadeIn(cont){
	this.cont = cont;
	this.els = this.cont.find('.clear-fade');

	this.init = function(){
		this.els.addClass('invisible');
	};

	this.isVisible = function(el, scrollPos){
		var winHeight = window.innerHeight,
			top = el[0].offsetTop,
			height = el[0].clientHeight,
			triggerPos = top + height - winHeight;

		if ( scrollPos > triggerPos ) {
			return true;
		}
	};

	this.show = function(cont){
		var els = cont.find('.clear-fade');

		els.each(function(){
			var $this = $(this),
				delay = $this.data('fade-delay'),
				animation = $this.data('animation');

			setTimeout(function(){
				$this.removeClass('invisible').addClass(animation);
			}, delay);

		});
	};

	this.listen = function(scrollPos){
		var that = this;

		this.cont.each(function(){
			var $this = $(this);

			if ( that.isVisible( $this, scrollPos ) ) {
				that.show( $this );
			}
		});
	};
}





function closestEdge(x,y,w,h) {
    var topEdgeDist = distMetric(x,y,w/2,0);
    var bottomEdgeDist = distMetric(x,y,w/2,h);
    var leftEdgeDist = distMetric(x,y,0,h/2);
    var rightEdgeDist = distMetric(x,y,w,h/2);
    var min = Math.min(topEdgeDist,bottomEdgeDist,leftEdgeDist,rightEdgeDist);

    switch (min) {
        case leftEdgeDist:
            return "Left";
        case rightEdgeDist:
            return "Right";
        case topEdgeDist:
            return "Top";
        case bottomEdgeDist:
            return "Bottom";
    }
}
function distMetric(x,y,x2,y2) {
    var xDiff = x - x2;
    var yDiff = y - y2;
    return (xDiff * xDiff) + (yDiff * yDiff);
}
function tileAnimate(el, io, edge, top){
	var child = el.find('.label-bg');
	child.css({
		'-webkit-animation-name': io + edge,
       	'-moz-animation-name': io + edge,
       	'-ms-animation-name': io + edge,
        'animation-name': io + edge
	});

	if ( io == 'out' ) {
		setTimeout(function(){
			child.css('top', '100vh');
		}, 180);
	} else {
		child.css('top', 0);
	}
}
$(function() {

	$(".description").hover(function(e) {
        var el_pos = $(this).offset();
        var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
        tileAnimate( $(this), 'in', edge, '0' );
    }, function(e) {
        var el_pos = $(this).offset();
        var edge = closestEdge(e.pageX - el_pos.left, e.pageY - el_pos.top, $(this).width(), $(this).height());
        tileAnimate( $(this), 'out', edge, '-100%' );
    });

});





























