import React from 'react';
import useWindowSize from 'react-use/lib/useWindowSize';

import Board from 'board/components';
import ResultsList from 'results/components/list';
import { Tiles } from 'tiles';

import styles from './app.module.scss';

const App = () => {
  const { width, height } = useWindowSize();

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <div className={styles.board}>
          <Board />
        </div>

        <div className={styles.tiles}>
          <Tiles />
        </div>
      </div>

      <div className={styles.sidebar}>
        <ResultsList height={height} />
      </div>
    </div>
  );
};

export default App;