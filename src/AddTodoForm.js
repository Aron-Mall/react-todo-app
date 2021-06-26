import './AddTodoForm.css'


function AddTodoForm(props){
  const {todo, longitude, latitude, onTodoChange, onLatitudeChange, onLongitudeChange, onFormSubmit, validationMsg} = props;

  return (
    <form onSubmit={onFormSubmit} className="form-todo">
      

      <i class="fas fa-plus-circle" id="todo-submit" onClick={onFormSubmit}></i>
      <div className="form-group-add">
      <label htmlFor="todo">Todo</label>
      <input id="todo" type="text" value={todo}
             placeholder="Enter Todo..." 
             onChange={onTodoChange} 
             autoComplete="off"
             />
      <label htmlFor="lng">Longitude:</label>
      <input type="text" 
             id="lng" 
             placeholder="Enter longitude..."
             value={longitude} 
             onChange={onLongitudeChange}
             autoComplete="off"
             />

      <label htmlFor="lat">Latitude:</label>  
      <input type="text" 
             id="lat" 
             value={latitude}
             onChange={onLatitudeChange}
             placeholder="Enter latitude..."
             autocomplete="off"
             />
             
      
      </div>
      <p class="validation">{validationMsg}</p>
      {/* <input type="submit" value="Add" /> */}
    </form>
  )
}

export default AddTodoForm