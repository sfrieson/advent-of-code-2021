import { readLines } from '../../utils';

const input = readLines(__dirname, './input.txt');

type Direction = 'forward' | 'up' | 'down';

type Instruction = [Direction, number];

function isDirection (str: string): str is Direction {
  return str === 'forward' ||
  str === 'up' ||
  str === 'down';
}

const parseInstruction = (line: string): Instruction => {
  const [direction, stringNum] = line.trim().split(' ');
  if (!isDirection(direction)) throw new Error(`Unknown direction: ${direction}`);
  return [direction, parseFloat(stringNum)];
}

const mapToInstructions = (line: string) => parseInstruction(line);

const instructions = input.map(mapToInstructions);

function trackProgression (instructions: Instruction[]) {
  const progression = {
    horizontal: 0,
    depth: 0,
  }

  instructions.forEach(([direction, amount]) => {
    switch(direction) {
      case 'up':
        progression.depth -= amount;
        break;
      case 'down':
        progression.depth += amount;
        break;
      case 'forward':
        progression.horizontal += amount;
        break;
      default:
        throw new Error(`Unknown direction: ${direction}`);
    }
  });

  return progression;
}

const progress = trackProgression(instructions);

console.log(progress.depth * progress.horizontal);