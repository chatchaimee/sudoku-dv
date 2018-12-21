import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import { pick } from 'lodash';
import styled from 'styled-components';
import axios from 'axios';

// import { getBoard, setBoard, validate, setTimer } from './redux';
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
    console.log('use');
    useEffect(() => {
      console.log('set');
      interval = setInterval(() => {
        console.log('tick', localTimer);
        localTimer = localTimer + 1;
        setTimer(localTimer);
      }, 1000);
      return () => {
        console.log('clear');
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

/*const useTimer = () => {
  const [timer, setTimer] = useState(0);
  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const stopTimer = clearInterval(interval);

  return [timer, stopTimer];
};

const useInitialBoard = (getBoard, id) => {
  useEffect(() => {
    getBoard(id);
  }, []);
};*/

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

// Use class (old)
/*class App extends Component {
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.levelId);

    this.props.getBoard(id);

    this.interval = setInterval(() => {
      if (this.props.isValid) {
        clearInterval(this.interval);

        return;
      }

      this.props.setTimer(this.props.timer + 1);
    }, 1000);
  }

  handleClick = (i, j) => {
    this.props.setBoard(i, j);
  };

  handleValidateClick = () => {
    const { board, validate } = this.props;

    validate(board);
  };

  render() {
    const {
      boardLoading,
      board,
      initial,
      timer,
      isValid,
      isError
    } = this.props;

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
                    handleClick={() => this.handleClick(i, j)}
                  />
                );
              });
            })}
        </div>
        <p>{isValid ? 'Board is valid!' : 'Board is invalid!'}</p>
        <button onClick={this.handleValidateClick}>Validate</button>
      </Wrapper>
    );
  }
}*/

// Short
/*const mapStateToProps = state => {
  return pick(state, [
    'boardLoading',
    'board',
    'initial',
    'timer',
    'isValid',
    'isError'
  ]);
};*/

// Short
/*const mapDispatchToProps = {
  getBoard,
  setBoard,
  validate,
  setTimer
};*/

// Long
/*const mapStateToProps = state => ({
  board: state.board,
  initial: state.initial,
  timer: state.timer,
  isValid: state.isValid
});*/

// Long
/*const mapDispatchToProps = dispatch => {
  return {
    setBoard: (i, j) => dispatch(setBoard(i, j)),
    validate: () => dispatch(validate())
  };
};*/

/*export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);*/

export default App;