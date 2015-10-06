(function($){


// ********************************************************************************
// Layout
// ********************************************************************************


setHeight( $('.set-height') );
// elements with a class of set-height will have a total height of the height 
// of the window's multiplied why the value of its data-height attribute





// ********************************************************************************
// Hero
// ********************************************************************************

var $hero = $('#hero'),
	scrollPos = window.scrollY,
	heroEffects = new HeroEffects($hero);

heroEffects.set();
heroEffects.fadeDownArrow(scrollPos);

// ******************** On scroll event ********************
window.addEventListener('scroll', function(){
    var scrollPos = this.scrollY;

    heroEffects.updateOpacity(scrollPos);
    heroEffects.updatePosition(scrollPos);
    heroEffects.fadeDownArrow(scrollPos);
});

// ******************** On resize event ********************
window.addEventListener('resize', function(){
    heroEffects.set();
    setHeight( $('.set-height') );
    // aboutEffects.set();
});


// ********************************************************************************
// Fade In
// ********************************************************************************

var $triggerFade = $('.trigger-fade'),
	fadeInEls = new FadeIn( $triggerFade );

fadeInEls.init();
// fadeInEls.listen(scrollPos);

// ******************** On scroll event ********************
window.addEventListener('scroll', function(){
    var scrollPos = this.scrollY;

    fadeInEls.listen(scrollPos);
});



})(jQuery);




























