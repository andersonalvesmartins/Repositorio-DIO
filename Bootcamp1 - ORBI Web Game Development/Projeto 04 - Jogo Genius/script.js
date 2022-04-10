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
        return green;
    } else if (color == 1){
        return red;
    } else if (color == 2){
        return yellow;
    } else if (color == 3){
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

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 500);
}

let nextLevel = () => {
    score++;
    sorteiaNumero();
}

let gameOver = () => {
    alert('Pontuação: ' + score + '/nVOCÊ PERDEU!\nClique em OK para reiniciar.')
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

/*green.addEventListener('click',click(0))
red.addEventListener('click',click(1))
yellow.addEventListener('click',click(2))
blue.addEventListener('click',click(3))*/

playGame();