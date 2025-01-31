import { Config, Locale } from '@scrabble-solver/types';

import { scrabble } from '../games';

const faIr: Config[] = [
  new Config({
    ...scrabble,
    locale: Locale.FA_IR,
    tiles: [
      { character: 'ا', count: 12, score: 1 },
      { character: 'ب', count: 4, score: 1 },
      { character: 'پ', count: 1, score: 6 },
      { character: 'ت', count: 4, score: 1 },
      { character: 'ث', count: 1, score: 10 },
      { character: 'ج', count: 2, score: 5 },
      { character: 'چ', count: 1, score: 6 },
      { character: 'ح', count: 1, score: 6 },
      { character: 'خ', count: 2, score: 5 },
      { character: 'د', count: 6, score: 1 },
      { character: 'ذ', count: 1, score: 10 },
      { character: 'ر', count: 7, score: 1 },
      { character: 'ز', count: 3, score: 4 },
      { character: 'ژ', count: 1, score: 10 },
      { character: 'س', count: 3, score: 2 },
      { character: 'ش', count: 3, score: 3 },
      { character: 'ص', count: 1, score: 6 },
      { character: 'ض', count: 1, score: 8 },
      { character: 'ط', count: 1, score: 8 },
      { character: 'ظ', count: 1, score: 10 },
      { character: 'ع', count: 2, score: 5 },
      { character: 'غ', count: 1, score: 8 },
      { character: 'ف', count: 2, score: 4 },
      { character: 'ق', count: 2, score: 5 },
      { character: 'ک', count: 3, score: 3 },
      { character: 'گ', count: 2, score: 4 },
      { character: 'ل', count: 3, score: 2 },
      { character: 'م', count: 5, score: 1 },
      { character: 'ن', count: 6, score: 1 },
      { character: 'و', count: 5, score: 1 },
      { character: 'ه', count: 5, score: 1 },
      { character: 'ی', count: 8, score: 1 },
    ],
  }),
];

export default faIr;
