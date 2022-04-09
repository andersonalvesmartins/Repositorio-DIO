var jogador = null;
var jogadorSelecionado = document.getElementById('jogador-selecionado');
var vencedorSelecionado = document.getElementById('vencedor-selecionado');
var quadrados = document.getElementsByClassName('quadrado');

mudarJogador('X');

function escolherQuadrado(id) {
    var quadrado = document.getElementById(id);

    if (quadrado.innerHTML != '-' || vencedorSelecionado.innerHTML != '') {
        return;
    }

    quadrado.innerHTML = jogador;
    quadrado.style.color = 'black';
    if (jogador == 'X') {
        jogador = 'O';
    } else {
        jogador = 'X';
    }
    mudarJogador(jogador);
    checaVencedor();
}

function mudarJogador(valor){
    jogador = valor;
    jogadorSelecionado.innerHTML = jogador;
}

function mudarVencedor(valor){
    vencedorSelecionado.innerHTML = valor;
}

function checaVencedor(){
    var quadrado1 = document.getElementById('1');
    var quadrado2 = document.getElementById('2');
    var quadrado3 = document.getElementById('3');
    var quadrado4 = document.getElementById('4');
    var quadrado5 = document.getElementById('5');
    var quadrado6 = document.getElementById('6');
    var quadrado7 = document.getElementById('7');
    var quadrado8 = document.getElementById('8');
    var quadrado9 = document.getElementById('9');

    checaSequencia(quadrado1, quadrado2, quadrado3);
    checaSequencia(quadrado1, quadrado4, quadrado7);
    checaSequencia(quadrado1, quadrado5, quadrado9);
    checaSequencia(quadrado2, quadrado5, quadrado8);
    checaSequencia(quadrado3, quadrado6, quadrado9);
    checaSequencia(quadrado4, quadrado5, quadrado6);
    checaSequencia(quadrado7, quadrado8, quadrado9);
    checaSequencia(quadrado3, quadrado5, quadrado7);
}

//Essa função verifica se houve vencedor e se houve pinta os quadrados de verde e marca o vencedor
function checaSequencia(q1, q2, q3){
    if ((q1.innerHTML != '-') && (q1.innerHTML == q2.innerHTML) && (q1.innerHTML == q3.innerHTML)){
        q1.style.background = '#00ff00';
        q2.style.background = '#00ff00';
        q3.style.background = '#00ff00';
        mudarVencedor(q1.innerHTML);
    }
}

function reiniciar(){
    vencedorSelecionado.innerHTML = '';
    for (var i=1; i<=9; i++){
        var quadrado = document.getElementById(i);
        quadrado.style.background = '#eee';
        quadrado.style.color = '#eee';
        quadrado.innerHTML = '-'
    }
    mudarJogador('X');
}