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

type Position = {
  horizontal: number;
  depth: number;
  aim: number;
}

const executeInstruction = (position: Position, [ direction, amount]: Instruction): Position => {
  const nextPosition = { ...position };
  switch(direction) {
    case 'up':
      nextPosition.aim -= amount;
      break;
    case 'down':
      nextPosition.aim += amount;
      break;
    case 'forward':
      nextPosition.horizontal += amount;
      nextPosition.depth += nextPosition.aim * amount;
      break;
    default:
      throw new Error(`Unknown direction: ${direction}`);
  }

  return nextPosition;
}

function trackPositionion (instructions: Instruction[]): Position {
  const position: Position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }

  return instructions.reduce((position, instruction) => {
    return executeInstruction(position, instruction);
  }, position);

}

const position = trackPositionion(instructions);

console.log(position.depth * position.horizontal);