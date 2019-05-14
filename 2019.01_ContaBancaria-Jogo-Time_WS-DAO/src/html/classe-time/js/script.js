$(window).ready(function(){
  setTimeout(function(){
    
    $(".animate").fadeIn(1000);
    $(".banners").each(function(){
      $(this).animate({opacity:1},500);
    });
  },100);

  $(".tab").on("click", function(){
    var tabnumber = $(this).data("tab");

    $(".tab").each(function(){
      if($(this).data("tab") == tabnumber){
        $(this).addClass("active");
      }
      else{
        $(this).removeClass("active");
      }
    });
    $(".content").each(function(){
      if($(this).data("tab") == tabnumber){
        $(this).addClass("show");
      }
      else{
        $(this).removeClass("show");
      }
    });
  });
});
