import { PayloadAction } from '@reduxjs/toolkit';
import { Result } from '@scrabble-solver/types';
import { call, delay, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { memoize } from 'lib';
import { findWordDefinitions, solve, verify, visit } from 'sdk';

import { initialize, reset } from './actions';
import {
  selectAutoGroupTiles,
  selectBoard,
  selectCellIsFiltered,
  selectCharacters,
  selectConfig,
  selectDictionary,
  selectLocale,
} from './selectors';
import {
  boardSlice,
  cellFilterSlice,
  dictionarySlice,
  rackSlice,
  resultsSlice,
  settingsSlice,
  solveSlice,
  verifySlice,
} from './slices';

const SUBMIT_DELAY = 150;

const memoizedFindWordDefinitions = memoize(findWordDefinitions);

// Can't conveniently type generators for sagas yet,
// see: https://github.com/microsoft/TypeScript/issues/43632
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyGenerator = Generator<any, any, any>;

export function* rootSaga(): AnyGenerator {
  yield takeEvery(boardSlice.actions.changeCellValue.type, onCellValueChange);
  yield takeEvery(resultsSlice.actions.applyResult.type, onApplyResult);
  yield takeEvery(resultsSlice.actions.changeResultCandidate.type, onResultCandidateChange);
  yield takeEvery(settingsSlice.actions.changeConfigId.type, onConfigIdChange);
  yield takeEvery(settingsSlice.actions.changeLocale.type, onLocaleChange);
  yield takeLatest(dictionarySlice.actions.submit.type, onDictionarySubmit);
  yield takeLatest(initialize.type, onInitialize);
  yield takeLatest(reset.type, onReset);
  yield takeLatest(solveSlice.actions.submit.type, onSolve);
  yield takeLatest(verifySlice.actions.submit.type, onVerify);
}

function* onCellValueChange({ payload }: PayloadAction<{ value: string; x: number; y: number }>): AnyGenerator {
  const isFiltered = yield select((state) => selectCellIsFiltered(state, payload));

  if (isFiltered) {
    yield put(cellFilterSlice.actions.toggle(payload));
  }

  yield put(verifySlice.actions.submit());
}

function* onApplyResult({ payload: result }: PayloadAction<Result>): AnyGenerator {
  const autoGroupTiles = yield select(selectAutoGroupTiles);
  yield put(boardSlice.actions.applyResult(result));
  yield put(cellFilterSlice.actions.reset());
  yield put(rackSlice.actions.removeTiles(result.tiles));
  yield put(rackSlice.actions.groupTiles(autoGroupTiles));
  yield put(verifySlice.actions.submit());
}

function* onConfigIdChange(): AnyGenerator {
  yield put(resultsSlice.actions.reset());
  yield put(solveSlice.actions.submit());
  yield put(verifySlice.actions.submit());
  yield* ensureProperTilesCount();
}

function* onDictionarySubmit(): AnyGenerator {
  const { input: word } = yield select(selectDictionary);
  const locale = yield select(selectLocale);

  if (!memoizedFindWordDefinitions.hasCache(locale, word)) {
    yield delay(SUBMIT_DELAY);
  }

  try {
    const wordDefinitions = yield call(memoizedFindWordDefinitions, locale, word);
    yield put(dictionarySlice.actions.submitSuccess(wordDefinitions));
  } catch (error) {
    yield put(dictionarySlice.actions.submitFailure(error));
  }
}

function* onInitialize(): AnyGenerator {
  yield call(visit);
  yield* ensureProperTilesCount();
}

function* onReset(): AnyGenerator {
  yield put(boardSlice.actions.reset());
  yield put(cellFilterSlice.actions.reset());
  yield put(dictionarySlice.actions.reset());
  yield put(rackSlice.actions.reset());
  yield put(resultsSlice.actions.reset());
  yield put(verifySlice.actions.submit());
}

function* onLocaleChange(): AnyGenerator {
  yield put(dictionarySlice.actions.reset());
  yield put(resultsSlice.actions.changeResultCandidate(null));
  yield put(solveSlice.actions.submit());
  yield put(verifySlice.actions.submit());
}

function* onResultCandidateChange({ payload: result }: PayloadAction<Result | null>): AnyGenerator {
  if (result) {
    yield put(dictionarySlice.actions.changeInput(result.words.join(', ')));
    yield put(dictionarySlice.actions.submit());
  }
}

function* onSolve(): AnyGenerator {
  const board = yield select(selectBoard);
  const { config } = yield select(selectConfig);
  const locale = yield select(selectLocale);
  const characters = yield select(selectCharacters);

  if (characters.length === 0) {
    yield put(solveSlice.actions.submitSuccess({ board, characters }));
    yield put(resultsSlice.actions.changeResults([]));
    return;
  }

  try {
    const results = yield call(solve, {
      board: board.toJson(),
      characters,
      configId: config.id,
      locale,
    });
    yield put(resultsSlice.actions.changeResults(results));
    yield put(solveSlice.actions.submitSuccess({ board, characters }));
  } catch (error) {
    yield put(resultsSlice.actions.changeResults([]));
    yield put(solveSlice.actions.submitFailure(error));
  }
}

function* onVerify(): AnyGenerator {
  yield delay(SUBMIT_DELAY);

  const board = yield select(selectBoard);
  const { config } = yield select(selectConfig);
  const locale = yield select(selectLocale);

  try {
    const { invalidWords, validWords } = yield call(verify, {
      board: board.toJson(),
      configId: config.id,
      locale,
    });
    yield put(verifySlice.actions.submitSuccess({ board, invalidWords, validWords }));
  } catch (error) {
    yield put(verifySlice.actions.submitFailure());
  }
}

function* ensureProperTilesCount(): AnyGenerator {
  const { config } = yield select(selectConfig);
  const characters = yield select(selectCharacters);

  if (config.maximumCharactersCount > characters.length) {
    const differenceCount = Math.abs(config.maximumCharactersCount - characters.length);
    yield put(rackSlice.actions.init([...characters, ...Array(differenceCount).fill(null)]));
  } else if (config.maximumCharactersCount < characters.length) {
    const nonNulls = characters.filter(Boolean).slice(0, config.maximumCharactersCount);
    const differenceCount = Math.abs(config.maximumCharactersCount - nonNulls.length);
    const autoGroupTiles = yield select(selectAutoGroupTiles);
    yield put(rackSlice.actions.init([...nonNulls, ...Array(differenceCount).fill(null)]));
    yield put(rackSlice.actions.groupTiles(autoGroupTiles));
  }
}
