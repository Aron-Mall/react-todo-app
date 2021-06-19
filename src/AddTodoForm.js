import './AddTodoForm.css'


function AddTodoForm(props){
  const {todo, onTodoChange, onFormSubmit, validationMsg} = props;

  return (
    <form onSubmit={onFormSubmit} className="form-todo">
      <label htmlFor="todo">Todo</label>
      <div className="form-group-add">
      <input id="todo" type="text" value={todo}
             placeholder="Enter Todo..." 
             onChange={onTodoChange} 
             autoComplete="off"
             />
      <i class="fas fa-plus-circle" onClick={onFormSubmit}></i>
      </div>
      <p class="validation">{validationMsg}</p>
      {/* <input type="submit" value="Add" /> */}
    </form>
  )
}

export default AddTodoForm