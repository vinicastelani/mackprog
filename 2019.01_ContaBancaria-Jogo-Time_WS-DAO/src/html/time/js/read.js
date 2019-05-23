$(window).ready(function(){

  const resync = document.querySelector('#resync-data');
  //const contadorParagrafo = document.querySelector('#contador');
  function preencherTabela(times, dataTab) {
    const tabTimes = document.querySelector(`#tab${dataTab}`);
    var linhasTabela = '';
    var n = times.length;
    for (var i = 0; i < n; i++) {
      var time = times[i];
      linhasTabela +=
      '<div class="col-2 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + time.id + '</b></p></div>' +
      '<div class="col-2 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + time.nome + '</b></p></div>' +
      '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + time.anoFundacao + '</b></p></div>' +
      '<div class="col-3 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + time.cidade + '</b></p></div>' +
      '<div class="col-2 tab-field textcolor-white"><p class="text-center padding-top-5 textcolor-white"><b>' + time.estado + '</b></p></div>';
    }
    tabTimes.innerHTML = linhasTabela;
    //contadorParagrafo.innerHTML = n + ' ' + (n == 1 ? 'conta' : 'contas');
  }
  async function listarContas() {
    const URL = `/api/time`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 0));
    } catch (e) {
      corpoTabela.innerHTML = e;
    }
  }
  async function listarTimesAlfabetica() {
    const URL = `/api/time/ordem-alfabetica`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 1));
    } catch (e) {
      corpoTabelaMaS.innerHTML = e;
    }
  }
  async function listarTimesAntigos() {
    const URL = `/api/time/mais-antigo`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 2));
    } catch (e) {
      corpoTabelaMeS.innerHTML = e;
    }
  }
  async function listarTimesSP() {
    const URL = `/api/time/times-sp`;
    try {
      fetch(URL).then(resposta => resposta.json()).then(jsonResponse => preencherTabela(jsonResponse, 3));
    } catch (e) {
      corpoTabelaMeS.innerHTML = e;
    }
  }

  listarTimesAlfabetica();
  listarTimesAntigos();
  listarTimesSP();

  $(resync).on("click",function(){
    listarTimesAlfabetica();
    listarTimesAntigos();
    listarTimesSP();
  });

});
