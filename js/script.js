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
var textHumanHP = 0;
var textSnakeHP;
var textBottleHP;
var staminaPoints = 100;
var initialCountDown = new Date().getTime();
var currentTime;
var isTimeCaptured = false;
var playerTurnAttack = true;
var enemyTurnAttack = false;
function GameObject(name, img, health) {
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
    
}

function onPageLoad() {
    // Reading File from a Server
  
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        //document.getElementById("NPC").innerHTML = data[0];
        textSnakeHP = data.snakeHP;
        console.log(textSnakeHP);
        textHumanHP = data.humanHP;
        console.log(textHumanHP);
      }
    };
    xmlhttp.open("GET", "./data/level.json", true);
    xmlhttp.send();  
    updateScore();
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
function drawStaminahbar() {
    var width = 1030;
    var height = 20;
    var max = 100;
    var val = staminaPoints;
  
    // Draw the background
    context.fillStyle = "#000000";
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(125,10, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FF00";

    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(125,10, fillVal * width, height);
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

function drawHealthbarPlayer() {
    var width = 100;
    var height = 20;
    var max = 100;
    var val = gameobjects[0].health;
  
    // Draw the background
    context.fillStyle = "#000000";
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(gameobjects[0].x + 50,gameobjects[0].y + 210, width, height);
  
    // Draw the fill
    context.fillStyle = "#00FF00";
    if(gameobjects[0].health < 50 )
    {
        context.fillStyle = "#FFFF00";
    }
    if(gameobjects[0].health < 25 )
    {
        context.fillStyle = "#FF0000";
    }

    var fillVal = Math.min(Math.max(val / max, 0), 1);
    context.fillRect(gameobjects[0].x + 50,gameobjects[0].y + 210, fillVal * width, height);
  }
  


// Sprite for player 
var sprite = new Image();
sprite.src = "./img/lizard.png"; // 


// Sprite for enemt
var enemySprite = new Image();
enemySprite.src = "./img/2.png"; // 

var projectileSprite = new Image();
projectileSprite.src = "./img/throw.png";

// background set up
var backGround = new Image();
backGround.src = "./img/space.jpg";

var backGround2 = new Image();
backGround2.src ="./img/jugnle.jpg";

var wonImage = new Image();
wonImage.src = "./img/won.png";

var lostImage = new Image();
lostImage.src = "./img/lost.png";

var staminaWordImage = new Image();
staminaWordImage.src = "./img/stamina.png";




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

gameobjects[1].x =800;//npc
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
        drawHealthbarPlayer();
        drawStaminahbar();
        if(gameobjects[0].health > 1)
        {
        context.drawImage(gameobjects[0].img, (gameobjects[0].img.width / 7) * currentFrame, 0, 90, 90,  gameobjects[0].x,  gameobjects[0].y, 200, 200);
        }
        if(gameobjects[1].health > 1)
        {
        context.drawImage(gameobjects[1].img, (gameobjects[1].img.width / 7) * currentFrame, 0, 90, 90, gameobjects[1].x,  gameobjects[1].y, 200, 200);
        }

        if(gameobjects[1].health <= 0)
        {
            context.drawImage(wonImage, 420, 220, 300, 300);

        }

        if(gameobjects[0].health <= 0|| staminaPoints <=1)
        {
            context.drawImage(lostImage, 420, 220, 300, 300);

        }

        context.drawImage(staminaWordImage, 0, 0,120, 40);



    }
    if(enemyTurnAttack == true && gameobjects[1].health > 0)
    {
        console.log("numbers working1")
        context.fillStyle = "#FFFFFF";
        context.textAlign = "center";
        context.font = "40px Arial";
        context.fillText("ENEMYS TURN", 590,300 );
        context.fillText(Math.trunc(3 - ((currentTime - initialCountDown) / 1000)), 590, 350);
        console.log("numbers working2")
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
        dies();
        drawHealthbar();
        backgroundChange();
        enemyStrongAttack();
        enemyFastAttack();

  
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

function dies()
{
    if(gameobjects[1].health <= 0 )
    {

        //if(gameobjects[0].x === gameobjects[1].x && gameobjects[0].y === gameobjects[1].y)
        //if(collisionX < 60 && collisionY <100)
       // {
      //  
        //}

         gameobjects[1].x =16000;//npc
         gameobjects[1].y =4000;
        
    }

    if(gameobjects[0].health <= 0 )
    {
         gameobjects[0].x =16000;//npc
         gameobjects[0].y =40000;
        
    }
}

// Update the player score
function updateScore() 
{
    var current_score = localStorage.getItem('score');

    if (isNaN(current_score)) {
      localStorage.setItem('score', 0);
      document.getElementById("SCORE").innerHTML = " [ " + current_score + " ] ";
    } else {
      localStorage.setItem('score', parseInt(current_score) + 1);
      document.getElementById("SCORE").innerHTML = " [ " + current_score + " ] ";
    }
}

 function buttonOnClickStrong()
{
    if(staminaPoints >=13 && playerTurnAttack == true)
    {
        if(gameobjects[1].health >0)
        {
        var random = 0;
        // gamerInput = new GamerInput("Right");
        gameobjects[1].health = gameobjects[1].health - 15;
        staminaPoints = staminaPoints -13;
        attackSound.volume = 0.1;
        attackSound.play();
        updateScore();
        console.log("MINUS 15 HP NPC");
        playerTurnAttack = false;
        enemyTurnAttack = true;
        random = Math.floor(Math.random() * 10)
        if(random >= 0 && random <=5)
        {
            enemyFastAttack();
        }
        else if(random > 6 && random <=7)
        {
            enemyStrongAttack();
        }
        else if(random > 7 && random <=9 && gameobjects[1].health < 70)
        {
            enemyHealAttack();
        }
        else{
            random = Math.floor(Math.random() * 10)

            if(random >= 0 && random <=7)
            {
                enemyFastAttack();
            }
            if(random >7 && random <=9)
            {
                enemyStrongAttack();
            }
        }
        random = 0;
    }
}


}

function buttonOnClickFast()
{
    if(staminaPoints >=1 && playerTurnAttack == true)
    {
        if(gameobjects[1].health >0)
        {
        var random = 0;
        // gamerInput = new GamerInput("Right");
        gameobjects[1].health = gameobjects[1].health - 5;
        staminaPoints = staminaPoints -5;
        attackSound.volume = 0.1;
        attackSound.play();
        updateScore();
        console.log("MINUS 15 HP NPC");
        playerTurnAttack = false;
        enemyTurnAttack = true;


        random = Math.floor(Math.random() * 10)
        if(random >= 0 && random <=5)
        {
            enemyFastAttack();
        }
        else if(random > 6 && random <=7)
        {
            enemyStrongAttack();
        }
        else if(random > 7 && random <=9 && gameobjects[1].health < 70)
        {
            enemyHealAttack();
        }
        else{
            random = Math.floor(Math.random() * 10)

            if(random >= 0 && random <=7)
            {
                enemyFastAttack();
            }
            if(random >7 && random <=9)
            {
                enemyStrongAttack();
            }
        }
        random = 0;
        }
    }

}

function buttonOnClickDefense()
{
//set up a defense 

}

function buttonOnClickHeal()
{
    if(staminaPoints >=20 && playerTurnAttack == true)
    {
        if( gameobjects[0].health < 90)
        {
        playerTurnAttack = false;
        enemyTurnAttack = true;

        staminaPoints = staminaPoints - 20;
        gameobjects[0].health = gameobjects[0].health + 25;
            
        }
    }
}



function enemyFastAttack()
{
    if(enemyTurnAttack == true && gameobjects[1].health >0)
    {
        console.log("1st part");

        if(isTimeCaptured == false)
        {
            initialCountDown = new Date().getTime();
            isTimeCaptured = true;
            console.log("2nd part");

        }

        currentTime = new Date().getTime();
        console.log("3rd part");

        
        if(currentTime-initialCountDown >=2000)
        {
            gameobjects[0].health = gameobjects[0].health - 10;
            console.log("SPIDER USED FAST ATTACK");
            console.log(gameobjects[0].health);
            playerTurnAttack = true;
            enemyTurnAttack = false;
            initialCountDown = currentTime;
            isTimeCaptured = false;
        }
    }
    
}

function enemyStrongAttack()
{
    if(enemyTurnAttack == true && gameobjects[1].health >0)
    {
        console.log("1st part");

        if(isTimeCaptured == false)
        {
            initialCountDown = new Date().getTime();
            isTimeCaptured = true;
            console.log("2nd part");

        }

        currentTime = new Date().getTime();
        console.log("3rd part");
        //console.log("time = " + (current-initial));

        if(currentTime-initialCountDown >=2000)
        {
            gameobjects[0].health = gameobjects[0].health - 15;
            console.log("SPIDER USED STRONG ATTACK");
            console.log(gameobjects[0].health);
            playerTurnAttack = true;
            enemyTurnAttack = false;
            initialCountDown = currentTime;
            isTimeCaptured = false;

        }
    }
}

function enemyHealAttack()
{
    if(enemyTurnAttack == true && gameobjects[1].health >0)
    {
        if(isTimeCaptured == false)
        {
            initialCountDown = new Date().getTime();
            isTimeCaptured = true;
        }

        currentTime = new Date().getTime();

        if(currentTime-initialCountDown >=2000)
        {
            gameobjects[1].health = gameobjects[1].health + 20;
            console.log("SPIDER USED Healing");
            playerTurnAttack = true;
            enemyTurnAttack = false;
            initialCountDown = currentTime;
            isTimeCaptured = false;

        }
    }

}



function gameloop() 
{
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
