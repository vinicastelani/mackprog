$(window).ready(function(){
    const nome = $("#uNome");
    const data = $("#uData");
    const cidade = $("#uCidade");
    const estado = $("#uEstado");
    const id = $('#uID');

    const botaoSelecionar = $('#uBuscar');
    const botaoAtualizar = $('#uSubmit');

    $(botaoAtualizar).on("click",function(){
        if (id.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = id.val();
        const URL = `/api/time/${ID}`;
        const dadosTime = {
            'id': ID,
            'nome': nome.val(),
            'anoFundacao': data.val(),
            'cidade': cidade.val(),
            'estado': estado.val()
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
        if (id.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = id.val();
        const URL = `/api/time/${ID}`;
        try {
            fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherCampos(jsonResponse));
        } catch (e) {
            failMessage(`${e}`);
        }
    });

    function preencherCampos(time){

        console.log(time);
        if(time.nome == null && time.data == null && time.cidade == null && time.estado == null){
            failMessage('Clube não encontrado, insira um ID válido');
        }
        id.val(time.id);
        nome.val(time.nome);
        data.val(time.anoFundacao);
        cidade.val(time.cidade);
        estado.val(time.estado);
    }

    function resetar(res){
        if(res.status == 404){
            failMessage(`Clube não encontrado, insira um ID válido`);
        } else if (res.status == 400){
            failMessage('Falha na criação de Clube, por favor, insira dados válidos.')
        } else {
            successMessage('Clube atualizado!');
        }

        id.val("");
        nome.val("");
        data.val("");
        cidade.val("");
        estado.val("");
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
  