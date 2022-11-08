import { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)));
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodos(id) {
    const newTodos = [...todos];
    const todo = todos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleClearTodos() {
    setTodos(todos.filter(todo => !todo.complete));
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (!name) {
      return;
    }
    setTodos(prevTodos =>
      [...prevTodos,
      {
        'id': uuidv4(),
        'name': name,
        'complete': false
      }
      ]
    );
    todoNameRef.current.value = null;
  }

  return (
    <>
      <TodoList todos={todos} toggleTodos={toggleTodos} />
      <br />
      <input type="text" ref={todoNameRef} placeholder="Todo" />
      <br />
      <br />
      <button onClick={handleAddTodo}>+</button>
      <br />
      <br />
      <button onClick={handleClearTodos}>Clear Completed</button>
      <br />
      <br />
      <div>{todos.filter(todo => !todo.complete).length} left</div>
    </>
  );
}

export default App;
