//ELEMENTS
const gameArea = document.getElementById('game-area');

//*****************Game Display elements
const pointsDislay = document.getElementById('points');
const recordDislay = document.getElementById('record');
const livesDislay = document.getElementById('lives');
var points = 0;
var record = 0;
var lives = 3;
//*****************Game Menu elements
const menuGroup = document.getElementById('gameMenu');
const menuStatus = document.getElementById('status');
const menuInstructions = document.getElementById('instructions');
const userButton = document.getElementById('btnStart');
//*****************Gameplay elements
const player = document.getElementById('player');
const playerExaust = document.getElementById('player-exaust');
const explosion = document.getElementById('explosion');
const enemyType = ['Ship2.png','Ship3.png','Ship4.png','Ship5.png'];
var playerCanPlay = false;
var enemyInterval = undefined;
var speed = 0;
//SOUNDS
const sndMusic = document.getElementById('sndMusic');
const sndExlosion = document.getElementById('sndExplosion');
const sndShot = document.getElementById('sndShot');
const sndStart = document.getElementById('sndStart');
const sndGameOver = document.getElementById('sndGameOver');

//EXAUST
var exaustIndex = 1;
var exaustInterval = undefined;

//EXPLOSION
var explosionIndex = 1;

//LISTENER OF EVENTS
userButton.onclick = () => startGame();
window.addEventListener('keydown', playerPress); //Key press
sndMusic.addEventListener("ended", function(){ sndMusic.currentTime = 0; sndMusic.play(); }, false); //Music Loop

//**** FUNCTIONS ****/
function startGame() {
    sndGameOver.pause();
    sndStart.play();
    sndMusic.play();
    userButton.style.display = 'none';
    menuInstructions.style.display = 'none';
    menuStatus.style.display = 'none';
    points = 0;
    lives = 3;
    speed = 0;
    updateLives();
    updateScore();
    playerCanPlay = true;
    player.style.left = '220px';
    exaustInterval = setInterval(() => {
        animaExaust();
    }, 100);
    
    enemyInterval = setInterval(() => {
        createEnemy();
    }, 2000);
}

//Get the KEYS that player press and do the actions to move and shoot
function playerPress(event) {
    if (playerCanPlay) {
        if (event.key == 'ArrowLeft') {
            event.preventDefault();
            movePlayer('LEFT');
        }  else if (event.key == 'ArrowRight') {
            event.preventDefault();
            movePlayer('RIGHT');
        } else if (event.key === ' ') {
            event.preventDefault();
            shoot();
        }
    }
}

//Update the Lives on the right corner
function updateLives() {
    var arrlives = document.querySelectorAll('.life');
    if (arrlives.length > 0) {
        arrlives.forEach((life) => {
            life.remove();
        });
    }
    for (var i = 0; i < lives; i++) {
        var newLive = document.createElement('div');
        newLive.classList.add('life')
        livesDislay.appendChild(newLive);
    }
    if (lives == 0) {
        gameOver();
        return;
    }
}

//Update the score on the left corner
function updateScore() {
    pointsDislay.innerHTML = 'Score:</br>' + points + ' pts'
}

//Move the Player to left or right
function movePlayer(side){
    var leftPosition = getComputedStyle(player).getPropertyValue('left');
    if ((( parseInt(leftPosition) <= 0 ) && ( side == 'LEFT')) || (( parseInt(leftPosition) >= 440 )) && ( side == 'RIGHT')) { //|| ( leftPosition == '440px')) {
        return;
    } 
    var position = parseInt(leftPosition);
    if (side == 'LEFT') {
        position -= 10;
    } else if ( side = "RIGHT") {
        position += 10;
    }
    player.style.left = `${position}px`;
}

//function to create an animation of ship exhaust changing images
function animaExaust() {
    if (exaustIndex < 4) 
        exaustIndex++;
    else 
        exaustIndex=1;
    playerExaust.style.backgroundImage = "url('/images/ships/exaust/exaust" + exaustIndex + ".png')";
} // End of function animaExaust()

//Create and move a shot element
function shoot() {
    clearInterval(shootLaser);
    let shot = createShotElement(); //Create the element <div> for the shot
    var shootLaser = setInterval(() => {
        var shotTop = parseInt(getComputedStyle(shot).getPropertyValue('top'));
        shotTop = shotTop - 10;
        shot.style.top = `${shotTop}px`
        if (shotTop <= 50) {
            shot.remove();
            clearInterval(shootLaser);
        }
        var enemies = document.querySelectorAll('.enemy'); //Get all enemies on game area
        enemies.forEach((enemy) => {
            if (checkShotCollision(shot, enemy)){
                shot.remove();
                sndExlosion.pause();
                clearInterval(shootLaser);
                createExplosion(enemy);
                points = points + 10;
                speed += 0.1;
                updateScore();
            }
        });
    },10);
}

function createShotElement() {
    var newShot = document.createElement('div');
    gameArea.appendChild(newShot);
    var leftPosition = parseInt(getComputedStyle(player).getPropertyValue('left'))+15;
    newShot.classList.add('shot');
    newShot.style.left = `${leftPosition}px`;
    sndShot.currentTime = 0;
    sndShot.play();
    return newShot;
}

//Create the enemies
function createEnemy() {
    var sortEnemy = Math.floor(Math.random()*enemyType.length);
    var enemy = document.createElement('img');
    gameArea.appendChild(enemy);
    enemy.src = '/images/ships/' + enemyType[sortEnemy];
    enemy.classList.add('enemy');
    enemy.classList.add('enemy-transition');
    enemy.style.left = `${Math.floor(Math.random()*400)}px`;
    var enemyCreateInterval = setInterval(() => {
        var enemyTop = parseInt(getComputedStyle(enemy).getPropertyValue('top'));
        if (enemyTop >= 400){
            enemy.remove();
            lives--;
            updateLives();
            clearInterval(enemyCreateInterval);
        }
        enemy.style.top = `${enemyTop + 1 + speed}px`;
    },10);
}

//Check collision of elements shot and enemies
function checkShotCollision (shot, enemy) {
    //Get Enemy position
    var enemyLeft = parseInt(enemy.style.left);
    var enemyRight = enemyLeft + parseInt(getComputedStyle(enemy).getPropertyValue('width'));
    var enemyTop = parseInt(getComputedStyle(enemy).getPropertyValue('top'))+128; //top + height
    //---Adjustment for the size of the ship
    enemyLeft = enemyLeft + 40;
    enemyRight = enemyRight - 40;
    
    //Get shot position
    var shotLeft = parseInt(getComputedStyle(shot).getPropertyValue('left'));
    var shotRight = shotLeft + parseInt(getComputedStyle(shot).getPropertyValue('width'));
    var shotTop = parseInt(getComputedStyle(shot).getPropertyValue('top'));
    //---Adjustment for the size of the shot
    shotLeft = shotLeft + 20;
    shotRight = shotRight - 20;

    //Check COLLISION
    if ((shotRight >= enemyLeft)&&(shotLeft <= enemyRight)){
        if (shotTop + 48 <= enemyTop) {
            return true;
        }
        return false;
    }
    return false;
}

//create an Explosion element
function createExplosion(enemy) {
    var explosion = document.createElement('div');
    gameArea.appendChild(explosion);
    explosion.classList.add('explosion');
    explosion.style.left = enemy.style.left;
    explosion.style.top = enemy.style.top;
    enemy.remove();
    sndExlosion.currentTime = 0;
    sndExlosion.play();
    var explosionInterval = setInterval(() => {
        if (explosionIndex < 11) 
            explosionIndex++;
        else {
            explosionIndex=0;
            explosion.remove();
            clearInterval(explosionInterval);
            return;
        }
    explosion.style.backgroundImage = "url('/images/explosion/Explosion1_" + explosionIndex + ".png')";
    explosion.style.top = `${parseInt(getComputedStyle(explosion).getPropertyValue('top')) + 3}px`;
    }, 50);
} // End of Function createExplosion()

//Function to END the game when the player have no more lives.
function gameOver() {
    sndMusic.pause();
    sndMusic.currentTime = 0;
    sndGameOver.play();
    playerCanPlay = false;
    clearInterval(enemyInterval);
    clearInterval(exaustInterval);
    userButton.style.display = 'block';
    userButton.innerHTML = 'TRY AGAIN';
    menuInstructions.style.display = 'block';
    menuStatus.style.display = 'block';
    menuStatus.innerHTML = 'GAME OVER';

    //Check if the player get more points of the current record.
    if (points > record) {
        record = points;
        recordDislay.innerHTML = 'Record:</br>' + record + ' pts'
        menuStatus.innerHTML = 'GAME OVER</BR>NEW RECORD'
    }   
}