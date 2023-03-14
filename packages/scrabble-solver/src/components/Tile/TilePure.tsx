import classNames from 'classnames';
import {
  ChangeEventHandler,
  CSSProperties,
  FocusEventHandler,
  FunctionComponent,
  KeyboardEventHandler,
  memo,
  Ref,
} from 'react';

import { ExclamationSquareFill } from 'icons';

import styles from './Tile.module.scss';

interface Props {
  'aria-label': string;
  autoFocus?: boolean;
  canShowPoints?: boolean;
  character?: string;
  className?: string;
  disabled?: boolean;
  highlighted?: boolean;
  inputRef: Ref<HTMLInputElement>;
  isBlank?: boolean;
  isValid?: boolean;
  placeholder?: string;
  points?: number;
  pointsFormatted?: string;
  pointsStyle?: CSSProperties;
  raised?: boolean;
  style?: CSSProperties;
  tabIndex?: number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
}

const TilePure: FunctionComponent<Props> = ({
  'aria-label': ariaLabel,
  autoFocus,
  canShowPoints,
  character,
  className,
  disabled,
  highlighted,
  inputRef,
  isBlank,
  isValid,
  placeholder,
  points,
  pointsFormatted,
  pointsStyle,
  raised,
  style,
  tabIndex,
  onChange,
  onFocus,
  onKeyDown,
}) => (
  <div
    className={classNames(styles.tile, className, {
      [styles.blank]: isBlank,
      [styles.empty]: !character,
      [styles.invalid]: !isValid,
      [styles.highlighted]: highlighted,
      [styles.points1]: points === 1,
      [styles.points2]: points === 2,
      [styles.points3]: points === 3,
      [styles.points4]: points === 4,
      [styles.points5]: typeof points === 'number' && points >= 5,
      [styles.raised]: raised,
    })}
    style={style}
  >
    {character || placeholder}

    <input
      aria-label={ariaLabel}
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect="off"
      autoFocus={autoFocus}
      className={styles.input}
      disabled={disabled}
      ref={inputRef}
      spellCheck={false}
      tabIndex={tabIndex}
      value={character || ''}
      onChange={onChange}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
    />

    {canShowPoints && (
      <span className={styles.points} style={pointsStyle}>
        {pointsFormatted}
      </span>
    )}

    {!isValid && <ExclamationSquareFill className={styles.alert} />}
  </div>
);

export default memo(TilePure);
