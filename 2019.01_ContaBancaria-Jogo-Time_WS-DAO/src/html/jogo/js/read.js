$(window).ready(function(){

  const resync = document.querySelector('#resync-data');
  //const contadorParagrafo = document.querySelector('#contador');
  function preencherTabela(jogos, dataTab) {
    const tabContas = document.querySelector(`#tab${dataTab}`);
    var linhasTabela = '';
    var n = jogos.length;
    for (var i = 0; i < n; i++) {
      var jogo = jogos[i];
      linhasTabela +=
      '<div class="col-1 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + jogo.id + '</b></p></div>' +
      '<div class="col-2 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + jogo.nomeTimeA + '</b></p></div>' +
      '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + jogo.nomeTimeB + '</b></p></div>' +
      '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + jogo.golsTimeA + '</b></p></div>' +
      '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + jogo.golsTimeB + '</b></p></div>';
    }
    tabContas.innerHTML = linhasTabela;
    //contadorParagrafo.innerHTML = n + ' ' + (n == 1 ? 'conta' : 'contas');
  }
  async function listarJogos() {
    const URL = `/api/jogo`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 0));
    } catch (e) {
      corpoTabela.innerHTML = e;
    }
  }
  async function listarQtdGols() {
    const URL = `/api/jogo/mais-gols`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 1));
    } catch (e) {
      corpoTabelaMaS.innerHTML = e;
    }
  }
  async function listarVitoriaMandante() {
    const URL = `/api/jogo/vitoria-mandante`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 2));
    } catch (e) {
      corpoTabelaMeS.innerHTML = e;
    }
  }
  async function listarJogosEmpate() {
    const URL = `/api/jogo/jogos-empate`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 3));
    } catch (e) {
      corpoTabelaMeS.innerHTML = e;
    }
  }

  listarQtdGols();
  listarVitoriaMandante();
  listarJogosEmpate();

  $(resync).on("click",function(){
    listarQtdGols();
    listarVitoriaMandante();
    listarJogosEmpate();
  });

});
