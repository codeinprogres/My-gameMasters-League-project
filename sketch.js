var spaceShip, spaceShipImg, obstaclesGroup, obstacle1, obstacle1Img, obstacle2, obstacle2Img, obstacle3, obstacle3Img, obstacles4, obstacle4Img;
var PLAY, END, START, DRAW, TELL, WIN, TELL2;
PLAY = 1;
END = 0;
START = 3;
DRAW = 2;
TELL = 4;
WIN = 5;
var gameState = START;
var score;
var groundImg;
var stars, starGroup, starImg;
var score1;
var restart, restartImg;
var border1, border2, border3, border4;
var level;
var startScreenImg; 
var endScreenImg;
var ground;
var gameSound;
var winScreenImg;
var startButton, startButtonImg;
var kepler;
var level1;
var happy, happyImg;


function preload(){
   spaceShipImg = loadImage("spaceship.png");
   obstacle1Img = loadImage("meteor.png");
   obstacle2Img = loadImage("obstacle1.PNG");
   obstacle3Img = loadImage("obstacle2.PNG");
   obstacle4Img = loadImage("obstacle3.PNG");
   groundImg = loadImage("ground.png");
   starImg = loadImage("star.png");
   restartImg = loadImage("restart.png");
   startScreenImg = loadImage("space gameImg.png");
   endScreenImg = loadImage("end.png");
   gameSound = loadSound("gameSound.mp3");
   winScreenImg = loadImage("win.png");
   startButtonImg = loadImage("start button.png");
   kepler = loadImage("background.png");
   happyImg = loadImage("happy.png");
}

function setup(){
  createCanvas(560,560);

  createEdgeSprites();
  
  ground = createSprite(280, 170);
  ground.addImage(groundImg);
  ground.velocityY = 5;


  level = 1;
  level1 = 0;

  spaceShip = createSprite(280,490,40,40);
  spaceShip.addImage(spaceShipImg);
  spaceShip.scale = 0.2;

  score = 0;
  score1 = 0;

  restart = createSprite(280,70, 50, 50);
  restart.addImage(restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  border1 = createSprite(-1,1,10,10000);
  border1.visible = false;

  border2 = createSprite(561, 560, 10, 10000);
  border2.visible = false;

  border3 = createSprite(1,561, 10000, 10);
  border3.visible = false;

  border4 = createSprite(1, -1, 10000, 10);
  border4.visible = false;

  obstaclesGroup = new Group();
  starGroup = new Group();
}

function draw(){

if(keyDown("g")){
    gameState = DRAW;
}

if(keyDown("i")){
    gameState = TELL;
}
if(keyDown("a")){
    gameState = PLAY;
}

if(gameState === START){
    background(startScreenImg);
    text("click i to start", 350, 170);
}

if(gameState === DRAW){
    background("black");
    var rulesText = text("Up arrow to move up, down arrow to move down, left and right arrows to move to the left and right.", 25,50); 
    var rulesText2 = text("After every 1000 points, the level will increase.  ", 25, 100);
    var rulesText3 = text("If you reach 12000 points you win.", 25, 150);
    var rulesText4 = text("Click a to start the game", 25, 200);
}

if(gameState === WIN){
    background(kepler);
    restart.visible = false;
    text("congrats! You made it to Kepler and you got its resources! You have saved Earth!", 25, 100);
    text("CLICK R TO RESTART THE GAME", 200,150);
    
}

if(score >= 12000){
    gameState = WIN;
}

if(gameState === TELL){
    background("blue");
    var tell1 = text("YOU ARE A NASA ASTROUNAUT WHO IS TRYING TO STOP THE WORLD FROM DYING.", 25, 50);
    var tell2 = text("YOU HAVE TO CROSS THE REGIONAL SPACE GALAXY, PASSING THROUGH ALL 12 LEVELS.", 25, 100);
    var tell3 = text("YOU WILL HAVE TO GO TO THE PLANET KNOWN AS KEPLER 152.", 25,150);
    var tell4 = text("AND TAKE THE PLANET'S RESOURCES FOR OUR OWN.", 25, 200);
    var tell5 = text("HERO, CAN YOU DO THIS? IF YOU ARE READY, CLICK G TO START THE GAME.", 25, 250);}

if(gameState === PLAY){
    spaceShip.bounceOff(border1);
    spaceShip.bounceOff(border2);
    spaceShip.bounceOff(border3);
    spaceShip.bounceOff(border4);

    spawnStars();
    spawnObstacles();
    drawSprites();
    
    text("SCORE : " + score , 10, 20);
    text("STARS : " + score1, 10, 40);

    score = score + Math.round(getFrameRate()/60);


   if(ground.y > 850){
       ground.y = 50;
   }


   if(score > 0 && score%1000 === 0){
       level += 1;
       ground.velocityY += 3;
   }

   if(keyDown("up")){
       spaceShip.y = spaceShip.y - 5;
       
   }

   if(keyDown("down")){
       spaceShip.y = spaceShip.y + 5;
   }

   if(keyDown("right")){
       spaceShip.x = spaceShip.x + 5;
   }

   if(keyDown("left")){
       spaceShip.x = spaceShip.x - 5;
   }

   if(spaceShip.isTouching(starGroup)){
       score1 += 1; 
       starGroup.destroyEach();
   } 

}

if(gameState === END){
    ground.velocityY = 0;
    spaceShip.visible = false;
    obstaclesGroup.visible = false;
    starGroup.visible = false;
    restart.visible = true;
    spaceShip.x = 280;
    spaceShip.y = 490;
    background(endScreenImg);
    text("CLICK R TO RESTART", 280, 360);
 }

if(spaceShip.isTouching(obstaclesGroup)){
    gameState = END;
} 

if(keyDown("r")){
    reset();
}


if(mousePressedOver(restart)){
    reset();
}

}

function spawnObstacles(){
    if(frameCount%120 === 0){
       obstacle1 = createSprite(random(70,510),-30, 45,45);
       obstacle1.velocityY = ground.velocityY;

       var rand = Math.round(random(1,4));
       switch(rand) {
       case 1: obstacle1.addImage(obstacle1Img);
        break;
       case 2: obstacle1.addImage(obstacle2Img);
        break;
       case 3: obstacle1.addImage(obstacle3Img);
        break;
       case 4: obstacle1.addImage(obstacle4Img);
        break;
       default: break;
       }

       obstacle1.lifetime = -1;
       obstacle1.scale = 0.5;
       obstaclesGroup.add(obstacle1);
    }
}

function spawnStars(){
   if(frameCount%120 === 0){
       stars = createSprite(random(70, 510), -30, 45, 45);
       stars.velocityY = ground.velocityY;
       stars.addImage(starImg);
       stars.scale = 0.23;
       stars.lifetime = -1;
       starGroup.add(stars);
   }
}


function reset(){
    gameState = PLAY;
    score = 0;
    score1 = 0;
    restart.visible = false;
    spaceShip.visible = true;
    obstaclesGroup.visible = true;
    starGroup.visible = true;
    ground.velocityY = 5;
    obstaclesGroup.destroyEach();
    starGroup.destroyEach();


    spaceShip.x = 280;
    spaceShip.y = 490;
}
