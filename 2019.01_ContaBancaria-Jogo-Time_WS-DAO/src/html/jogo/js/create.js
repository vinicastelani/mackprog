$(window).ready(function(){

  var txtNomeMandante = $("#txtMandanteCreate");
  var txtNomeVisitante = $("#txtVisitanteCreate");
  var txtGolsMandante = $("#txtGolsMandanteCreate");
  var txtGolsVisitante = $("#txtGolsVisitanteCreate");
  var submit = $("#submitCreate");

  $(submit).on("click",function(){
    const URL = `/api/jogo`;
    const dadosJogo = {
      'nomeTimeA': txtNomeMandante.val(),
      'nomeTimeB': txtNomeVisitante.val(),
      'golsTimeA': txtGolsMandante.val(),
      'golsTimeB': txtGolsVisitante.val()
    };
    const postRequest = {
      method: 'POST',
      body: JSON.stringify(dadosJogo),
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

  function mostrarMensagem(jogoCadastrado) {
      txtNomeMandante.val("");
      txtNomeVisitante.val("");
      txtGolsMandante.val("");
      txtGolsVisitante.val("");

      if(jogoCadastrado.code != 500){
          successMessage(`Partida criada com o ID:${jogoCadastrado.id}`);
      } else {
          failMessage(`Falha na criação da partida, por favor, insira dados válidos`);
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
