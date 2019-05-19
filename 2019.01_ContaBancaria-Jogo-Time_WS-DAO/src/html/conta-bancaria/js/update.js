$(window).ready(function(){
    const txtNomeTitular = $('#txtNomeTitularUpdate');
    const txtAgencia = $('#txtAgenciaUpdate');
    const txtSaldo = $('#txtSaldoUpdate');
    const txtID = $('#txtIdUpdate');

    const botaoSelecionar = $('#selecionarConta');
    const botaoAtualizar = $('#submitAtualizar');

    $(botaoAtualizar).on("click",function(){
        if (txtID.val() == '') return;
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
        fetch(URL, putRequest).then(response => resetar());
        } catch (e) {
        corpoTabela.innerHTML = e;
        }
    });

    $(botaoSelecionar).on("click",function(){
        if (txtID.val() == '') return;
        const ID = txtID.val();
        const URL = `/api/conta-bancaria/${ID}`;
        try {
            fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherCampos(jsonResponse));
        } catch (e) {
            console.log(e);
        }
    });

    function preencherCampos(conta){
        console.log(conta[0]);
        txtID.val(conta.id);
        txtNomeTitular.val(conta.nomeTitular);
        txtAgencia.val(conta.numeroAgencia);
        txtSaldo.val(conta.saldo);;
    }

    function resetar(){
        alert("Conta atualizada com sucesso!");
        txtID.val("");
        txtNomeTitular.val("");
        txtSaldo.val("");
        txtAgencia.val("");
    }

});