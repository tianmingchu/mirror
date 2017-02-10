/*
Lines 20-27 code (replaces a certain color with another) copied from https://gist.github.com/nataliefreed/4b958ba0a840a2ba827097ce8b7b98b3 by Natalie Freed
*/

var capture;
var ParamSlider;
var RedSlider;
var GreenSlider;
var BlueSlider;

function setup() {
  createCanvas(640, 479);
  capture = createCapture(VIDEO);


  ParamSlider = createSlider(0, 765, 100); //if colors below this amount are present, then change them
  ParamSlider.position(10, 10);
  ParamSlider.style('width', '100px');

  RedSlider = createSlider(0, 255, 102); //Red value slider
  RedSlider.position(10, 30);
  RedSlider.style('width', '100px');

  GreenSlider = createSlider(0, 255, 204); //Green value slider
  GreenSlider.position(10, 50);
  GreenSlider.style('width', '100px');

  BlueSlider = createSlider(0, 255, 204); //Blue value slider
  BlueSlider.position(10, 70);
  BlueSlider.style('width', '100px');
}

function draw() {
  push(); //doesn't work unless pushed and popped
  translate(capture.width, 0);
  scale(-1, 1); //flips the capture horizontally
  image(capture, 320, 0, -640, 479); //reversed capture (right half)
  pop();
  image(capture, -320, 0, 640, 479); //normal capture (left half)

  loadPixels(); //to change colors in the capture
  for (var i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 2] + pixels[i] + pixels[i + 1] < ParamSlider.value()) { //if amount of slider value in a pixel is high enough, add slider value highlights
      pixels[i] = RedSlider.value(); //red value (R,G,B)
      pixels[i + 1] = GreenSlider.value(); //green value (R,G,B)
      pixels[i + 2] = BlueSlider.value(); //blue value (R,G,B)
    }
  }
  updatePixels();

  textSize(10); //label the sliders
  text("Parameters", 115, 25);
  text("Amount of Red", 115, 45);
  text("Amount of Green", 115, 65);
  text("Amount of Blue", 115, 85);
  fill(0);
}