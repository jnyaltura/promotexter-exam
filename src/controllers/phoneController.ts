import { Request, Response } from 'express';

const digitToLetters: { [key: string]: string[] } = {
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z'],
};

function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  let result: string[] = [''];
  for (const digit of digits) {
    const letters = digitToLetters[digit as keyof typeof digitToLetters];
    if (!letters) continue;
    const temp: string[] = [];
    for (const prefix of result) {
      for (const letter of letters) {
        temp.push(prefix + letter);
      }
    }
    result = temp;
  }
  return result;
}

export const getPhoneCombinations = (req: Request, res: Response) => {
  const { digits } = req.query;
  if (typeof digits !== 'string') {
    return res.status(400).json({ error: 'Digits query parameter is required' });
  }
  const combinations = letterCombinations(digits);
  res.json(combinations);
};
