//import React, {useState} from 'react';
import {useState,useEffect} from 'react'
import './App.css';
import {getTodos} from './actions/todos';
import { postTodo } from './actions/todos';
import { putTodo } from './actions/todos';
import { deleteTodo } from './actions/todos';
// const todos = [
//   {
//   id:1,
//   description: 'say hello',
//   isDone: false
// },  {
//   id:2,
//   description: 'say hello again',
//   isDone: false
// }
// ]


function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
useEffect(()=>{
  getData()
},[])

const getData = () =>{
  getTodos().then(res =>{
 setTodos(res)
  })
}

const addTodo = () =>{
 postTodo(todo).then(()=>{
 getData()
 })
 setTodo('')
}

const completeTodo = (todo) =>{
  const newTodo = {...todo, isDone: true}
putTodo(newTodo).then(()=>{
  getData()
})
}

const removeTd = (id) =>{
deleteTodo(id).then(()=>{
  getData()
})
}
  return (
    <div className="App">
      <input value={todo} onChange={(e)=> setTodo(e.target.value)} />
      <button onClick={()=> addTodo()}>Submit</button>
       {
        todos.map((todo,index)=>(
          <div key={index}>
            <span className={todo.isDone ? 'done': ''}>{todo.description}</span>
            <span>
              {todo.isDone ? <button onClick={()=>removeTd(todo.id)}>Delete</button> : <button onClick={()=>completeTodo(todo)}>Complete</button>}
            </span>
          </div>
        ))
       }

    </div>
  );
}

export default App;
