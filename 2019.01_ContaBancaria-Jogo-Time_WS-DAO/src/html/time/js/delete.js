$(window).ready(function(){

    txtID = $('#dID');
    botaoDeletar = $('#dSubmit');

    $(botaoDeletar).on("click",function(){
        if (txtID.val() == ''){
            failMessage('Por favor, insira dados válidos!');
        }
        const ID = txtID.val();
        const URL = `/api/time/${ID}`;
        const deleteRequest = {
          method: 'DELETE'
        };
        try {
          fetch(URL, deleteRequest).then(resposta => resetar(resposta));
        } catch (e) {
          failMessage(e);
        }
    });

      function failMessage(msg){
        $("#delete-fail-msg").text(`${msg}`);
        $("#delete-fail-status").removeClass("hide");
        $("#delete-fail-status").animate({top:'105%',opacity:1},1000);
        setTimeout(function(){
            $("#delete-fail-status").addClass("hide");
        },3000);
        setTimeout(function(){
            $("#delete-fail-status").animate({top:'95%',opacity:0});
        },3000);
    }

    function successMessage(msg){
        $("#delete-success-msg").text(`${msg}`);
        $("#delete-success-status").removeClass("hide");
        $("#delete-success-status").animate({top:'105%',opacity:1},1000);
        setTimeout(function(){
            $("#delete-success-status").addClass("hide");
        },3000);
        setTimeout(function(){
            $("#delete-success-status").animate({top:'95%',opacity:0});
        },3000);
    }

    function resetar(res){
        if(res.status == 404){
            failMessage(`Clube não encontrado, insira um ID válido`);
        } else if (res.status == 400){
            failMessage('Falha na remoção do Clube, por favor, insira dados válidos.')
        } else {
            successMessage('Clube removido!');
        }

        txtID.val("");
    }

});
