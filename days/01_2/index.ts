import { readLines } from '~/utils';


const mapToInt = (str: string) => parseInt(str, 10);

const input = readLines(__dirname, './input.txt');

const depths = input.map(mapToInt);

const windowSize = 3;

const isValidWindow = (arr: number[], idx: number, size: number): boolean => {
  return typeof arr[idx] === 'number' && typeof arr[idx + size] === 'number';
}
const sumWindow = (arr: number[], idx: number, size: number): number  => {
  let sum = 0;
  for (let i = idx; i < idx + size; i++) {
    sum += arr[i];
  }

  return sum;
} 

const increases = depths.reduce((incs, curr, idx) => {
  if (isValidWindow(depths, idx, windowSize) && isValidWindow(depths, idx, windowSize)) {
    if (sumWindow(depths, idx, windowSize) < sumWindow(depths, idx + 1, windowSize)) {
      return incs + 1;
    }
  }
  return incs;
}, 0);

console.log(increases);