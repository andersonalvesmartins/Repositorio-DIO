var order = [];
var clickOrder = [];
var score = 0;
var varTimeout = undefined;
var playerCanPlay = false;

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

//Elementos com as cores
const blue = document.getElementById('azul');
const red = document.getElementById('vermelho');
const green = document.getElementById('verde');
const yellow = document.getElementById('amarelo');

//Game User Interface
const userButton = document.getElementById('botao');
const scoreScreen = document.getElementById('telaPontos');
const recordScreen = document.getElementById('telaRecord');

//Sons do jogo
const somBlue = document.getElementById('somAzul');
const somRed = document.getElementById('somVermelho');
const somGreen = document.getElementById('somVerde');
const somYellow = document.getElementById('somAmarelo');
const somWin = document.getElementById('somVitoria');
const somLoose = document.getElementById('somErrou');

function startGame(){
    score = 0;
    order = [];
    playerCanPlay = false;
    alteraCursorMouse('auto');
    piscaDisplay('--', () => {
        proximoNivel();
    })
}

function proximoNivel(){
    userButton.innerHTML = "RESET";
    userButton.classList.add('espera');
    clickOrder = [];
    playerCanPlay = false;
    alteraCursorMouse('auto');
    sorteiaNumero();
}

function sorteiaNumero() {
    order.push(Math.floor(Math.random()*4));
    score++;
    setScore();
    iluminaSequencia();
}

function iluminaSequencia() {
    var count = 0;
    var aceso = false;

    const interval = setInterval(() => {
        var elementoDaCor = identificaCor(order[count]);
        if (!aceso) {
            if (count === order.length) {
                clearInterval(interval);
                green.classList.remove('selected');
                yellow.classList.remove('selected');
                blue.classList.remove('selected');
                red.classList.remove('selected');
                playerCanPlay = true;
                alteraCursorMouse('pointer');
                return;
            } else {
                elementoDaCor.classList.add('selected');
                iniciaSom(elementoDaCor.id);
            }
        } else {
            pausaSom(elementoDaCor.id);
            elementoDaCor.classList.remove('selected');
            count ++;
        }
        aceso = !aceso;
    }, 500);
}

function identificaCor(numeroCor) {
    if (numeroCor == 0){
        return green;
    } else if (numeroCor == 1){
        return red;
    } else if (numeroCor == 2){
        return yellow;
    } else if (numeroCor == 3){
        return blue;
    }
}

function click(numCor) {
    if (!playerCanPlay){
        return;
    }

    clickOrder.push(numCor);
    var elementoDaCor = identificaCor(numCor)
    
    elementoDaCor.classList.add('selected'); //acende a cor
    iniciaSom(elementoDaCor.id);             //toca o som

    setTimeout(() => {
        elementoDaCor.classList.remove('selected'); //apaga a cor
        pausaSom(elementoDaCor.id);                 //pausa o som
        verificaOrdem(clickOrder);                  //verifica se acertou
    }, 500);
}

function verificaOrdem(){
    for (var i = 0; i <= clickOrder.length - 1; i++) {
        if(clickOrder[i] != order[i]){
            gameOver();
            return;
        }
    }
    if (clickOrder.length == order.length){
        somWin.play();
        proximoNivel();
    }
}

function iniciaSom(cor){
    if (cor == 'amarelo'){
        somYellow.play();
        return;
    } else if (cor == 'verde'){
        somGreen.play();
        return;
    } else if (cor == 'vermelho'){
        somRed.play();
        return;
    } else if (cor == 'azul'){
        somBlue.play();
        return;
    }
}

function pausaSom(cor){
    if (cor == 'amarelo') {
        somYellow.pause();
        return;
    } else if (cor == 'verde') {
        somGreen.pause();
        return;
    } else if (cor == 'vermelho'){
        somRed.pause();
        return;
    } else if (cor == 'azul'){
        somBlue.pause();
        return;
    }
}

let gameOver = () => {
    playerCanPlay = false;
    alteraCursorMouse('auto');
    clearTimeout (varTimeout);
    somLoose.play();
    userButton.innerHTML = "ERROU";
    userButton.classList.add('perdeu');
    varTimeout = setTimeout(() => {
        order = [];
        clickOrder = [];
        userButton.classList.remove('perdeu');
        userButton.classList.remove('espera');
        userButton.innerHTML = "INICIAR";
    }, 1000);
    
}

//Identifica os cliques nas cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
userButton.onclick = () => startGame();

//Função que inicia o Jogo e dá um tempo entre o clique no botão ao inicio efetivo da sequencia.
function piscaDisplay(text, callback){
    var count = 0;
    var on = true;
    scoreScreen.innerHTML = text;
    const interval = setInterval(() => {
        if (on) {
            scoreScreen.classList.add('scoreOff');
        } else {
            scoreScreen.classList.remove('scoreOff');
            
            if(++count === 3){
                clearInterval(interval);
                callback();
            }
        }
        on = !on;
    },250);
}

function setScore(){
    const strScore = (score - 1).toString();
    const display = "00".substring(0, 2 - strScore.length) + strScore;

    scoreScreen.innerHTML = display;

    const record = recordScreen.innerHTML * 1;
    if ((score - 1) >= record) {
        setRecord((score - 1));
    }
}

function setRecord(recorde){
    const strRecord = recorde.toString();
    const display = "00".substring(0, 2 - strRecord.length) + strRecord;
    recordScreen.innerHTML = display;
}

alteraCursorMouse = (tipoCursor) => {
    yellow.style.cursor = tipoCursor;
    red.style.cursor = tipoCursor;
    blue.style.cursor = tipoCursor;
    green.style.cursor = tipoCursor;
}