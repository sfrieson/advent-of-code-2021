import { readFile } from '../../utils';

const starts = readFile(__dirname, './input.txt').split(',').map((start => parseInt(start, 10)));

const gestation = 6;
const puberty = 2;

const map: Record<string, number> = {}

function simulateLanternFishOffSpring (timeToLive: number, cycleStart?: number): number {
  const key = `${timeToLive},${cycleStart}`;
  if (!(key in map)) {
    map[key] = _simulateLanternFishOffSpring(timeToLive, cycleStart);
  }

  return map[key];
}

function _simulateLanternFishOffSpring (timeToLive: number, cycleStart: number = gestation + puberty): number {
  let offspring = 0;
  const state = { daysLeft: timeToLive };
  const giveBirth = () => {
    if (state.daysLeft > 0) {
      offspring += simulateLanternFishOffSpring(--state.daysLeft);
    }
  }

  state.daysLeft -= cycleStart;

  while(state.daysLeft > 0) {
    giveBirth();
    state.daysLeft -= gestation
  }

  return 1 + offspring;
}

const targetDays = 256;

let count = 0;
starts.forEach(start => {
  count += simulateLanternFishOffSpring(targetDays, start);
});

console.log(count)