import './TodoList.css'

function TodoList(props) {
  const {todos, onDeleteClick} = props;
  return(
    <ul className="todo-list">
      {todos.map((todo, index) => (<div className="todo">
        <li key={index}>{todo.text}</li>

        <i class="far fa-trash-alt" onClick={(event) => onDeleteClick(index)}></i>

        </div>))}
    </ul>
  )
}

export default TodoList