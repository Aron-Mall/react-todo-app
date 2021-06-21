import {useState, useEffect} from "react"
import './TodoApp.css';
import AddTodoForm from './AddTodoForm.js'
import TodoList from './TodoList.js'

function TodoApp() {
  const [todos, setTodos] = useState(getTodosFromLocalStorage)
  const [todo, setTodo] = useState("");
  const [validationMsg, setValidationMsg] = useState("");

  useEffect(() => {
    document.title = `${todos.length} todos`
  },[todos]);

  useEffect(() => {
    window.localStorage.setItem("todos_array", JSON.stringify(todos))
  },[todos])

  function getTodosFromLocalStorage() {
    const storedTodos = window.localStorage.getItem("todos_array");

    if(storedTodos) {
      return JSON.parse(storedTodos);
    } else {
      return [];
    }
  }

  function handleTodoChange(event) {
    setTodo(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if(!todo){
      return setValidationMsg("Please enter a todo");
    }
    setTodos([...todos, todo]);
    setTodo("");
    setValidationMsg("");
  }

  function handleDeleteClick(indexToDelete) {
    setTodos(todos.filter((todo, index) => index !== indexToDelete))
  }

  return (<>
    <h1 className="heading-text">My Todo List</h1>
    <div className="container">
      <AddTodoForm todo={todo} 
                   onTodoChange={handleTodoChange} 
                   onFormSubmit={handleFormSubmit}  
                   validationMsg={validationMsg}
                   />

      <TodoList todos={todos} onDeleteClick={handleDeleteClick} />
    </div>
    </>
  );
}

export default TodoApp;
