// Each time this function is called a GameObject
// is create based on the arguments
// In JavaScript you can consider everything an Object
// including functions
// Name: David Jalisevs 
// ID: C00239534
// get a handle to the canvas context
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var attackSound;

function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
    
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function drawHealthbar() {
    var width = 100;
    var height = 20;
    var max = 100;
    var val = gameobjects[1].health;
  
    // Draw the background
    context.fillStyle = "#000000";
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(gameobjects[1].x + 50,gameobjects[1].y + 210, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FF00";
    if(gameobjects[1].health < 50 )
    {
        context.fillStyle = "#FFFF00";
    }
    if(gameobjects[1].health < 25 )
    {
        context.fillStyle = "#FF0000";
    }
    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(gameobjects[1].x + 50,gameobjects[1].y + 210, fillVal * width, height);

    
  }


// Sprite for player 
var sprite = new Image();
sprite.src = "./img/snake6.png"; // 


// Sprite for enemt
var enemySprite = new Image();
enemySprite.src = "./img/11.png"; // 

var projectileSprite = new Image();
projectileSprite.src = "./img/throw.png";

// background set up
var backGround = new Image();
backGround.src = "./img/space.jpg";

var backGround2 = new Image();
backGround2.src ="./img/jugnle.jpg"

attackSound = new sound("sattack.mp3");

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) {
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", sprite, 100);

var enemy  = new GameObject("Enemy",enemySprite,100 );

var projectile = new GameObject("Projectile",projectileSprite,100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, enemy, projectile];


gameobjects[0].x =100;//player
gameobjects[0].y =400;
gameobjects[0].health = 100;

gameobjects[1].x =1600;//npc
gameobjects[1].y =400;
gameobjects[1].health = 100;

gameobjects[2].x = gameobjects[0].x; // projectile 
gameobjects[2].y = gameobjects[0].y; // projectile


// Process keyboard input event
function input(event) {
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

    if (event.type === "keydown") {
        switch (event.keyCode) {
            case 37:
            gamerInput = new GamerInput("Left");
                break; //Left key
                case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
                case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
                case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
                case 32:
                gamerInput = new GamerInput ("Space");
                break;
                default:
                gamerInput = new GamerInput("None"); //No Input
            }
        } else {
        gamerInput = new GamerInput("None"); //No Input
    }
    console.log("Gamer Input :" + gamerInput.action);
}

// Total Frames
var frames = 4;

// Current Frame
var currentFrame = 0;

// X axis t Draw from
var sprite_x = 0;

// Initial time set
var initial = new Date().getTime();
var current; // current time

function animate() {
    current = new Date().getTime(); // update current
    if (current - initial >= 300) { // check is greater that 500 ms
        currentFrame = (currentFrame + 1) % frames; // update frame
        initial = current; // reset initial
    }

    // Draw sprite frame
    // Draw background
   // context.drawImage(backGround, x, y, 800, 800, 0, 0, 1900, 1200);
   context.clearRect(0, 0, canvas.width, canvas.height);

   for (i = 0; i < gameobjects.length; i++) 
    {

        context.drawImage(backGround, 0,  0, 1920, 1200);
        backgroundChange();
        drawHealthbar();


        context.drawImage(gameobjects[0].img, (gameobjects[0].img.width / frames) * currentFrame, 0, 210, 50,  gameobjects[0].x,  gameobjects[0].y, 200, 200);
        if(gameobjects[1].health >= 1)
        {
        context.drawImage(gameobjects[1].img, (gameobjects[1].img.width / 7) * currentFrame, 0, 90, 90, gameobjects[1].x,  gameobjects[1].y, 200, 200);
        }

        context.drawImage(gameobjects[2].img, gameobjects[2].x,  gameobjects[2].y, 40, 40); 
    }
}


function update() {
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++)
    {
        if (gamerInput.action === "Up") 
        {
            gameobjects[0].y -= 5;
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  at Y: "  + gameobjects[i].y);
        }

        if (gamerInput.action === "Left") 
        {
            gameobjects[0].x -= 5;
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  at Y: "  + gameobjects[i].y);
        }

        if (gamerInput.action === "Right") 
        {
            gameobjects[0].x += 5;
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  at Y: "  + gameobjects[i].y);
        }

        if (gamerInput.action === "Down") 
        {
            gameobjects[0].y += 5;
            console.log(gameobjects[i].name + " at X: " + gameobjects[i].x + "  at Y: "  + gameobjects[i].y);
        }

        if (gamerInput.action === "Space") 
        {
            gameobjects[2].x += 5;
            console.log(gameobjects[2].name + " at X: " + gameobjects[2].x + "  at Y: "  + gameobjects[2].y);
        } 
    }

        collision();
        drawHealthbar();
        backgroundChange();
        
  if(gameobjects[0].x > gameobjects[1].x)
  {
    gameobjects[1].x +=1;
  }


  if(gameobjects[0].x < gameobjects[1].x)
  {
    gameobjects[1].x -=1;
  }


  if(gameobjects[0].y > gameobjects[1].y)
  {
    gameobjects[1].y +=1;
  }


  if(gameobjects[0].y < gameobjects[1].y)
  {
    gameobjects[1].y -=1;
  }



}



function backgroundChange() 
{
    if (active.checked == true) 
    {
        context.drawImage(backGround2, 0,  0, 1920, 1200);

    } 

    else 
    {
        context.drawImage(backGround, 0,  0, 1920, 1200);

    } 
}



// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() {
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
    for (i = 0; i < gameobjects.length; i++) 
    {
        if (gameobjects[i].health > 0) 
        {
         console.log("Image :" + gameobjects[i].img);
         animate();
        }
    }
}

function collision()
{
    var collisionX = gameobjects[1].x - gameobjects[0].x;
    var collisionY = gameobjects[1].y - gameobjects[0].y;

    if(gameobjects[1].health >=1)
    {
        if(gameobjects[0].x === gameobjects[1].x && gameobjects[0].y === gameobjects[1].y)
        //if(collisionX < 60 && collisionY <100)
        {

            if(gameobjects[1].health >=1) // here you kill NPC
            {
                gameobjects[1].health = gameobjects[1].health - 1;
                console.log("MINUS 1 HP NPC");
                attackSound.volume = 0.1;
                attackSound.play();
            }

            console.log("collided");
        }
    }
}





 function buttonOnClickRight()
 {
                // gamerInput = new GamerInput("Right");
   gameobjects[0].x +=100;
 }

 function buttonOnClickUp()
 {
    gameobjects[0].y -= 100;
 }

 function buttonOnClickLeft()
 {
    gameobjects[0].x -= 100;
 }

 function buttonOnClickDown()
 {
    gameobjects[0].y += 100;
 }

function gameloop() {
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);
window.addEventListener('keyright', input);
window.addEventListener('keyleft', input);
window.addEventListener('keyspace', input);