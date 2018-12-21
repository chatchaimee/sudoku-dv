import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Cell from './Cell';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Cell />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders 0 with no text', () => {
  const wrapper = shallow(<Cell number={0} />);

  expect(wrapper.text()).toBe('');
});

it('renders 1 with text "1"', () => {
  const wrapper = shallow(<Cell number={1} />);

  expect(wrapper.text()).toBe('1');
});

it('simulate click', () => {
  const mockFn = jest.fn();
  const wrapper = shallow(<Cell number={1} handleClick={mockFn} />);

  wrapper.simulate('click');
  expect(mockFn.mock.calls.length).toBe(1);
});
