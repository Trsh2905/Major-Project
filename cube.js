var song;
let particles = [];
let angle = 0;
let graphics;
let love;
let cubes = [];
let gridSize = 3;
let cubeSize = 45;
let angleX = 0;
let angleY = 0;

function preload(){
song = loadSound("data/lofi.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  for (let x = -gridSize; x <= gridSize; x += 1.5) {
    for (let y = -gridSize; y <= gridSize; y += 1.5) {
      for (let z = -gridSize; z <= gridSize; z += 1.5) {
        cubes.push(new Cube(x * cubeSize, y * cubeSize, z * cubeSize));   
      }
    }
  }
  
  getAudioContext().suspend();
  
     graphics = createGraphics(200, 200);
     graphics.background(255);
     love = createGraphics(200, 200);
     love.fill(255);
    // love.textAlign(CENTER);
     love.textSize(15);
     love.text('The silence was unbearable, ', 0, 50);
     
     love.text('but it was the only way ', 0, 70);
      love.text('to make sense of things', 0, 90);
}

function draw() {
  background(0);
  
  if(mouseIsPressed === true){
  stroke('white');
  fill('black');
 // love.text();
  }
  angleY += 0.01;
  angleX += 0.01;
  rotateX(mouseX/90);
  rotateY(mouseY/90);
  
  
//  if(mouseIsPressed == true){
  
 // }
  for (let cube of cubes) {
    cube.display(angleX, angleY);
  }


  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].isFinished()) {
      particles.splice(i, 1);
    }
  }
  if (frameCount % 5 === 0) {
    particles.push(new Particle());
  }
  
  
  for (let i = 0; i < 1; i++) {
    push(); 
    translate(0, i * -50); 
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
  texture(love);
  noStroke();
box(400);
    pop();
}

}

class Cube {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
  }
  

  display(angleX, angleY) {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    rotateX(angleX);
    rotateY(angleY);
    fill(0); // Black fill
    stroke(255); // White stroke
    box(cubeSize);
    pop();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(0, 0, 0);
    this.vel = createVector(random(-1, 1), random(-1, 1), random(-1, 1));
    this.lifespan = 255;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= 0.50;
  }

  display() {
   // noStroke();
    fill(255, this.lifespan);
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(2);
    pop();
  }

  isFinished() {
    return this.lifespan < 0;
  }
}

function mousePressed(){
if (getAudioContext().state !=='running'){
getAudioContext().resume();
song.play();
song.loop();

}
}
function keyTyped(){
//if(key === " "){
  if (song.isPlaying()){
song.stop();
}
else{
song.play();
song.loop();
}
}



function windowResized(){
resizeCanvas(windowWidth, windowHeight, WEBGL);
}
