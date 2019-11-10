import React from 'react';
import './App.css';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Autocomplete from './components/Autocomplete/Autocomplete';
import Content from './components/Content/Content';

import rootReducer from './store/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <div className="App-Component">
          <div className="title">
            <h1>Найди места где спрятан клад!</h1>
            <h3>(english names)</h3>
          </div>
          <Autocomplete/>
          <Content/>
        </div>
      </div>
    </Provider>
  );
}

export default App;
