import { readLines } from '../../utils';

const lines = readLines(__dirname, './input.txt');
console.log('lines');
// make a sum of teh bits where 1 = 1 and 0 = -1. Positive will mean 1 is more common, and negative means 0.
const sums = Array.from({ length: lines[0].length }, () => 0);

lines.forEach(line => {
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '1') sums[i]++;
    else sums[i]--;
  }
});

const gammaBinary = sums.map(num => num > 0 ? '1' : '0').join('');
const epsilonBinary = sums.map(num => num > 0 ? '0' : '1').join('');
const gamma = parseInt(gammaBinary, 2);
const epsilon = parseInt(epsilonBinary, 2);

console.log(gamma * epsilon);