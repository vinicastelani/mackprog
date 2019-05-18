$(window).ready(function(){

  var string = "<div class='col-3 tab-field textcolor-white'>"+
    "<p class='text-center padding-top-5 textcolor-white'><b>Value 1 Tab 3</b></p>" +
  "</div>";

  $(".get3").append(string);


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

  $(".card-action").on("click", function(){
    var dataCard= $(this).data("panel");
    $(".panel").each(function(){
      var panel = $(this);
      console.log(panel);
      if($(this).data("panel") == dataCard){
        //console.log("Card: " + dataCard + " Panel: " + $(this).data("panel"));
        $(this).addClass("display-block");
        $("#main-panel").animate({left:40, opacity:0},1000, function(){
          $(this).hide();
          $(panel).animate({top:40,opacity:1} , 1000);
          $(panel).removeClass("hide");
        });
          $(".close-icon").on("click", function(){
            $(panel).animate({top:-50,opacity:0},1000, function(){
              $("#name").show()
              $(panel).hide();
              $("#main-panel").show();
              $("#main-panel").animate({left:0,opacity:1},1000);
            });
        });


      }
    });
  })



});
