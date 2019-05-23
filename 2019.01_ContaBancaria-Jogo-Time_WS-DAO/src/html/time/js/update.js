$(window).ready(function(){
  const txtNome = $("#txtNomeUpdate");
  const txtData = $("#txtDataUpdate");
  const txtCidade = $("#txtCidadeUpdate");
  const txtEstado = $("#txtEstadoUpdate");
  const txtID = $('#txtIdUpdate');

    const botaoSelecionar = $('#selecionarConta');
    const botaoAtualizar = $('#submitAtualizar');

    $(botaoAtualizar).on("click",function(){
        if (txtID.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = txtID.val();
        const URL = `/api/time/${ID}`;
        const dadosTime = {
            'id': ID,
            'nome': txtNome.val(),
            'ano_fundacao': txtData.val(),
            'cidade': txtCidade.val(),
            'estado': txtEstado.val()
        };
        const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosTime),
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
        const URL = `/api/time/${ID}`;
        try {
            fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherCampos(jsonResponse));
        } catch (e) {
            failMessage(`${e}`);
        }
    });

    function preencherCampos(time){
        if(time.nome == null && time.data == null && time.cidade == null && time.estado == null){
            failMessage('Conta não encontrada, insira um ID válido');
        }
        txtID.val(time.id);
        txtNome.val(time.nome);
        txtData.val(time.ano_fundacao);;
        txtCidade.val(time.cidade);
        txtEstado.val(time.estado);
    }

    function resetar(res){
        if(res.status == 404){
            failMessage(`Clube não encontrado, insira um ID válido`);
        } else if (res.status == 400){
            failMessage('Falha na criação de Clube, por favor, insira dados válidos.')
        } else {
            successMessage('Clube atualizado!');
        }

        txtID.val("");
        txtNome.val("");
        txtData.val("");
        txtCidade.val("");
        txtEstado.val("");
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
