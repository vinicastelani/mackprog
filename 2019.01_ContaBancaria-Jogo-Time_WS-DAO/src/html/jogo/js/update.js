$(window).ready(function(){
    const txtNomeTitular = $('#txtNomeTitularUpdate');
    const txtAgencia = $('#txtAgenciaUpdate');
    const txtSaldo = $('#txtSaldoUpdate');
    const txtID = $('#txtIdUpdate');

    const botaoSelecionar = $('#selecionarConta');
    const botaoAtualizar = $('#submitAtualizar');

    $(botaoAtualizar).on("click",function(){
        if (txtID.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = txtID.val();
        const URL = `/api/conta-bancaria/${ID}`;
        const dadosContaBancaria = {
            'id': ID,
            'nomeTitular': txtNomeTitular.val(),
            'saldo': txtSaldo.val(),
            'numeroAgencia': txtAgencia.val()
        };
        const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosContaBancaria),
        headers: {
            'Content-type': 'application/json;charset=UTF-8'
        }
        };
        try {
            fetch(URL, putRequest).then(resposta => resetar(resposta));
        } catch (e) {
            failMessage(`${e}`);
        }
    });

    $(botaoSelecionar).on("click",function(){
        if (txtID.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = txtID.val();
        const URL = `/api/conta-bancaria/${ID}`;
        try {
            fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherCampos(jsonResponse));
        } catch (e) {
            failMessage(`${e}`);
        }
    });

    function preencherCampos(conta){
        if(conta.nomeTitular == null && conta.agencia == null && conta.saldo == null){
            failMessage('Conta não encontrada, insira um ID válido');
        }
        txtID.val(conta.id);
        txtNomeTitular.val(conta.nomeTitular);
        txtAgencia.val(conta.numeroAgencia);
        txtSaldo.val(conta.saldo);;
    }

    function resetar(res){
        if(res.status == 404){
            failMessage(`Conta não encontrada, insira um ID válido`);
        } else if (res.status == 400){
            failMessage('Falha na criação de conta, por favor, insira dados válidos.')
        } else {
            successMessage('Conta atualizada!');
        }

        txtID.val("");
        txtNomeTitular.val("");
        txtSaldo.val("");
        txtAgencia.val("");
    }

    function failMessage(msg){
        $("#update-fail-msg").text(`${msg}`);
        $("#update-fail-status").removeClass("hide");
        $("#update-fail-status").animate({top:'105%',opacity:1},1000);
        setTimeout(function(){
            $("#update-fail-status").addClass("hide");
        },3000);
        setTimeout(function(){
            $("#update-fail-status").animate({top:'95%',opacity:0});
        },3000);
    }

    function successMessage(msg){
        $("#update-success-msg").text(`${msg}`);
        $("#update-success-status").removeClass("hide");
        $("#update-success-status").animate({top:'105%',opacity:1},1000);
        setTimeout(function(){
            $("#update-success-status").addClass("hide");
        },3000);
        setTimeout(function(){
            $("#update-success-status").animate({top:'95%',opacity:0});
        },3000);
    }

});
