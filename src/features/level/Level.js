import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pick } from 'lodash';
import styled from 'styled-components';

import { getBoard, setBoard, validate, setTimer } from './redux';
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

class App extends Component {
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
}

const mapStateToProps = state => {
  return pick(state, [
    'boardLoading',
    'board',
    'initial',
    'timer',
    'isValid',
    'isError'
  ]);
};

const mapDispatchToProps = {
  getBoard,
  setBoard,
  validate,
  setTimer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
