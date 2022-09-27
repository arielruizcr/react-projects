import React from 'react';
import TodoList from './components/TodoList'
import TodoInput from './components/TodoInput'
import './App.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initialValue = { items: []}

const reducer = (state = initialValue, action) => {
  debugger
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, action.payload]}
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.item !== action.payload)}
    default:
      return state
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TodoInput></TodoInput>
        <TodoList></TodoList>
      </div>
    </Provider>
  );
}

export default App;
