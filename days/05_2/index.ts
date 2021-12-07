import { readLines } from '../../utils';

const inputLines = readLines(__dirname, './input.txt');

class Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /**
   * @param notation `${x1},${y1} -> ${x2},${y1}
   */
  constructor(notation: string) {
    const [x1, y1, x2, y2] = notation.split(/\D+/).map(str => parseFloat(str));
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  get isStraight() {
    return this.x1 === this.x2 || this.y1 === this.y2;
  }

  get is45Deg() {
    return Math.abs(this.x1 - this.x2) === Math.abs(this.y1 - this.y2);
  }
}

const lines = inputLines.map(line => new Line(line.trim()));

const straightOr45Deg = lines.filter(line => line.isStraight || line.is45Deg);

const ventPositions = new Map<`${number},${number}`, number>();

straightOr45Deg.forEach(line => {
  const xDir = line.x1 === line.x2 ? 0 : line.x1 <= line.x2 ? 1 : -1;
  const yDir = line.y1 === line.y2 ? 0 : line.y1 <= line.y2 ? 1 : -1;

  let x = line.x1;
  let y = line.y1;
  while ((x !== line.x2 + (xDir || 1)) && y !== line.y2 + (yDir || 1)) {
      if (!ventPositions.has(`${x},${y}`)) {
        ventPositions.set(`${x},${y}`, 0);
      }
      ventPositions.set(
        `${x},${y}`,
        ventPositions.get(`${x},${y}`)! + 1
      );

    x += xDir;
    y += yDir
  }
});

const tolerance = 1;

let countAbove = 0;

ventPositions.forEach(value => {
  if (value > tolerance) countAbove++;
});

console.log(countAbove);

