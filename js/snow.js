// массив цветов снежинки
const colorSnowflake = [
  "0, 255, 255",
  "175, 238, 238",
  "64, 224, 208",
  "0, 206, 209",
  "70, 130, 180",
  "135, 206, 250",
  "0, 191, 255",
  "30, 144, 255",
  "100, 149, 237",
  "65, 105, 225",
  "123, 104, 238",
  "250, 250, 250",
  "176, 196, 222",
];
// массив основных углов лучей снежинок
const arrayAngle = [0, 45, 90, 135, 180, 225, 270, 315, 10];
//количество снежинок
const SNOW_DENSITY = 100;
// функция возврата случайного числа
function genMinMax(min, max) {
  return +(Math.random() * (min - max) + max).toFixed(0);
}
// наклон снежинки angel + перевод в градусы
function angle(angleDeg, angel) {
  return (angel + angleDeg * Math.PI) / 180;
}
// возврат косинуса и синуса для начертания косых линий от точки x , y
function xCos(px, nx, lenRay, angel) {
  return px + Math.cos(angle(nx, angel)) * lenRay;
}
function ySin(py, ny, lenRay, angel) {
  return py + Math.sin(angle(ny, angel)) * lenRay;
}

class SnowFlake {
  constructor(canvasSnow) {
    this.canvasSnow = canvasSnow;
    this.resize();
    this.init();
  }
  init() {
    //цвет снежинки
    this.colSnow = colorSnowflake[genMinMax(0, colorSnowflake.length - 1)];
    //длина луча снежинки от середины
    this.lenRay = genMinMax(5, 15);
    //толщина лучей снежинки
    this.weightRay = genMinMax(1, 2);
    //поворот снежинки
    this.angel = genMinMax(0, 50);
    //задаем положение снежинки
    this.px = genMinMax(this.lenRay, this.canvasSnow.width - this.lenRay);
    this.py = genMinMax(this.lenRay, this.canvasSnow.height - this.lenRay);

    this.velocity = genMinMax(3, 10);
    this.movementX = genMinMax(-4, 10) / this.velocity;
    this.movementY = genMinMax(1, 20) / this.velocity;
  }
  resize() {
    // получаем размер HTML-элемента canvas
    let disWidth = this.canvasSnow.clientWidth;
    let disHeight = this.canvasSnow.clientHeight;

    // проверяем, отличается ли размер canvas
    if (
      this.canvasSnow.width != disWidth ||
      this.canvasSnow.height != disHeight
    ) {
      // подгоняем размер буфера отрисовки под размер HTML-элемента
      this.canvasSnow.width = disWidth;
      this.canvasSnow.height = disHeight;
    }
  }
  move() {
    this.px = this.px + this.movementX;
    this.py = this.py + this.movementY;

    if (
      this.py > this.canvasSnow.height ||
      this.px < 0 ||
      this.px > this.canvasSnow.width
    ) {
      this.init();
      this.py = 0;
    }
  }
}
class CanvasAnimatedSnow {
  constructor(id, outDiv) {
    this.canvasSnow = document.getElementById(id);
    this.form = document.getElementById(outDiv);
    this.ctx = this.canvasSnow.getContext("2d");
  }

  start() {
    this.canvasSize();
    this.generateBubbles();
    this.animate();
  }
  canvasSize() {
    // получаем размер HTML-элемента canvas
    let disWidth = this.canvasSnow.clientWidth;
    let disHeight = this.canvasSnow.clientHeight;

    // проверяем, отличается ли размер canvas
    if (
      this.canvasSnow.width != disWidth ||
      this.canvasSnow.height != disHeight
    ) {
      // подгоняем размер буфера отрисовки под размер HTML-элемента
      this.canvasSnow.width = disWidth;
      this.canvasSnow.height = disHeight;
    }
  }
  generateBubbles() {
    this.SnowFlakesList = [];
    for (let i = 0; i < SNOW_DENSITY; i++) {
      this.SnowFlakesList.push(new SnowFlake(this.canvasSnow));
    }
  }

  animate() {
    this.ctx.lineCap = "round";
    this.ctx.clearRect(0, 0, this.canvasSnow.width, this.canvasSnow.height);
    this.SnowFlakesList.forEach((snowElem) => {
      snowElem.move();
      this.ctx.beginPath();
      this.ctx.lineWidth = snowElem.weightRay;
      this.ctx.strokeStyle = "rgba(" + snowElem.colSnow + ", 0.8)";
      arrayAngle.forEach((el) => {
        this.ctx.moveTo(snowElem.px, snowElem.py);
        this.ctx.lineTo(
          xCos(snowElem.px, el, snowElem.lenRay, snowElem.angel).toFixed(2),
          ySin(snowElem.py, el, snowElem.lenRay, snowElem.angel).toFixed(2)
        );
        this.ctx.stroke();
        if (this.canvasSnow.width / this.canvasSnow.height > 1) {
          this.dprX = this.dpr;
          this.dprY = this.dpr;
        } else {
          this.dprX = this.dpr;
          this.dprY = this.dpr / this.dpr;
        }
        this.ctx.setTransform(this.dprX, 0, 0, this.dprY, 0, 0);

        //this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
    });

    requestAnimationFrame(this.animate.bind(this));
  }
}

const canva = new CanvasAnimatedSnow("snow", "form");
canva.start();
