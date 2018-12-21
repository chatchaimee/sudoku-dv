import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <ul>
      <li>
        <Link to="/levels/1">Level 1</Link>
      </li>
      <li>
        <Link to="/levels/2">Level 2</Link>
      </li>
    </ul>
  );
};
