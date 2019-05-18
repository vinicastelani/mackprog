$(window).ready(function(){
  var value1 = $("#value-1");
  var value2 = $("#value-2");
  var value3 = $("#value-3");
  var submit = $("#submit");

  $(submit).on("click",function(){
    console.log("Nome:" + value1.val() + " Saldo:" + parseInt(value2.val()) + " Agencia:" + value3.val());
  });
});
