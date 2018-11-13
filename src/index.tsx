import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Hello from './containers/Hello';
import { enthusiasm } from './reducers/index';
// import { StoreState } from './types/index';

// @TODO Why does this have <StoreState> typing in th TypescriptReactStarter readme?
const store = createStore(
    enthusiasm, 
    {
      enthusiasmLevel: 1,
      languageName: 'TypeScript',
    },
    composeWithDevTools()
);

ReactDOM.render(
  <Provider store={store}>
    <Hello />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

