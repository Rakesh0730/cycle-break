
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boulderImg1, boulderImg2, boulder1, boulder2;
var treeImg1, treeImg2, tree1, tree2;
var trafficConeImg, trafficCone;
var manholeImg, manhole;
var cr1i, cr1ii, cr2i, cr2ii, cr3i, cr3ii, playerI, playerII;
var token, coin;
var gameOverScreen, gameOverScreen;
var backgr, road;

function preload()
{

	backgr = loadImage("Road.png");

	boulderImg1 = loadImage("boulder-1.png");
	boulderImg2 = loadImage("boulder-2.jpg");

	trafficConeImg = loadImage("obstacle1.png");
	manholeImg = loadImage("obstacle2.png");

	treeImg1 = loadImage("cartoon-tree-1.png");
	treeImg2 = loadImage("cartoon-tree-2.png");

	cr1i = loadAnimation("mainPlayer1.png", "mainPlayer2.png");
	cr1ii = loadImage("mainPlayer3.png");

	cr2i = loadAnimation("opponent4.png", "opponent5.png");
	cr2ii = loadImage("opponent6.png");
	
	cr3i = loadAnimation("opponent7.png", "opponent8.png");
	cr3ii = loadImage("opponent9.png");
	
	gameOverScreen = loadImage("gameOver.png");

	token = loadImage("Gold-Coin-PNG.png");

	pointGroup = new Group();
	opponentGroup = new Group();
	obstacleGroup = new Group();
	treeGroup = new Group();

}

function setup()
{
	createCanvas(600, 1300);

	engine = Engine.create();
	world = engine.world;

	road = createSprite(0, 0, 600, 1280);
	road.addImage(backgr);
	road.velocityY = 1;

	playerI = createSprite(290, 1030, 50, 50);
	playerI.addAnimation("cycling", cr1i);
	


	Engine.run(engine);
  
}


function draw()
{
  rectMode(CENTER);
  background(0);

  drawSprites();

  if(gameState === PLAY)
  {

	if(backgr.y > 1230)
    {

     backgr.y = 1030;
	 
    }

	if(keyDown("left_arrow"))
    {

     playerI.x = playerI.x - 3;
     
    }
    
   if(keyDown("right_arrow"))
    {
	   
     playerI.x = playerI.x + 3;  
     
    }

	if(coinGroup.isTouching(playerI))
    {

      coinGroup.destroyEach();
      score = score + 1;

    }

	if(obstacleGroup.isTouching(playerI)||opponentGroup.isTouching(playerI)||treeGroup.isTouching(playerI))
    {

          gameState = END;
	  road.velocityY = 0;
	  playerI.changeAnimation(playerII);

    }

  }
  else if(gameState === END)
  {

	road.velocityY = 0;
	playerI.changeAnimation(playerII);
	gameOver.addImage(gameOverScreen);
	cr2i.changeAnimation(cr2ii);

  }

  spawnOpponents();
  spawnPoints();
  spawnObstacles();
  spawnTrees();

}

function spawnOpponents()
{
	if(World.frameCount % 200 === 0)
	{

	  opponent = createSprite(200, 1280, 20, 20);
	  opponent.scale = 0.2;

	   r = Math.round(random(1, 2));
	  if (r == 1)
	  {
	   opponent.addAnimation("cycling", cr2i);
	   opponent.addImage(cr2ii);
	  } 
	   else
	  {
	   opponent.addAnimation("cycling", cr3i);
	   opponent.addImage("cycling", cr3ii);
	  } 
	  
	  opponent.x = Math.round(random(200, 400));
	  
	  position = Math.round;
	 
	  opponent.velocityY = (7 + (score / 4));
	  opponent.setLifetime = 100;
	  
	  opponentGroup.add(opponent);
	}
}

function spawnPoints(){

	if(frameCount % 80 === 0)
	{
	
	 var coin = createSprite(200, 1280, 20, 20);
	 coin.addImage(token);
	 coin.y =  random (200, 400);
	 coin.scale = 0.05;
	 scoin.velocityY = 4;
	
	 coin.lifetime = 300;
	 player.depth = coin.depth + 1;
	 pointGroup.add(coin);
	
	}

}

function spawnObstacles()
{
	if(World.frameCount % 300 === 0)
	{

	  obstacle = createSprite(200, 1280, 20, 20);
	  opponent.scale = 0.2;

	   r = Math.round(random(1, 2));
	  if (r == 1)
	  {
	   opponent.addAnimation("cycling", cr2i);
	   opponent.addImage(cr2ii);
	  } 
	   else
	  {
	   opponent.addAnimation("cycling", cr3i);
	   opponent.addImage("cycling", cr3ii);
	  } 
	  
	  opponent.x = Math.round(random(200, 400));
	  
	  position = Math.round;
	 
	  opponent.velocityY = (7 + (score / 4));
	  opponent.setLifetime = 100;
	  
	  opponentGroup.add(opponent);
	}
}
