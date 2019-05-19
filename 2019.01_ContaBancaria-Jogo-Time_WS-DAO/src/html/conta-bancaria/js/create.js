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
            $("#fail-msg").text(`${e}`);
            $("#fail-status").removeClass("hide");
            $("#fail-status").animate({top:'105%',opacity:1},1000);
        }
    });

    async function mostrarMensagem(contaCadastrada) {
        txtNomeTitular.val("");
        txtSaldo.val("");
        txtAgencia.val("");
        
        if(contaCadastrada.code != 500){
            $("#success-msg").text(`Account created with the ID:${contaCadastrada.id}`)
            $("#success-status").removeClass("hide");
            $("#success-status").animate({top:'105%',opacity:1},1000);
            setTimeout(function(){
              $("#success-status").addClass("hide");
            },3000);
            setTimeout(function(){
              $("#success-status").animate({top:'95%',opacity:0});
            },3000);
        } else {
            $("#fail-msg").text(`Account criation failed`);
            $("#fail-status").removeClass("hide");
            $("#fail-status").animate({top:'105%',opacity:1},1000);
            setTimeout(function(){
                $("#fail-status").addClass("hide");
            },3000);
            setTimeout(function(){
                $("#fail-status").animate({top:'95%',opacity:0});
            },3000);
        }
        
    }


});