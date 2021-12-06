import { readLines } from '../../utils';

const lines = readLines(__dirname, './input.txt');

const drawOrder = lines[0].trim().split(',');

const ballCage = {
  currentIndex: -1,
  drawOrder,
  draw: () => {
    ballCage.currentIndex++;
    return ballCage.read();
  },
  read: () => {
    return drawOrder[ballCage.currentIndex]
  }
}

const bingoBoardHeight = 6;
const boardRows = [];

for (let i = 2; i < lines.length; i += bingoBoardHeight) {
  boardRows.push(
    lines.slice(i, i+bingoBoardHeight - 1)
  );
}

class Cell {
  value: string;
  found: boolean = false;
  constructor(value: string) {
    this.value = value;
  }

  mark() {
    this.found = true;
  }
}

class Board {
  store: Array<Array<Cell>>;
  index: {
    [num: string]: {
      cell: Cell,
      row: number,
      col: number,
    }
  } = {}
  constructor(card: string[]) {
    this.store = card.map((line, row) => {
      return line.trim().split(/\s+/).map((num, col) => {
        const cell = new Cell(num);
        this.index[num] = {
          cell,
          row,
          col
        };
        return cell;
      });
    })
  }

  find(num: string): Board['index'][string] {
    return this.index[num];
  }

  check(direction: 'row' | 'col', index: number): boolean {
    const rowStart = direction === 'row' ? index : 0;
    const rowEnd = direction === 'row' ? index + 1 : this.store.length;
    const colStart = direction === 'col' ? index : 0;
    const colEnd = direction === 'col' ? index + 1 : this.store[0].length;

    for (let row = rowStart; row < rowEnd; row++ ) {
      for (let col = colStart; col < colEnd; col++ ) {
        const cell = this.store[row][col];
        if (!cell.found) return false;
      }
    }
    return true;
  }

  getScore(): number {
    let score = 0;
    for (let row = 0; row < this.store.length; row++) {
      const r = this.store[row];
      for (let col = 0; col < r.length; col++) {
        const cell = r[col];
        if (!cell.found) score += parseInt(cell.value, 10);
      }
    }

    return score;
  }
}

const boards = boardRows.map(br => new Board(br));

while (ballCage.draw()) {
  const num = ballCage.read();
  let winner = false;
  boards.forEach(board => {
    if (winner) return;
    const box = board.find(num);
    if (box) {
      box.cell.mark();
      winner = board.check('row', box.row) ||
      board.check('col', box.col)
      if (winner) {
        winner = true;
        console.log(parseInt(num, 10) * board.getScore());
      }
    }
  });

  if (winner) break;
}