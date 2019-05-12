$(window).ready(function() {
  setTimeout(function(){
    $(".animate").fadeIn(1000);
    $(".banners").each(function(){
      $(this).animate({opacity:1},500);
    });
  },100);
});
