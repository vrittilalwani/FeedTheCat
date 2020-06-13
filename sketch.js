
var gameState="hungry";
var cat,catImg,catImg1, database;
var food, foodImage;
var credit,creditRem;
var foodS,foodStock;
var buyFood;
var fedTime,lastFed,currentTime;
var feed;
var score,credit1;
var h;


function preload(){
catImg=loadImage("happyCat.jpg");
catImg1=loadImage("angryCat.jpg");
}


function setup() {
  database=firebase.database();
  createCanvas(1200,800);

 

  cat=createSprite(600,600,20,20);
 
  cat.scale=0.1;
cat.shapeColor="red";

score = new Score();
credit1 = new Credit();

 foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  credit=database.ref('Credit');
  credit.on("value",function(data){
    creditRem=data.val();
  });

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  buyFood=createButton("Buy Food");
  buyFood.position(1000,200);
  buyFood.mousePressed(buyaFood);

  Time=createButton("Time");
  Time.position(100,100);
 

  feed=createButton("Feed the Cat");
  feed.position(1000,250);
  feed.mousePressed(feedCat);
}
function getTime(){
  var h=hour();
  textSize(30);
  text(h,100,200);
  console.log("Time "+h);
}
function draw() {
  background("white");  

  if(gameState==="hungry"){
    cat.addImage(catImg1);
    text("I AM HUNGRY",200,200);
  }
  
  Time.mousePressed(getTime);
  /*if(keyWentDown(UP_ARROW)){
    foodS--;
    writeStock(foodS);
  }*/
currentTime=hour();
 if(lastFed===currentTime){
   text("Thank You", 200,400);
   cat.addImage(catImg);
   gameState="playing";
 } 
 else
 if(currentTime>(lastFed+2) && currentTime<(lastFed+3)){
   text("Sleeping",200,400);
   gameState="sleeping";
 }
 else 
 if(currentTime>(lastFed+3) && currentTime<(lastFed+4)){
   gameState="hungry";
 }
 else
 if(currentTime>(lastFed+5)){
   text("GoodBye",200,400);
   gameState="end";
 }
  if(gameState==="end"){
    buyFood.hide();
    feed.hide();
  }
 score.display();
 credit1.display();

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  //foodStock=Food;

}
function buyaFood(){
  creditRem=creditRem-5;
  foodS++;
  database.ref('/').update({
    Credit:creditRem,
    Food:foodS
  })
}

function feedCat(){
  h=hour();
  console.log(h);
  cat.addImage(catImg);
  foodS--;
  database.ref('/').update({
    Food:foodS,
    FeedTime:h
  })
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}
