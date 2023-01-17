const COLORS = [
  "255,108,80",
  "5,117,18",
  "15,88,219",
  "40,201,59",
  "21,232,211",
  "242,113,0",
];
const BUBBLE_DENSITY = 1500;
function generateDecimalBetween(left, right) {
  return (Math.random() * (left - right) + right).toFixed(2);
}
class Bubble {
  constructor(canvas) {
    this.canvas = canvas;
    this.getCanvasSize();
    this.init();
  }
  getCanvasSize() {
    this.canvasWidth = this.canvas.clientWidth;
    this.canvasHeight = this.canvas.clientHeight;
  }

  init() {
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.size = generateDecimalBetween(0.2, 0.8);
    this.alpha = generateDecimalBetween(0.5, 1);
    this.translateX = generateDecimalBetween(0, this.canvasWidth);
    this.translateY = generateDecimalBetween(0, this.canvasHeight);
    this.velocity = generateDecimalBetween(40, 90);
    this.movementX = generateDecimalBetween(-2, 2) / this.velocity;
    this.movementY = generateDecimalBetween(1, 20) / this.velocity;
  }

  move() {
    this.translateX = this.translateX - this.movementX;
    this.translateY = this.translateY - this.movementY;
    if (
      this.translateY < 0 ||
      this.translateX < 0 ||
      this.translateX > this.canvasWidth
    ) {
      this.init();
      this.translateY = this.canvasHeight;
    }
  }
}
class CanvasBackground {
  constructor(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.dpr = window.devicePixelRatio;
  }
  start() {
    this.canvasSize();
    this.generateBubbles();
    this.animate();
  }
  canvasSize() {
    this.width = this.canvas.offsetWidth * this.dpr;
    this.height = this.canvas.offsetHeight * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }
  generateBubbles() {
    this.bubblesList = [];
    for (let i = 0; i < BUBBLE_DENSITY; i++) {
      this.bubblesList.push(new Bubble(this.canvas));
    }
  }
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    this.bubblesList.forEach((bubble) => {
      bubble.move();
      this.ctx.translate(bubble.translateX, bubble.translateY);
      this.ctx.beginPath();
      this.ctx.arc(0, 0, bubble.size, 0, 2 * Math.PI);
      this.ctx.fillStyle = "rgba(" + bubble.color + "," + bubble.alpha + ")";
      this.ctx.fill();
      //this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (this.width / this.height > 1) {
        this.dprX = this.dpr;
        this.dprY = this.dpr;
      } else {
        this.dprX = this.dpr;
        this.dprY = this.dpr / this.dpr;
      }
      this.ctx.setTransform(this.dprX, 0, 0, this.dprY, 0, 0);
    });
    requestAnimationFrame(this.animate.bind(this));
  }
}
const orbCanvas = new CanvasBackground("orb-canvas");
orbCanvas.start();
