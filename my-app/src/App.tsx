import React, { useEffect, useState } from 'react';
import './App.css';
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import { addTodo, deleteTodo, getTodos, updateTodo } from './API';

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([])

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
      .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
    e.preventDefault()
    addTodo(formData)
      .then(({ status, data }) => {
        if (status !== 201) {
          throw new Error("Error! Todo not saved")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const handleUpdateTodo = (todo: ITodo) => {
    updateTodo(todo)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error("Error! Todo not deleted")
        }
        setTodos(data.todos)
      })
      .catch(err => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <AddTodo saveTodo={handleSaveTodo}></AddTodo>
      {
        todos.map((todo: ITodo) => (
          <TodoItem
            todo={todo}
            key={todo._id}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}></TodoItem>
        ))
      }
    </main >
  )
}

export default App;
