import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import validate from './validate';
import Cell from '../../components/Cell';

const Wrapper = styled.div`
  width: 600px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;

  p {
    text-align: center;
    font-size: 30px;
    margin-top: 20px;
    display: inline-block;
    width: 100%;
  }

  button {
    padding: 15px;
    border: 0;
    background: #444;
    color: #fff;
    font-size: 25px;
    border-radius: 5px;
    margin-top: 10px;
  }
`;

// Use hook (new)
const createUseTimer = () => {
  let interval;
  let localTimer = 0;

  return () => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
      interval = setInterval(() => {
        localTimer = localTimer + 1;
        setTimer(localTimer);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, []);

    const stopTimer = () => clearInterval(interval);

    return [timer, stopTimer];
  };
};

const useTimer = createUseTimer();

const useBoard = (id, stopTimer) => {
  const levelMap = {
    1: 'http://www.mocky.io/v2/5c1b2f393300005f007fd622',
    2: 'http://www.mocky.io/v2/5c1c4bb43100005500103ff9'
  };
  const [board, setBoard] = useState({
    board: [],
    initial: [],
    loading: false,
    error: false
  });
  useEffect(
    () => {
      axios
        .get(levelMap[id])
        .then(resp => setBoard(resp.data))
        .catch(() => {
          board.isError = true;
          setBoard(board);
        });
    },
    [id]
  );
  return [
    board.board,
    board.initial,
    board.loading,
    board.isError,
    board.isValid,
    (i, j) => {
      board.board[i][j] = (board.board[i][j] + 1) % 5;
      setBoard(board);
    },
    () => {
      const isValid = validate(board.board);
      if (isValid) {
        stopTimer();
      }
      board.isValid = isValid;
      setBoard(board);
      return isValid;
    }
  ];
};

const handleClick = (setBoard, i, j) => {
  setBoard(i, j);
};

const handleValidateClick = (board, validate) => {
  validate(board);
};

const App = props => {
  const id = parseInt(props.match.params.levelId);
  const [timer, stopTimer] = useTimer();
  const [
    board,
    initial,
    boardLoading,
    isError,
    isValid,
    setBoard,
    validate
  ] = useBoard(parseInt(id), stopTimer);

  return (
    <Wrapper>
      <p>{timer} sec</p>
      <div className="board">
        {isError && <p>Error!</p>}
        {!boardLoading &&
          board.map((row, i) => {
            return row.map((number, j) => {
              return (
                <Cell
                  key={`cell-${i}-${j}`}
                  isInitial={initial[i][j]}
                  number={number}
                  handleClick={() => handleClick(setBoard, i, j)}
                />
              );
            });
          })}
      </div>
      <p>{isValid ? 'Board is valid!' : 'Board is invalid!'}</p>
      <button onClick={() => handleValidateClick(board, validate)}>
        Validate
      </button>
    </Wrapper>
  );
};

export default App;
