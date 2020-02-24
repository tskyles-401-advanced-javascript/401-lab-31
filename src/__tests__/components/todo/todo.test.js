import React from 'react';
import Todo from '../../../components/todo/todo';

describe('<Todo />', () => {
  it('is alive on start', () => {
    let app = shallow(<Todo/>);

    expect(app.find('header').exists()).toBeTruthy();
    expect(app.find('.todo').exists()).toBeTruthy();
  });

  

  it('renders correctly', () => {
    const tree = renderer.create(<Todo/>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});