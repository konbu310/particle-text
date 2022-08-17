import debounce from "lodash.debounce";
import "./styles.css";

const fontSize = 1000;
const gap = 13;
const fontFamily = "Avenir, Helvetica Neue, Helvetica, Arial, sans-serif";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const ipt = document.getElementById("ipt") as HTMLInputElement;

const shapeCanvas = document.createElement("canvas") as HTMLCanvasElement;
const shapeCanvasCtx = shapeCanvas.getContext("2d")!;

const fitCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

const fitShapeCanvas = () => {
  shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
  shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
  shapeCanvasCtx.fillStyle = "red";
  shapeCanvasCtx.textBaseline = "middle";
  shapeCanvasCtx.textAlign = "center";
};

const getSize = (canvas: HTMLCanvasElement) => {
  return [canvas.width, canvas.height];
};

const setFontSize = (size: number) => {
  shapeCanvasCtx.font = `bold ${size}px ${fontFamily}`;
};

let colors = ["white"];
let easing = 0.07;
let text = "Hello";

let particles: Particle[] = [];

export class Particle {
  x: number;
  y: number;
  r: number;

  color: string;

  constructor(
    public cw: number,
    public ch: number,
    public dx: number,
    public dy: number
  ) {
    this.x = Math.random() * cw;
    this.y = Math.random() * ch;
    this.r = 5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    this.x += (this.dx - this.x) * easing;
    this.y += (this.dy - this.y) * easing;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}

const initShapeCanvas = (text: string) => {
  let size = 0;
  setFontSize(fontSize);
  const widthBasedSize =
    (shapeCanvas.width / shapeCanvasCtx.measureText(text).width) *
    0.9 *
    fontSize;
  const heightBasedSize = (shapeCanvas.height / fontSize) * 0.45 * fontSize;
  size = Math.min(fontSize, widthBasedSize, heightBasedSize);
  console.log(size);
  setFontSize(size);
  const [cw, ch] = getSize(shapeCanvas);
  shapeCanvasCtx.clearRect(0, 0, cw, ch);
  shapeCanvasCtx.fillText(text, cw / 2, ch / 2);
};

const processShapeCanvas = () => {
  const [cw, ch] = getSize(shapeCanvas);
  const pixels = shapeCanvasCtx.getImageData(0, 0, cw, ch).data;
  const particles: Particle[] = [];
  let x = 0,
    y = 0,
    fx = cw,
    fy = ch,
    w = 0,
    h = 0;

  // RGBAのフラットな配列になっているので、４つずつ取り出して処理する
  for (let p = 0; p < pixels.length; p += 4 * gap) {
    // アルファ値をチェック
    if (pixels[p + 3] > 0) {
      particles.push(new Particle(cw, ch, x, y));
      w = x > w ? x : w;
      h = y > h ? y : h;
      fx = x < fx ? x : fx;
      fy = y < fy ? y : fy;
    }
    x += gap;
    if (x >= cw) {
      x = 0;
      y += gap;
      p += gap * 4 * cw;
    }
  }

  return { particles, w: w + fx, h: h + fy };
};

function init() {
  fitCanvas();
  fitShapeCanvas();
  initShapeCanvas(text);
  const res = processShapeCanvas();
  particles = res.particles;
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    p.render();
  }
  requestAnimationFrame(() => {
    render();
  });
}

function registerEvents() {
  ipt.addEventListener("keydown", (ev) => {
    if (ev.keyCode === 13) {
      text = ipt.value;
      ipt.value = "";
      init();
    }
  });
}

init();
registerEvents();
const handleResize = debounce(() => init(), 500);
window.addEventListener("resize", handleResize);
render();
