

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
catImg=loadImage("Images/happyCat.jpg");
catImg1=loadImage("Images/angryCat.jpg");
}


function setup() {
  database=firebase.database();
  createCanvas(1200,800);

 

  cat=createSprite(600,600,20,20);
  cat.addImage(catImg1);
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

  feed=createButton("Feed the Cat");
  feed.position(1000,250);
  feed.mousePressed(feedCat);
}

function draw() {
  background(0,0,0);  

  /*if(keyWentDown(UP_ARROW)){
    foodS--;
    writeStock(foodS);
  }*/
currentTime=hour();
 if(lastFed===currentTime){
   console.log("HAPPY");
 } 
 else
 if(currentTime>=(lastFed+2)){
   console.log("PLAYING");
 }
 else 
 if(currentTime>=(lastFed+4)){
   console.log("ANGRY");
 }
 else
 if(currentTime>(lastFed+5)){
   console.log("DEAD");
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