var bird;
var pipes = [];
var score = 0;
var mic;
var sliderTop;
var sliderBottom;
var clapping = false;


function setup() {
  createCanvas(500, 600);
  mic = new p5.AudioIn();
  mic.start();
  bird = new Bird();
  pipes.push(new Pipe());
  sliderTop = createSlider(0, 1, 0.3, 0.1);
  sliderBottom = createSlider(0, 1, 0.1, 0.1);
}

function draw() {
  background(0);

  var vol = mic.getLevel();
  fill("lime");
  stroke(255, 0, 250);
  strokeWeight(6);
  textSize(30);
  text('score : ' + score, 360, 40);



  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();

    if (pipes[i].hits(bird)) {
      console.log("HIT");
      score = 0;

    }

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);

    }
  }

  bird.update();
  bird.show();

  if (frameCount % 130 == 0) {
    score = score + 5;
    pipes.push(new Pipe());
  }


  var thresholdTop = sliderTop.value();
  var thresholdBottom = sliderBottom.value();

  if (vol > thresholdTop && !clapping) {
    bird.up();
    clapping = true;
  }

  if (vol > thresholdBottom) {
    clapping = false;
  }

  fill(0, 255, 0);
  //console.log(vol);
  var y = map(vol, 0, 1, height, 0);
  rect(width - 50, y, 50, height - y);

  var ty = map(thresholdTop, 0, 1, height, 0);
  stroke(255, 0, 0);
  strokeWeight(4);
  line(width - 50, ty, width, ty);

  var by = map(thresholdBottom, 0, 1, height, 0);
  stroke(0, 0, 255);
  strokeWeight(4);
  line(width - 50, by, width, by);

  if (score >= 50) {
    fill("orange");
    textSize(50);
    text("YOU WIN !!", 150, 300);


  }
  if (score > 55) {
    score = 0;
  }

  if (keyCode === ENTER) {
    score = 0;
  }

}

function keyPressed() {
  if (key == ' ') {
    bird.up();
    //console.log("space");
  }


}