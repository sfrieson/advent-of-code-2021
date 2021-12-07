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
    this.x1 = x1 < x2 ? x1 : x2;
    this.y1 = y1 < y2 ? y1 : y2;
    this.x2 = x2 > x1 ? x2 : x1;
    this.y2 = y2 > y1 ? y2 : y1;
  }

  get isStraight() {
    return this.x1 === this.x2 || this.y1 === this.y2;
  }
}

const lines = inputLines.map(line => new Line(line.trim()));

const straightLines = lines.filter(line => line.isStraight);

const ventPositions = new Map<`${number},${number}`, number>();

straightLines.forEach(line => {
  for (let x = line.x1; x <= line.x2; x++) {
    for (let y = line.y1; y <= line.y2; y++) {
      if (!ventPositions.has(`${x},${y}`)) {
        ventPositions.set(`${x},${y}`, 0);
      }
      ventPositions.set(
        `${x},${y}`,
        ventPositions.get(`${x},${y}`)! + 1
      );
    }
  }
});

const tolerance = 1;

let countAbove = 0;

ventPositions.forEach(value => {
  if (value > tolerance) countAbove++;
});

console.log(countAbove);

