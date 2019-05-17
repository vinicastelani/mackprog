$(window).ready(function(){

  setTimeout(function(){
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

  $(".card-action").on("click",function(){
    var cardnumber = $(this).data("panel");
    $(".panel").each(function(){
      if($(this).data("panel") == cardnumber){
        $("#main-panel").animate({left:40,opacity:0},1000 ,function(){
          $("#name").hide();
          $("#insert-panel").show();
          $("#insert-panel").animate({top:0,opacity:1},1000);
        });
      }
    });
  });



});
