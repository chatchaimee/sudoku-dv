import { set } from 'lodash';
import axios from 'axios';

import _validate from './validate';

const initialState = {
  board: [[1, 2, 3, 4], [3, 4, 0, 0], [2, 0, 4, 0], [4, 0, 0, 2]],
  initial: [
    [true, true, true, true],
    [true, true, false, false],
    [true, false, true, false],
    [true, false, false, true]
  ],
  timer: 0,
  isValid: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARD_PENDING':
      return {
        ...state,
        isError: false,
        boardLoading: true
      };
    case 'GET_BOARD_FULFILLED':
      return {
        ...state,
        boardLoading: false,
        ...action.payload.data
      };
    case 'GET_BOARD_REJECTED':
      return {
        ...state,
        isError: true
      };
    case 'SET_BOARD':
      return {
        ...state,
        board: [
          ...set(
            state.board,
            `${action.i}.${action.j}`,
            (state.board[action.i][action.j] + 1) % 5
          )
        ]
      };
    case 'VALIDATE':
      const isValid = _validate(state.board);
      return {
        ...state,
        isValid
      };
    case 'SET_TIMER':
      return {
        ...state,
        timer: action.value
      };
    default:
      return state;
  }
};

const levelMap = {
  1: 'http://www.mocky.io/v2/5c1b2f393300005f007fd622',
  2: 'http://www.mocky.io/v2/5c1c4bb43100005500103ff9'
};

export const getBoard = id => {
  return {
    type: 'GET_BOARD',
    payload: axios.get(levelMap[id])
  };
};

export const setTimer = value => {
  return {
    type: 'SET_TIMER',
    value
  };
};

export const validate = () => {
  return {
    type: 'VALIDATE'
  };
};

export const setBoard = (i, j) => {
  return {
    type: 'SET_BOARD',
    i, // i: i
    j // j: j
  };
};
