$(window).ready(function(){

  var nome = $("#cNome");
  var data = $("#cData");
  var cidade = $("#cCidade");
  var estado = $("#cEstado");

  $(cSubmit).on("click",function(){
    const URL = `/api/time`;
    const dadosTime = {
      'nome': nome.val(),
      'anoFundacao': data.val(),
      'cidade': cidade.val(),
      'estado': estado.val()
    };
    const postRequest = {
      method: 'POST',
      body: JSON.stringify(dadosTime),
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      }
    };
    try {
      fetch(URL, postRequest).then(resposta => resposta.json()).then(jsonResponse => mostrarMensagem(jsonResponse));
    } catch (e) {
      failMessage(`${e}`);
    }
  });

  function mostrarMensagem(timeCadastrado) {
      nome.val("");
      data.val("");
      cidade.val("");
      estado.val("");

      if(timeCadastrado.code != 500){
          successMessage(`Conta criada com o ID:${timeCadastrado.id}`);
      } else {
          failMessage(`Falha na criação do time, por favor, insira dados válidos`);
      }

  }

  function failMessage(msg){
      $("#insert-fail-msg").text(`${msg}`);
      $("#insert-fail-status").removeClass("hide");
      $("#insert-fail-status").animate({top:'105%',opacity:1},1000);
      setTimeout(function(){
          $("#insert-fail-status").addClass("hide");
      },3000);
      setTimeout(function(){
          $("#insert-fail-status").animate({top:'95%',opacity:0});
    },3000);
  }

  function successMessage(msg){
      $("#insert-success-msg").text(`${msg}`)
          $("#insert-success-status").removeClass("hide");
          $("#insert-success-status").animate({top:'105%',opacity:1},1000);
          setTimeout(function(){
            $("#insert-success-status").addClass("hide");
          },3000);
          setTimeout(function(){
            $("#insert-success-status").animate({top:'95%',opacity:0});
    },3000);
  }
});
