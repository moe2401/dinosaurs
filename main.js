var speed;
var y;
var yVelocity;
var onGrpund;

var score;
var highscore;

var horizon;
var obstacles = [];

function setup(){
    createCanvas(600, 200);
    textAlign(CENTER);
    horizon = height - 40;
    y = 20;
    score = heighscore = yVelocity = 0;
    speed = 6;
    onGround = false; 
}

function draw(){
    background(51);

    //draw horizon
    stroke(255);
    line(0, horizon, width, horizon);
    fill("#999");
    ellipse(40, y, 40);

    if(frameCount % 120 === 0){
        speed *= 1.05;
    }
    if(frameCount % 30 === 0){
        var n = noise(frameCount);
        if(n > 0.5){
            newObstacles(n);
        }
    }

    score++;
    textSize(20);
    text("Score:" + score, width / 2, 30);

    upDateObstacles();
    handleTRex();
}

function upDateObstacles(){
    for(var i = obstacles.length - 1; i >= 0; i--){
        obstacles[i].x -= speed;
        var x = obstacles[i].x;
        var size = obstacles[i].size;
        var s2 = size / 2;
        if(x > -30){

            //if it's on screen
            fill(obstacles[i].color);
            rect(x, horizon - size, size, size);
            var x1 = x + s2;
            var y1 = horizon - s2;
            if(dist(x1, y1, 40, y) < s2 + 20){

                //collision
                textAlign(CENTER);
                textSize(40);
                text("Game Over", width / 2, height / 2);
                textSize(20);
                text("Press F5 to restart", width / 2, height / 2 + 40);
                noLoop();

                //restart();
            }
        }
        else{
            //delete from array
            obstacles.splice(i, 1);
        }
    }
}

function restart()
{
    if(mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)) {
        draw();
    }
}

function obstacles(r, c){
    this.x = 620;
    this.size = r;
    this.color = c;
}

function newObstacles(n){
    var obs = newObstacles(n * 50, color(random(255), random(255), random(255)));

    obstacles.push(obs);
}

function handleTRex(){
    if(y + 20 + yVelocity < horizon){
        yVelocity += map(frameCount, 0, 3600, 0.7, 2);
        onGround = false;
    }
    else{
        yVelocity = 0;
        onGround = true;
    }
    if(mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32)){
        if(onGround){
            yVelocity -= map(frameCount, 0, 3600, 9, 15);
            onGround = false;
        }
    }
    y += yVelocity;
}