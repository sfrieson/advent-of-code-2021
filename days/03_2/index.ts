import { readLines } from '../../utils';

const lines = readLines(__dirname, './input.txt');

const sorted = lines.sort();

function findRating(sorted: string[], favor: 'common' | 'sparse', bitIndex = 0): string {
  let zeroes = 0;
  if (!sorted.length) throw new Error('something bad happened, no more items');

  if (bitIndex === sorted[0].length || sorted.length === 1) return sorted[0];

  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i][bitIndex] !== '0') break;
    zeroes++;
  }

  let ones = sorted.length - zeroes;

  if (favor === 'common') {
    if (zeroes > ones) {
      return findRating(sorted.slice(0, zeroes), favor, bitIndex + 1);
    }
    return findRating(sorted.slice(zeroes), favor, bitIndex + 1);
  } else {
    if (zeroes > ones) {
      return findRating(sorted.slice(zeroes), favor, bitIndex + 1);
    }
    return findRating(sorted.slice(0, zeroes), favor, bitIndex + 1);
  }
}

const oxygenRating = findRating(sorted, 'common');
const co2Rating = findRating(sorted, 'sparse');

console.log(oxygenRating, co2Rating)

console.log(parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))