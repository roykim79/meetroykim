// ********************************************************************************
// SlideShow
// ********************************************************************************

var container = $(".slideshow").addClass("js"), // add js class to slideshow
	number = $(".title").show(), // show slide number
	mapContainer = $(".dots")
	slideshow = new Slideshow( container, $(".nav-wrap"), mapContainer ); // new slideshow

// start slideshow
slideshow.showCurrent(); // show first slide when page loads
slideshow.log();
slideshow.fillMap();
slideshow.positionMap();
slideshow.mapCurrent();

// add click even handler to prev and next anchors
slideshow.nav.show().find("a").on("click", function(){
	slideshow.setCurrent( $(this).attr("class") );
	slideshow.showCurrent();
	slideshow.mapCurrent();

  	return false;
});

// reposition dot container when window is resized
$( window ).resize(function() {
	slideshow.positionMap();
});

