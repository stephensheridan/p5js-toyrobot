let tx = 0;
let ty = 0;
let rx = 0;
let ry = 0;
let ox = 55;
let oy = 455;

let y = 100;
let direction = "NONE";
let currentDirection = "EAST";

let collision = false;

let commandIndex = 0;

let commandList = [];

function setup(){
  rx = ox;
  ry = oy;
  // createCanvas must be the first statement
  let c = createCanvas(510, 510);
  // c.parent('sketch-holder');
  stroke(0); // Set line drawing color to white
  frameRate(4);

  // input = createInput();
  // input.position(550, 150);
  
  // let h5 = createElement('h5', 'p5*js');
  // // Set the element's style and position.
  // h5.style('color', 'deeppink');
  // h5.position(550, 150);
  let c1 = "PLACE 2 2 NORTH\nMOVE\nRIGHT\nMOVE\nMOVE\nRIGHT\nMOVE\nMOVE\nMOVE\nRIGHT\nMOVE\nMOVE\nRIGHT\nMOVE\nMOVE\nREPORT";
  let commands = createElement('textarea', c1);
  commands.size(200, 400);
  commands.style('color', 'deeppink');
  commands.style('resize', 'none');
  commands.style('border', '4px solid black');
  commands.style('font-size', '20px');
  commands.position(550, 150);

  // let btnWest = createButton('West');
  // btnWest.position(550, 560);
  // btnWest.mousePressed(goWest);

  // let btnNorth = createButton('North');
  // btnNorth.position(600, 560);
  // btnNorth.mousePressed(goNorth);

  // let btnSouth = createButton('South');
  // btnSouth.position(650, 560);
  // btnSouth.mousePressed(goSouth);

  // let btnEast = createButton('East');
  // btnEast.position(700, 560);
  // btnEast.mousePressed(goEast);

  let btnRun = createButton('Run');
  btnRun.position(750, 560);
  btnRun.mousePressed(runCommands);
}

function runCommands(){
    commandList = [];
    commandIndex = 0;
    let commands = document.querySelector('textarea').value;
    let commandArray = commands.split('\n');
    for(let i = 0; i < commandArray.length; i++){
      commandList.push(commandArray[i]);
    }  
}

function goWest(){
    moveWest();
}
function goEast(){
    moveEast();
}
function goSouth(){
    moveSouth();
}
function goNorth(){
    moveNorth();
}

function drawGrid(){
  // Draw the boundary
  rect(5, 5, 500, 500);
  // Draw the grid
  for(let i = 1; i < 5; i++){
    line((100 * i)+5, 5, (100 * i)+5, 505);
    line(5, (100 * i) + 5, 505, (100 * i) + 5);
  }
}

function drawRobot(){
  fill(0);
  circle(rx,ry,50);
  fill(255);
  strokeWeight(8);
  if (currentDirection == "EAST")
    line(rx,ry, rx + 35, ry);
  else if (currentDirection == "WEST")
    line(rx,ry, rx - 35, ry);
  else if (currentDirection == "NORTH")
    line(rx,ry, rx, ry - 35);
  else if (currentDirection == "SOUTH")
    line(rx,ry, rx, ry + 35);
  strokeWeight(4);
}

function draw(){
    drawGrid();
    drawRobot();
    if (commandIndex === commandList.length) {  
        commandIndex = 0;
        commandList = [];  
    }
    else if (commandIndex < commandList.length){  
        let command  = commandList[commandIndex];
        if (command.startsWith("PLACE")){
            let placeArray = command.split(" ");

            let x = parseInt(placeArray[1]);
            let y = parseInt(placeArray[2]);
            let direction = placeArray[3];
            // rx = ox;
            // ry = oy;
            rx = ox + (x * 100);
            ry = oy - (y * 100);
            currentDirection = direction;
        }
        else if (command === "LEFT"){
            if (currentDirection === "NORTH")
                currentDirection = "WEST";
            else if (currentDirection === "SOUTH")
                currentDirection = "EAST";
            else if (currentDirection === "EAST")
                currentDirection = "NORTH";
            else if (currentDirection === "WEST")
                currentDirection = "SOUTH";
        }
        else if (command === "RIGHT"){
            if (currentDirection === "NORTH")
                currentDirection = "EAST";
            else if (currentDirection === "SOUTH")
                currentDirection = "WEST";
            else if (currentDirection === "EAST")
                currentDirection = "SOUTH";
            else if (currentDirection === "WEST")
                currentDirection = "NORTH";
        }
        else if (command === "MOVE"){
            if (currentDirection === "NORTH")
                moveNorth();
            else if (currentDirection === "SOUTH")
                moveSouth();
            else if (currentDirection === "EAST")
                moveEast();
            else if (currentDirection === "WEST")
                moveWest();
        }
        else if (command === "REPORT"){
            console.log(rx, ry, currentDirection);
        }
        commandIndex++;
    }
    
    
    if (collision){
        // Flash the grid red
        stroke(color(255, 0, 0));
        drawGrid();
        stroke(0);
        drawRobot();
        collision = false;
    }
   direction = "NONE";
}
function moveWest(){
  currentDirection = "WEST";
  if (rx - 100 < 5)
    collision = true;
  else
    rx = rx - 100;
}
function moveEast(){
  currentDirection = "EAST";
  if ( rx + 100 > 505)
    collision = true;
  else
    rx = rx + 100;
}
function moveNorth(){
  currentDirection = "NORTH";  
  if (ry - 100 < 5)
    collision = true;
  else
    ry = ry - 100;
}
function moveSouth(){
  currentDirection = "SOUTH";
  if (ry + 100 > 505)
    collision = true;
  else
    ry = ry + 100;
}

// function keyPressed(){
//     console.log(keyCode);
//     if (keyCode === LEFT_ARROW){
//         direction = "WEST";
//     }
//     else if (keyCode === RIGHT_ARROW){
//         direction = "EAST";
//     }
//     else if (keyCode === UP_ARROW){
//         direction = "NORTH";
//     }
//     else if (keyCode === DOWN_ARROW){
//         direction = "SOUTH";
//     }
//     else{
//         direction = "INVALID";
//     }
//     currentDirection = direction;
// }

