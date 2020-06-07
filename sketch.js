

var cat,catImg, database;
var food, foodImage;
var credit,creditRem;
var foodS,foodStock;
var buyFood;
var feed;
function preload(){
catImg=loadImage("Images/happycat.jpg");
foodImage=loadImage("Images/milk.png");
}


function setup() {
  database=firebase.database();
  createCanvas(1200,800);

  food=createSprite(200,200,20,40);
  food.addImage(foodImage)
  food.scale=0.2;

  cat=createSprite(600,600,20,20);
  cat.addImage(catImg);
  cat.scale=0.1;
cat.shapeColor="red";

 foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  credit=database.ref('Credit');
  credit.on("value",function(data){
    creditRem=data.val();
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
  
  textSize(20);
  stroke("white");
  text("Milk bottles in Stock "+foodS,500,100);
  text("Your Credit Score "+creditRem,500,140);
 console.log("Foods "+foodS);
 console.log("Credit "+creditRem);

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
  foodS--;
  database.ref('/').update({
    Food:foodS
  })
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}