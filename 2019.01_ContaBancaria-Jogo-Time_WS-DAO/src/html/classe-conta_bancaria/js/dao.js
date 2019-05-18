$(window).ready(function(){

    //const contadorParagrafo = document.querySelector('#contador');
    function preencherTabela(contas, dataTab) {
      const tabContas = document.querySelector(`#tab${dataTab}`);
      var linhasTabela = '';
      var n = contas.length;
      for (var i = 0; i < n; i++) {
        var conta = contas[i];
        linhasTabela +=
        '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + conta.id + '</b></p></div>' +
        '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + conta.nomeTitular + '</b></p></div>' +
        '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + conta.numeroAgencia + '</b></p></div>' +
        '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b> R$ ' + conta.saldo + '</b></p></div>';
      }
      tabContas.innerHTML = linhasTabela;
      //contadorParagrafo.innerHTML = n + ' ' + (n == 1 ? 'conta' : 'contas');
    }
    async function listarContas() {
      const URL = `/api/conta-bancaria`;
      try {
        fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 1));
      } catch (e) {
        corpoTabela.innerHTML = e;
      }
    }
    async function listarContasMaS() {
      const URL = `/api/conta-bancaria/maior-saldo`;
      try {
        fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 2));
      } catch (e) {
        corpoTabelaMaS.innerHTML = e;
      }
    }
    async function listarContasMeS() {
      const URL = `/api/conta-bancaria/menor-saldo`;
      try {
        fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 3));
      } catch (e) {
        corpoTabelaMeS.innerHTML = e;
      }
    }
    
    listarContas();
    listarContasMaS();
    listarContasMeS();
});
