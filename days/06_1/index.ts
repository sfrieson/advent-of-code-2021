import { readFile } from '../../utils';

const starts = readFile(__dirname, './test-input.txt').split(',').map((start => parseInt(start, 10)));

const gestation = 6;
const puberty = 2;

type LanternFish  = {
  cycle: number,
  passTime: () => void,
  giveBirth: () => void,
}

const school: LanternFish[] = [];

function createLanternFish (cycle: number = gestation + puberty): LanternFish {
  const fish = {
    cycle,
    passTime: () => {
      if (fish.cycle === 0) {
        fish.giveBirth();
      }
      fish.cycle = fish.cycle === 0 ? gestation : fish.cycle - 1;
    },
    giveBirth: () => {
      school.push(createLanternFish());
    }
  }

  return fish;
}

starts.forEach(start => {
  school.push(createLanternFish(start));
});

function passTime () {
  school.forEach(fish => fish.passTime());
}

const targetDays = 80;

for (let day = 0; day < targetDays; day++) {
  passTime();
}

console.log(school.length);