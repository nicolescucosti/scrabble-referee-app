import { Config, Locale } from '@scrabble-solver/types';

import { literaki, scrabble } from '../games';

const plPL: Config[] = [
  new Config({
    ...scrabble,
    locale: Locale.PL_PL,
    tiles: [
      { character: 'a', count: 9, score: 1 },
      { character: 'ą', count: 1, score: 5 },
      { character: 'b', count: 2, score: 3 },
      { character: 'c', count: 3, score: 2 },
      { character: 'ć', count: 1, score: 6 },
      { character: 'd', count: 3, score: 2 },
      { character: 'e', count: 7, score: 1 },
      { character: 'ę', count: 1, score: 5 },
      { character: 'f', count: 1, score: 5 },
      { character: 'g', count: 2, score: 3 },
      { character: 'h', count: 2, score: 3 },
      { character: 'i', count: 8, score: 1 },
      { character: 'j', count: 2, score: 3 },
      { character: 'k', count: 3, score: 2 },
      { character: 'l', count: 3, score: 2 },
      { character: 'ł', count: 2, score: 3 },
      { character: 'm', count: 3, score: 2 },
      { character: 'n', count: 5, score: 1 },
      { character: 'ń', count: 1, score: 7 },
      { character: 'o', count: 6, score: 1 },
      { character: 'ó', count: 1, score: 5 },
      { character: 'p', count: 3, score: 2 },
      { character: 'r', count: 4, score: 1 },
      { character: 's', count: 4, score: 1 },
      { character: 'ś', count: 1, score: 5 },
      { character: 't', count: 3, score: 2 },
      { character: 'u', count: 2, score: 3 },
      { character: 'w', count: 4, score: 1 },
      { character: 'y', count: 4, score: 2 },
      { character: 'z', count: 5, score: 1 },
      { character: 'ź', count: 1, score: 9 },
      { character: 'ż', count: 1, score: 5 },
    ],
  }),
  new Config({
    ...literaki,
    locale: Locale.PL_PL,
    tiles: [
      { character: 'a', count: 9, score: 1 },
      { character: 'ą', count: 1, score: 5 },
      { character: 'b', count: 2, score: 3 },
      { character: 'c', count: 3, score: 2 },
      { character: 'ć', count: 1, score: 5 },
      { character: 'd', count: 3, score: 2 },
      { character: 'e', count: 7, score: 1 },
      { character: 'ę', count: 1, score: 5 },
      { character: 'f', count: 1, score: 5 },
      { character: 'g', count: 2, score: 3 },
      { character: 'h', count: 2, score: 3 },
      { character: 'i', count: 8, score: 1 },
      { character: 'j', count: 2, score: 3 },
      { character: 'k', count: 3, score: 2 },
      { character: 'l', count: 3, score: 2 },
      { character: 'ł', count: 2, score: 3 },
      { character: 'm', count: 3, score: 2 },
      { character: 'n', count: 5, score: 1 },
      { character: 'ń', count: 1, score: 5 },
      { character: 'o', count: 6, score: 1 },
      { character: 'ó', count: 1, score: 5 },
      { character: 'p', count: 3, score: 2 },
      { character: 'r', count: 4, score: 1 },
      { character: 's', count: 4, score: 1 },
      { character: 'ś', count: 1, score: 5 },
      { character: 't', count: 3, score: 2 },
      { character: 'u', count: 2, score: 3 },
      { character: 'w', count: 4, score: 1 },
      { character: 'y', count: 4, score: 2 },
      { character: 'z', count: 5, score: 1 },
      { character: 'ź', count: 1, score: 5 },
      { character: 'ż', count: 1, score: 5 },
    ],
  }),
];

export default plPL;
