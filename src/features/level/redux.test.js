import reducer from './redux';

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

it('should return correct initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it('should set board data', () => {
  const returnData = { board: [1, 2, 3], initial: [true, true, true] };

  expect(
    reducer(initialState, {
      type: 'GET_BOARD_FULFILLED',
      payload: { data: returnData }
    })
  ).toEqual({ ...initialState, boardLoading: false, ...returnData });
});
