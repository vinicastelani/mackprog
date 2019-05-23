$(window).ready(function(){

  var nomeMandante = $("#cMandante");
  var nomeVisitante = $("#cVisitante");
  var golsMandante = $("#cGolsMandante");
  var golsVisitante = $("#cGolsVisitante");

  $(submit).on("click",function(){
    const URL = `/api/jogo`;
    const dadosJogo = {
      'nome_time_a': nomeMandante.val(),
      'nome_time_b': nomeVisitante.val(),
      'gols_time_a': golsMandante.val(),
      'gols_time_b': golsVisitante.val()
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

  function mostrarMensagem(dadosJogo) {
      nomeMandante.val("");
      nomeVisitante.val("");
      golsMandante.val("");
      golsVisitante.val("");

      if(contaCadastrada.code != 500){
          successMessage(`Partida criada com o ID:${dadosJogo.id}`);
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
