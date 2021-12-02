import { readLines } from '~/utils';

const mapToInt = (str: string) => parseInt(str, 10);

const input = readLines(__dirname, './input.txt');

const depths = input.map(mapToInt);

const increases = depths.reduce((incs, curr, idx) => {
  const previous = depths[idx -1];
  if (typeof curr === 'number' && typeof previous === 'number') {
    if (curr > previous) {
      return incs + 1;
    }
  }
  return incs;
}, 0);

console.log(increases);