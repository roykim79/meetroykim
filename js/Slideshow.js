// create Slideshow function
function Slideshow( container, nav, mapContainer) {
  this.container = container;
  this.nav = nav;
  this.mapContainer = mapContainer;

  this.slides = this.container.find("li");
  this.slidesLen = this.slides.length;

  this.current = 0;

  this.log = function(){
    console.log(this.container);
  };
}

// prototype setCurrent function
Slideshow.prototype.setCurrent = function( dir ){
  var curSlide = this.current;
  
  // add 1 to current slide if dir==='next' else add -1
  curSlide += ( ~~( dir === "next" ) || -1 );
  // if slideshow is at the first slide, prev will go to last slide
  // if slideshow is at last slide, next will go to first slide
  this.current = ( curSlide < 0 ) ? this.slidesLen - 1 : curSlide % this.slidesLen;
};

// prototype showCurrent function
Slideshow.prototype.showCurrent = function( slideNum ){
  this.slides.eq( this.current )
    .fadeIn(500)
      .siblings()
      .fadeOut(500);
};

Slideshow.prototype.fillMap = function(){
  for (var i = 0; i < this.slidesLen; i++) {
    $("<div>", {
      class: "dot"
    }).data("index", i).appendTo(this.mapContainer);
  }
};

Slideshow.prototype.positionMap = function( ){
  this.mapContainer.css("margin-left", (( this.container.outerWidth() - this.mapContainer.outerWidth() ) / 2) + "px");
};

Slideshow.prototype.mapCurrent = function(){
  var dots = this.mapContainer.find(".dot");

  dots.eq(this.current)
    .addClass("selected")
      .siblings().removeClass("selected");
};