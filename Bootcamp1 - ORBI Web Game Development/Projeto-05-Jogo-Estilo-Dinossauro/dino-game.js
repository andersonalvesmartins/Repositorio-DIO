const naruto = document.getElementById('naruto');
const gameArea = document.getElementById('gameArea');
const banner = document.getElementById('banner');
const road = document.getElementById('road');
const footer = document.getElementById('footer');
const pointsDisplay = document.getElementById('pointsDisplay');
var isJumping = false;
var isGameOver = true;
var isRecord = false;
var playerCanPlay = true;
var points = 0;
var record = 0;
var gameInterval = undefined;

//VARIABLES
arrEnemies = ['kisame.png', 'hidan.png', 'deidara.png','itachi.png','konan.png','orochimaru.png','pain.png','sasori.png','sasuke.png','tobi.png','zetsu.png'];
arrGameOver = ['gameOver1.gif', 'gameOver2.jpg', 'gameOver3.jpg', 'gameOver4.jpg', 'gameOver5.png',] 

//GAME SOUND
const sndJump = document.getElementById("sndJump");
const sndGameplay = document.getElementById('sndGameplay');
const sndDied = document.getElementById('sndDied');
const sndGameOver = document.getElementById('sndGameOver');
const sndRecord = document.getElementById('sndRecord');

//loop of gameplay Music
sndGameplay.addEventListener("ended", function(){ sndGameplay.currentTime = 0; sndGameplay.play(); }, false);
sndGameplay.play();

//Listener of Keypress
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('click', () => {
    if (playerCanPlay) {
        if (!isGameOver){
            if (!isJumping){
                jump();
            }
        } else {
            startGame();
        }
    }
});

function handleKeyUp(event){
    if (playerCanPlay) {
        if (event.keyCode === 32){
            if (!isGameOver){
                if (!isJumping){
                    jump();
                }
            } else {
                startGame();
            }
        }
    }
}

function startGame() {
    //Control sounds
    sndGameOver.pause();
    sndGameOver.currentTime = 0;
    sndGameplay.play();

    //Reset GameArea
    gameArea.style.backgroundImage = '';
    gameArea.classList.add('gameArea');
    gameArea.classList.remove('gameOver');

    //show/hideElements
    naruto.style.display = 'block';
    road.style.display = 'block';
    footer.style.display = 'block';
    banner.style.display = 'none';

    //set variables
    isRecord = false;
    isGameOver = false;
    points = 0;

    //Start the enemies creation
    createEnemies();

    //Start the GameInterval to generate the points and check if the player get the record (DATEBAYO!)
    //Show the points and record at gameArea
    gameInterval = setInterval(() => {
        points = points + 1;
        if (record > 0) {
            if (points > record && !isRecord){
                sndRecord.play();
                isRecord = true;
            }
            pointsDisplay.innerHTML = 'High Score: ' + record + ' | Score: ' + points;
        } else {
            pointsDisplay.innerHTML = 'Score: ' + points;
        }
    }, 10);
}

//Function to do the Naruto JUMP
function jump() {
    isJumping = true; //to prevent the player jump during the jump.
    let position = parseInt(getComputedStyle(naruto).getPropertyValue('top'));
    naruto.classList.remove('narutoRun'); //change animation RUN
    naruto.classList.add('narutoJump'); //for JUMP
    sndJump.play(); 
    //jumpUp
    let upInterval = setInterval(() => {
        if (position <= 270){
            clearInterval(upInterval);
            //Jump Down
            let downInterval = setInterval(() => {
                if (position >= 400) {
                    naruto.classList.remove('narutoJump');
                    naruto.classList.add('narutoRun');
                    isJumping = false;
                    clearInterval(downInterval);
                    return;
                }
                position += 1;
                naruto.style.top = position + 'px';
            }, 1);
        }
        position -= 1;
        naruto.style.top = position + 'px';
    }, 1); 
}

//Create enemies randomly and at random time.
//There are two enemies (hidan and kisame) that are largest (70px) and I treat it here.
function createEnemies(){
    if (isGameOver)
        return; //to stop generate enemies if the game is over
    const enemy = document.createElement('div')
    let randomTime = 0;
    enemy.classList.add('enemy');
    gameArea.appendChild(enemy);
    let imgIndex = Math.floor(Math.random()*11);
    if (imgIndex <= 1) { //index 0 and 1 are hidan and kisame
        enemy.style.width = '70px';
    } else {             //here all other enemies
        enemy.style.width = '50px';
    }
    let imgSrc = 'url(/images/' + arrEnemies[imgIndex] + ')';
    enemy.style.backgroundImage =  imgSrc;

    //do the enemy walk to left
    let leftInterval = setInterval(() => {
        let enemyPosition = parseInt(getComputedStyle(enemy).getPropertyValue('left'));
        enemyPosition = enemyPosition - 1;
        enemy.style.left = enemyPosition + 'px';
        //remove enemy in the end of scenario and if there are collisions (calling gameOver())
        if (enemyPosition <= -10 ){
            clearInterval(leftInterval);
            gameArea.removeChild(enemy);
        } else if (enemyPosition > 29 && enemyPosition < 100 && imgIndex > 1 && parseInt(getComputedStyle(naruto).getPropertyValue('top')) > 330) {
            gameArea.removeChild(enemy);
            clearInterval(leftInterval);
            gameOver();
            isGameOver = true;
            return;
        } else if (enemyPosition > 8 && enemyPosition < 100 && imgIndex <= 1 && parseInt(getComputedStyle(naruto).getPropertyValue('top')) > 330) {
            clearInterval(leftInterval);
            gameArea.removeChild(enemy);
            isGameOver = true;
            gameOver();
            return;
        }
        if (isGameOver){
            clearInterval(leftInterval);
            gameArea.removeChild(enemy);
            return;
        }
    }, 4);
    
    //Call this function recursively from a random time.
    if (!isGameOver) {
        do {
            randomTime = Math.floor(Math.random() * 4000); //the time cannot be between 201 and 1999 to keep the space between the enemies. Otherwise were impossible to jump.
        } while ((randomTime > 200) && (randomTime < 1200));
        setTimeout(createEnemies,  randomTime);
        randomTime = 0;
    }
}

//Function called when the game is over.
function gameOver(){
    //stop counting points
    clearInterval(gameInterval);

    //Sound Control
    sndGameplay.pause();
    sndGameplay.currentTime = 0;
    sndDied.play();
    sndGameOver.play();

    //Change GameArea to gameOver screen changing the background image
    let gameOverImg = '/images/' + arrGameOver[Math.floor(Math.random() * 5)];
    gameArea.classList.remove('gameArea');
    gameArea.classList.add('gameOver');
    gameArea.style.backgroundImage = 'url(' + gameOverImg + ')';

    //hide elements
    naruto.style.display = 'none';
    road.style.display = 'none';
    footer.style.display = 'none';

    //check if the player have the record and update it.
    if (points > record){
        record = points;
    }

    pointsDisplay.innerHTML = 'High Score: ' + record + ' | Score: ' + points + '<br>Aguarde...';
    playerCanPlay = false;
    setTimeout(() => {
        pointsDisplay.innerHTML = 'High Score: ' + record + ' | Score: ' + points + '<br>Pressione ESPAÇO ou clique para reiniciar';
        playerCanPlay = true;
    }, 2000);
}
