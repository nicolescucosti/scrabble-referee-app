import { Locale } from '@scrabble-solver/types';

import { getTxtWordList } from './lib';

const FILE_URL = 'https://raw.githubusercontent.com/MansourM/persian-to-persian-dictionary/main/moein/words.txt';

const getFaIrWordList = async (): Promise<string[]> => {
  return getTxtWordList(FILE_URL, Locale.FA_IR);
};

export default getFaIrWordList;
