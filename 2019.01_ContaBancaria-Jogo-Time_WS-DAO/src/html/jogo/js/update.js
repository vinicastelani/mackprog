$(window).ready(function(){
    const id = $('#uID');
    const mandante = $('#uMandante');
    const visitante = $('#uVisitante');
    const golsMandante = $('#uGolsMandante');
    const golsVisitante = $('#uGolsVisitante');

    const botaoSelecionar = $('#uBuscar');
    const botaoAtualizar = $('#uSubmit');

    $(botaoAtualizar).on("click",function(){
        if (id.val() == ''){
            failMessage('Por favor, insira um ID válido.');
        }
        const ID = id.val();
        const URL = `/api/conta-bancaria/${ID}`;
        const dadosJogo = {
            'id': ID,
            'nomeTimeA': mandante.val(),
            'nomeTimeB': visitante.val(),
            'golsTimeA': golsMandante.val()
            'golsTimeB': golsVisitante.val()
        };
        const putRequest = {
        method: 'PUT',
        body: JSON.stringify(dadosJogo),
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
        const URL = `/api/jogo/${ID}`;
        try {
            fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherCampos(jsonResponse));
        } catch (e) {
            failMessage(`${e}`);
        }
    });

    function preencherCampos(jogo){
        if(jogo.nomeTimeA == null && jogo.nomeTimeB == null && jogo.golsTimeA == null && jogo.golsTimeB == null){
            failMessage('Partida não encontrada, insira um ID válido');
        }
        id.val(jogo.id);
        mandante.val(jogo.nomeTimeA);
        golsMandante.val(jogo.golsTimeA);
        visitante.val(jogo.nomeTimeB);;
        visitante.val(jogo.golsTimeB);;
    }

    function resetar(res){
        if(res.status == 404){
            failMessage(`Partida não encontrada, insira um ID válido`);
        } else if (res.status == 400){
            failMessage('Falha na criação de partida, por favor, insira dados válidos.')
        } else {
            successMessage('Partida atualizada!');
        }

        id.val("");
        mandante.val("");
        visitante.val("");
        golsMandante.val("");
        golsVisitante.val("");
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
