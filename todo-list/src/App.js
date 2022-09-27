import {
  RecoilRoot, atom, useRecoilState,
  useSetRecoilState, useRecoilValue, selector
} from 'recoil'
import React, { useState } from 'react'
import axios from 'axios';

function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<h1>Cargando...</h1>}>
        <UserData />
        <TodoFilter />
        <TodoStats />
        <ItemCreator />
        <TodoList />
      </React.Suspense>
    </RecoilRoot>
  );
}
let idUnique = 0;
const todoListState = atom({
  key: 'todoListState',
  default: []
})

const todoItemState = atom({
  key: 'todoItemState',
  default: 'all'
})

const todoFilterSelector = selector({
  key: 'todoFilterSelector',
  get: ({ get }) => {
    const list = get(todoListState)
    const filter = get(todoItemState)
    switch (filter) {

      case 'done':
        return list.filter(item => item.isComplete)
      case 'No':
        return list.filter(item => !item.isComplete)
      default:
        return list;
    }
  }
})

const todoStatsSelector = selector({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const list = get(todoListState)
    const todo = list.filter(item => !item.isComplete).length;
    const notTodo = list.filter(item => item.isComplete).length;
    const completedPercentage = list.length === 0 ? 0 : notTodo / list.length;

    const data = {
      total: list.length,
      todo,
      notTodo,
      completedPercentage
    }
    return data;
  }
})

const userDataSelector = selector({
  key: 'userDataSelector',
  get: async () => {
    const response = await axios.get("http://localhost:3001/users/1")
    return response.data;
  }
})

function ItemCreator() {
  const [text, setText] = useState('');
  const setNewTodo = useSetRecoilState(todoListState);

  const onChangeText = event => {
    setText(event.target.value)
  }

  const onClick = () => {
    setNewTodo(oldTodoList => {
      return [...oldTodoList,
      {
        id: idUnique++, text, isComplete: false
      }]
    })
    setText('')
  }

  return (
    <div>
      <input value={text} onChange={onChangeText} />
      <button onClick={onClick}>Agregar</button>
    </div>
  )
}

function TodoList() {
  const todos = useRecoilValue(todoFilterSelector)
  return (
    <div>
      {
        todos.map(item => <TodoItem key={item.id} {...item} />)
      }
    </div>
  )
}
function changeItem(id, todoList, changedItem) {
  const index = todoList.findIndex(item => item.id === id);

  return [...todoList.slice(0, index), changedItem, ...todoList.slice(index + 1, todoList.lenght)]
}

function deleteItem(id, todoList) {
  const index = todoList.findIndex(item => item.id === id);

  return [...todoList.slice(0, index), ...todoList.slice(index + 1, todoList.lenght)]
}

function TodoItem({ id, text, isComplete }) {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const onChengeTodoItem = event => {
    const textValue = event.target.value;
    const changedItem = {
      id: idUnique++,
      text: textValue,
      isComplete
    }

    setTodoList(changeItem(id, todoList, changedItem))
  }

  const onToggleCompleted = event => {
    const changedItem = {
      id,
      text,
      isComplete: !isComplete
    }

    setTodoList(changeItem(id, todoList, changedItem))
  }

  const onClickDelete = () => {
    setTodoList(deleteItem(id, todoList))
  }
  return (
    <div>
      <input value={text} onChange={onChengeTodoItem} />
      <input type="checkbox" checked={isComplete} onChange={onToggleCompleted} />
      <button onClick={onClickDelete}>X</button>
    </div>
  )
}

function TodoFilter() {
  const [filterState, setFilterState] = useRecoilState(todoItemState);

  const onSelectedItem = event => {
    const { value } = event.target;
    setFilterState(value);
  }
  return (
    <div>
      Filtro:
      <select value={filterState} onChange={onSelectedItem}>
        <option value="all">Todos</option>
        <option value="done">Realizados</option>
        <option value="No">No realizados</option>
      </select>
    </div>
  )
}

function TodoStats() {
  const { total, todo, notTodo, completedPercentage } = useRecoilValue(todoStatsSelector)
  return (
    <div>
      <span>Tareas totales: {total} </span><br />
      <span>Tareas por hacer: {todo} </span><br />
      <span>Tareas realizadas: {notTodo} </span><br />
      <span>Progreso: %{completedPercentage * 100}</span><br />
    </div>
  )
}

function UserData() {
  const user = useRecoilValue(userDataSelector);
  return (
    <h1>{user.name}</h1>
  )
}

export default App;
