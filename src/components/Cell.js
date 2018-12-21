import React from 'react';
import styled from 'styled-components';

const Cell = props => {
  const { number, handleClick, isInitial } = props;

  return (
    <StyledCell onClick={!isInitial ? handleClick : null} isInitial={isInitial}>
      {/* false return left (value = boolean), true return right (value = value of state) */}
      {number !== 0 && number}
    </StyledCell>
  );
};

const StyledCell = styled.div`
  width: 25%;
  height: 150px;
  float: left;
  line-height: 150px;
  text-align: center;
  background: #fff;
  font-size: 50px;
  font-weight: 700;
  color: #444;
  box-sizing: border-box;
  border: 1px solid #ddd;
  user-select: none;
  cursor: pointer;

  ${props =>
    props.isInitial &&
    `
        background: #eee;
        color: #666;
        cursor: initial;
    `}

  &:nth-child(-n + 4) {
    border-top: 3px black solid;
  }

  &:nth-child(n + 13) {
    border-bottom: 3px black solid;
  }

  &:nth-child(4n + 1) {
    border-left: 3px black solid;
  }

  &:nth-child(4n) {
    border-right: 3px black solid;
  }

  &:nth-child(4n + 2) {
    border-right: 3px black solid;
  }

  &:nth-child(5) {
    border-bottom: 3px black solid;
  }

  &:nth-child(6) {
    border-bottom: 3px black solid;
  }

  &:nth-child(7) {
    border-bottom: 3px black solid;
  }

  &:nth-child(8) {
    border-bottom: 3px black solid;
  }
`;

export default Cell;
