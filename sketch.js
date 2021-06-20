
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boulderImg1, boulderImg2;
var treeImg1, treeImg2;
var trafficConeImg, manholeImg;
var cr1i, cr1ii, cr2i, cr2ii, cr3i, cr3ii, playerI, playerII;
var token;
var gameOverScreen;
var backgr, road;
var score = 0;

function preload()
{

	backgr = loadImage("Road.png");

	boulderImg1 = loadImage("boulder-1.png");
	boulderImg2 = loadImage("boulder-2.jpg");

	trafficConeImg = loadImage("obstacle1.png");
	manholeImg = loadImage("obstacle2.png");

	treeImg1 = loadImage("cartoon-tree-1.png");
	treeImg2 = loadImage("cartoon-tree-2.png");

	cr1i = loadAnimation("mainPlayer1.png", "assets/mainPlayer2.png");
	cr1ii = loadImage("mainPlayer3.png");

	cr2i = loadAnimation("opponent4.png", "assets/opponent5.png");
	cr2ii = loadImage("opponent6.png");
	
	cr3i = loadAnimation("opponent7.png", "assets/opponent8.png");
	cr3ii = loadImage("opponent9.png");
	
	gameOverScreen = loadImage("gameOver.png");

	token = loadImage("Gold-Coin-PNG.png");

	coinGroup = new Group();
	opponentGroup = new Group();
	obstacleGroup = new Group();
	tree1Group = new Group();
	tree2Group = new Group();

}

function setup()
{
	createCanvas(1520, 750);

	engine = Engine.create();
	world = engine.world;

	road = createSprite(100, 80);
	road.addImage(backgr);
	road.velocityX = -1;
	road.scale = 0.8;

	playerI = createSprite(100, 640, 50, 50);
	playerI.addAnimation("cycling", cr1i);
	playerI.scale = 0.1;


	Engine.run(engine);
  
}


function draw()
{
  rectMode(CENTER);
  background(0);

  drawSprites();

  if(gameState === PLAY)
  {

	if(road.x < 100)
    {

     road.x = width/2;
	 
    }

	if(keyDown("up_arrow"))
    {

     playerI.y = playerI.y - 5;
     
    }
    
   if(keyDown("down_arrow"))
    {
	   
     playerI.y = playerI.y + 5;  
     
    }

	if(coinGroup.isTouching(playerI))
    {

      coinGroup.destroyEach();
      score = score + 1;

    }

	if(obstacleGroup.isTouching(playerI)||opponentGroup.isTouching(playerI)||tree1Group.isTouching(playerI)||tree2Group.isTouching(playerI))
    {

      gameState = END;
	  road.velocityY = 0;
	  playerI.changeAnimation(playerII);

    }

  }

  else if(gameState === END)
  {

	road.velocityY = 0;
	gameOver.addImage(gameOverScreen);

	playerI.changeAnimation(playerII);
	cr2i.changeAnimation(cr2ii);
	cr3i.changeAnimation(cr3ii);

	playerI.velocityY = 0
	cr2i.velocityY = 0
	cr3i.velocityY = 0

	coinGroup.destroyEach();
	opponentGroup.destroyEach();
	obstacleGroup.destroyEach();
	tree1Group.destroyEach();
	tree2Group.destroyEach();
  }

  textSize(20);
  text("score: " + score, 1400, 700);
  

  spawnOpponents();
  spawnPoints();
  spawnObstacles();
  spawnTrees();

}

function spawnOpponents()
{
	if(World.frameCount % 100 === 0)
	{

	  opponent = createSprite(300, 0, 20, 20);
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
	   opponent.addImage(cr3ii);
	  } 
	  
	  opponent.x = Math.round(random(200, 400));
	  
	  position = Math.round;
	 
	  opponent.velocityY = (7 + (score / 4));
	  opponent.setLifetime = 180;
	  
	  opponentGroup.add(opponent);
	}
}

function spawnPoints(){

	if(frameCount % 80 === 0)
	{
	
	 var coin = createSprite(1200, 600, 20, 20);
	 coin.addImage(token);
	 coin.y =  random(200, 800);
	 coin.scale = 0.05;
	 coin.velocityX = -4;
	
	 coin.lifetime = 300;
	 playerI.depth = coin.depth + 1;
	 coinGroup.add(coin);
	
	}

}

function spawnObstacles()
{
	if(World.frameCount % 60 === 0)
	{

	  obstacle = createSprite(200, 0, 20, 20);
	  obstacle.scale = 0.2;
	  obstacle.velocityX = 3;
	   a = Math.round(random(1, 2, 3, 4));
	  if (a == 1)
	  {
	   obstacle.addImage(boulderImg1);
	  } 
	   else if (a == 2)
	  {
	   obstacle.addImage(boulderImg2);
	  } 
	  	else if (a == 3)
	  {
		obstacle.addImage(trafficConeImg);
	  }
	  	else 
	  {
		obstacle.addImage(manholeImg);
	  }

	  obstacle.x = Math.round(random(100, 1200));
	  
	  position = Math.round;
	 
	  obstacle.velocityY = (7 + (score / 4));
	  obstacle.setLifetime = 180;
	  
	  obstacleGroup.add(obstacle);
	}
}

function spawnTrees()
{
	if(World.frameCount % 20 === 0)
	{

	  var tree1 = createSprite(1520, 200, 20, 20);
	  tree1.addImage(treeImg1);

	  tree1.y = 200;
	 
	  tree1.velocityX = -5;
	  tree1.setLifetime = 304;
	  
	  tree1Group.add(tree1);
	}

	if(World.frameCount % 20 === 0)
	{

	  var tree2 = createSprite(1520, 550, 20, 20);
	  tree2.addImage(treeImg1);

	  tree2.y = 200;
	 
	  tree2.velocityX = -5;
	  tree2.setLifetime = 304;
	  
	  tree1Group.add(tree2);
	}

}
