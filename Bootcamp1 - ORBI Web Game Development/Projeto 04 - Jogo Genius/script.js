var order = [];
var clickOrder = [];
var score = 0;

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const blue = document.getElementById('azul');
const red = document.getElementById('vermelho');
const green = document.getElementById('verde');
const yellow = document.getElementById('amarelo');

const userButton = document.getElementById('tela');
const scoreScreen = document.getElementById('telaPontos');
const recordScreen = document.getElementById('telaRecord');

//pega os sons do jogo
const somBlue = document.getElementById('somAzul');
const somRed = document.getElementById('somVermelho');
const somGreen = document.getElementById('somVerde');
const somYellow = document.getElementById('somAmarelo');
const somGameOver = document.getElementById('somGameOver');
const somWin = document.getElementById('somVitoria');
const somLoose = document.getElementById('somErrou');
var somCor;

function sorteiaNumero() {
    let colorOrder = Math.floor(Math.random()*4);
    order[order.length] = colorOrder;
    clickOrder = [];

    for (var i in order){
        var elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

let createColorElement = (color) => {
    if (color == 0){
        somCor = somGreen;
        return green;
    } else if (color == 1){
        somCor = somRed;
        return red;
    } else if (color == 2){
        somCor = somYellow;
        return yellow;
    } else if (color == 3){
        somCor = somBlue;
        return blue;
    }
}

let lightColor = (element, number) => {
    number = number + 500;
    
    element.classList.add('selected');
    setTimeout(() => {
        element.classList.remove('selected');
    },number - 250);
}

let checkOrder = () => {
    for (let i in clickOrder) {
        if(clickOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if (clickOrder.length == order.length){
        alert('Pontuação: ' + score + '\nVocê acertou! Iniciando próximo nível');
        nextLevel();
    }
}

let click = (color) => {
    clickOrder[clickOrder.length] = color;
    createColorElement(color).classList.add('selected');
    somCor.play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 1000);
    somCor.pause();
    somCor = null;
}

let nextLevel = () => {
    somWin.play();
    score++;
    sorteiaNumero();
}

let gameOver = () => {
    somGameOver.play();
    alert('Pontuação: ' + score + '/nVOCÊ PERDEU!\nClique em OK para reiniciar.')
    somGameOver.stop();
    order = [];
    clickOrder = [];

    playGame();
}

let playGame = () => {
    alert('BEM VINDO AO GENIUS\n\nTeste a sua memória')
    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
userButton.onclick = () => startGame();

/*green.addEventListener('click',click(0))
red.addEventListener('click',click(1))
yellow.addEventListener('click',click(2))
blue.addEventListener('click',click(3))*/

playGame();

function piscaDisplay(text, callback){
    var count = 0;
    var on = true;

    scoreScreen.innerHTML = text;

    const interval = setInterval(() => {
        if (on) {
            scoreScreen.classList.add('screenOff');
        } else {
            scoreScreen.classList.remove('screenOff');
            
            if(++counter === 3){
                clearInterval(interval);
                callback();
            }
        }

        on = !on;
    },250);
}