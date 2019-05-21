$(window).ready(function(){

  var txtNomeTitular = $("#txtNomeTitularCreate");
  var txtAgencia = $("#txtAgenciaCreate");
  var txtSaldo = $("#txtSaldoCreate");
  var submit = $("#submitCreate");

  $(submit).on("click",function(){
    const URL = `/api/conta-bancaria`;
    const dadosContaBancaria = {
      'nomeTitular': txtNomeTitular.val(),
      'saldo': txtSaldo.val(),
      'numeroAgencia': txtAgencia.val()
    };
    const postRequest = {
      method: 'POST',
      body: JSON.stringify(dadosContaBancaria),
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

  function mostrarMensagem(contaCadastrada) {
      txtNomeTitular.val("");
      txtSaldo.val("");
      txtAgencia.val("");

      if(contaCadastrada.code != 500){
          successMessage(`Conta criada com o ID:${contaCadastrada.id}`);
      } else {
          failMessage(`Falha na criação de conta, por favor, insira dados válidos`);
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
