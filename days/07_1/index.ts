import { readCSV } from '../../utils';

const crabStarts = readCSV(__dirname, './input.txt').map((start => parseInt(start, 10)));

const getStatistics = (arr: number[]) => {
  const sorted = [...arr].sort();
  let sum = 0;

  const counts: Map<number, number> = new Map();
  let lowest = Infinity;
  let highest = -Infinity;
  let highestVal: number;
  let highestCount = 0;
  for (let el of sorted) {
    sum += el;
    lowest = Math.min(el, lowest);
    highest = Math.max(el, highest);

    if (!counts.has((el))) {
      counts.set(el, 0);
    }
    if (!counts.has(el)) {
      throw new Error(`This type cannot be used: ${typeof el}`);
    }

    counts.set(
      el,
      counts.get(el)! + 1
    );

    if (highestCount < counts.get(el)!) {
      highestCount = counts.get(el)!;
      highestVal = el;
    }
  }

  return {
    mean: sum / arr.length,
    median: sorted[Math.ceil(arr.length / 2)],
    mode: highestVal!,
    lowest,
    highest,
    counts
  }
}

const stats = getStatistics(crabStarts)

function getFuelCost(position: number) {
  let effort = 0;
  stats.counts.forEach((count, pos) => {
    effort += Math.abs(position - pos) * count
  });

  return effort;
}

let minPosition: number;
let minFuel = Infinity;
for (let pos = stats.lowest; pos <= stats.highest; pos++) {
  const cost = getFuelCost(pos);
  if (cost > minFuel) break;
  minFuel = cost;
  minPosition = pos;
}

console.log(minFuel!);