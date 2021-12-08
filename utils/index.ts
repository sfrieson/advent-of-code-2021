import path from 'path';
import fs from 'fs';

export function readFile(...filepathParts: string[]): string {
  const filePath = path.resolve(...filepathParts);
  const file = fs.readFileSync(filePath, { encoding: 'utf-8' });

  return file.trim();
}


export function readLines(...filepathParts: string[]): string[] {
  const file = readFile(...filepathParts)
  
  return splitOnNewlines(file.trim());
}

export const splitOnNewlines = (txt: string) => txt.split('\n');

export function readCSV(...filepathParts: string[]) {
  const file = readFile(...filepathParts)

  return file.split(',')
}