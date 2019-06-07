import fetch from 'isomorphic-fetch';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
global.fetch = fetch;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
