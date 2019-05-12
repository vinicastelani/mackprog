$(window).ready(function(){
  var bool = true;
  $("#submitAccount").on("click",function(){
  if(bool){
    $("#return-message").addClass("success");
    $("#return-message").html("Conta criada!");
    $("#return-message").fadeIn(1000, function(){
      setTimeout(function(){
        $("#return-message").fadeOut();
        $("#return-message").removeClass("success");
      },1000);
    });
  }else{
    $("#return-message").addClass("fail");
    $("#return-message").html("Erro na criação da conta!");
    $("#return-message").fadeIn(1000, function(){
      setTimeout(function(){
        $("#return-message").fadeOut();
        $("#return-message").removeClass("fail");
      },1000);
    });
  }
  });


});
