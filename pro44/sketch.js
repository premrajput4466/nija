var pc, pc_running,pc_dey;
var ground, invisibleGround, groundImage; 
var obstacle,obstacleImg,obstaclesGroup;
var score;
var jumpSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart,restartImg;

function preload() {
  pc_running = loadAnimation("2.png", "3.png", "4.png");
  groundImage = loadImage("1.png");
  obstacleImg = loadImage("5.png");
  jumpSound = loadSound("jump.mp3");
  restartImg = loadImage("6.png");
  pc_dey = loadImage("4.png");
}

function setup() {
  createCanvas(600, 200);

  ground = createSprite(300, 100, 600, 20);
  ground.addImage("ground", groundImage);
  ground.scale=2;
  ground.x = ground.width / 2;
  ground.velocityX = -4;
  
  invisibleGround=createSprite(300,190,600,10);
  invisibleGround.visible=false;

  pc = createSprite(50, 160, 20, 50);
  pc.addAnimation("running", pc_running);
  pc.addAnimation("die",pc_dey);

  obstaclesGroup = createGroup();
  
  score=0;

  restart=createSprite(300,100,50,50);
  restart.addImage("restart",restartImg);
  restart.visible=false;
   
}


function draw() {
  background(220);

  if(gameState===PLAY){
    if (keyDown("space")&&pc.y>=100) {
      pc.velocityY = -10;
      jumpSound.play();
    }
  
   pc.velocityY = pc.velocityY + 0.8
  
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    spawnObstacles();
    if(obstaclesGroup.isTouching(pc)){
      gameState=END
    }

  }
else if(gameState===END){
 
pc.changeAnimation("die",pc_dey);
restart.visible=true;
ground.velocityX=0;
pc.velocityY=0;
obstaclesGroup.setVelocityXEach(0);

}
  



  pc.collide( invisibleGround);

 

  drawSprites();

  text("Score: "+ score, 550,10);

}

function spawnObstacles(){
  if (frameCount % 60 === 0){
    var obstacle = createSprite(600,160,10,40);
    obstacle.addImage(obstacleImg)
    obstacle.velocityX = -(6 + score/100); 
    
     //generate random obstacles
     var rand = Math.round(random(1,6));
             
     obstacle.scale = 0.1;
     obstacle.lifetime = 300;
    
     obstaclesGroup.add(obstacle);
  }
 }