import { EMPTY_CELL } from '@scrabble-solver/constants';
import { Cell as CellModel } from '@scrabble-solver/models';
import classNames from 'classnames';
import React, { forwardRef, KeyboardEventHandler, memo, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { createKeyboardNavigation } from 'lib';
import { boardSlice, selectBonus, selectCharacterPoints, selectConfig, solveSlice, useTypedSelector } from 'state';

import Tile from '../../../Tile';

import styles from './Cell.module.scss';
import { getBonusClassname, getCharacterPointsClassname } from './lib';

interface Props {
  cell: CellModel;
  className?: string;
  size: number;
  onFocus: (x: number, y: number) => void;
  onKeyDown: KeyboardEventHandler;
  onMoveFocus: () => void;
}

const Cell = forwardRef<HTMLInputElement, Props>(({ cell, className, size, onFocus, onKeyDown, onMoveFocus }, ref) => {
  const { tile, x, y } = cell;
  const dispatch = useDispatch();
  const config = useTypedSelector(selectConfig);
  const bonus = useTypedSelector((state) => selectBonus(state, cell));
  const characterPoints = useTypedSelector((state) => selectCharacterPoints(state, cell));
  const handleFocus = useCallback(() => onFocus(x, y), [x, y, onFocus]);
  const handleKeyDown = useMemo(
    () =>
      createKeyboardNavigation({
        onDelete: () => dispatch(boardSlice.actions.changeCellValue({ value: EMPTY_CELL, x, y })),
        onBackspace: () => dispatch(boardSlice.actions.changeCellValue({ value: EMPTY_CELL, x, y })),
        onEnter: () => dispatch(solveSlice.actions.submit()),
        onKeyDown: (event) => {
          // TODO: consider using is-hotkey
          const character = event.key;
          const isTogglingBlank = (event.ctrlKey || event.metaKey) && character === 'b';

          if (isTogglingBlank) {
            dispatch(boardSlice.actions.toggleCellIsBlank({ x, y }));
          } else if (config.hasCharacter(character)) {
            dispatch(boardSlice.actions.changeCellValue({ value: character, x, y }));
            onMoveFocus();
          }

          onKeyDown(event);
        },
      }),
    [x, y, config, dispatch, onKeyDown, onMoveFocus],
  );
  const { tileFontSize } = Tile.getSizes(size);

  return (
    <div
      className={classNames(
        styles.cell,
        getBonusClassname(cell, bonus),
        getCharacterPointsClassname(characterPoints),
        className,
        {
          [styles.candidate]: cell.isCandidate(),
        },
      )}
      style={{
        fontSize: tileFontSize,
      }}
    >
      <Tile
        className={styles.tile}
        character={tile.character === EMPTY_CELL ? undefined : tile.character}
        highlighted={cell.isCandidate()}
        isBlank={tile.isBlank}
        raised={tile.character !== EMPTY_CELL}
        ref={ref}
        size={size}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

export default memo(Cell);
