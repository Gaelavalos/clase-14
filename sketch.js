var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

//srive para aparecer las distintas imagenes
function preload(){
  //sirve para darle movimiento al t-rex
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  //sirve para poder perder al chocar con los obstaculos
  trex_collided = loadAnimation("trex_collided.png");
 
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  //sirve para aparecer obstaculos
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
}

function setup() {
  //sirve para crear mi espacio de juegos 
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  //agrega animaciones
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  //es la pocision del suelo
  ground.x = ground.width /2;
  //es la funcion que hace que se mueva 
  ground.velocityX = -4;
  //sirve para corregir el bug de que el t-rex camine sobre el suelo
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nubes
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hola" + 5);
  
  score = 0;
}

function draw() {
  background(180);
  text("Puntuación: "+ score, 500,50);

  

  
  if(gameState === PLAY){
    //mover el suelo
    
    ground.velocityX = -4;
    
    score = score + Math.round(frameCount/60);
    
    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -13;
    
      
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    //aparecer nubes
  spawnClouds();
  
  //aparecer obstáculos en el suelo
  spawnObstacles();

  if(obstaclesGroup.isTouching(trex)){
    gameState=END;
  }
  }

  else if(gameState === END){
    //detener el suelo
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
  }
  
  
  
  trex.velocityY = trex.velocityY + 0.8
  
  
  
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;

   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar escala y ciclo de vida al obstáculo          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //agregar cada obstáculo al grupo
   obstaclesGroup.add(obstacle);
 }
}




function spawnClouds() {
  //escribir aquí el código para aparecer las nubes 
  if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar ciclo de vida a la variable
    cloud.lifetime = 134;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //agregar nube al grupo
   cloudsGroup.add(cloud);
  }
  
}
