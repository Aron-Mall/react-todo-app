import { useState, useEffect, useLayoutEffect } from "react"
import './TodoApp.css';
import AddTodoForm from './AddTodoForm.js'
import TodoList from './TodoList.js'
import Map from "./Map"
import mapboxgl from "!mapbox-gl";

function TodoApp() {
  const [todos, setTodos] = useState(getTodosFromLocalStorage)
  const [todo, setTodo] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [marker, setMarker] = useState();

  useLayoutEffect(() => {

    mapboxgl.accessToken = process.env.REACT_APP_AT;

    const map = new mapboxgl.Map({
      container: "map",
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [-0.127758, 51.507351],
      zoom: 9
    })

    const marker = new mapboxgl.Marker();
    marker.setLngLat([-0.127758, 51.507351])
    marker.addTo(map)

    setMarker(marker)

  }, [])

  useEffect(() => {
    document.title = `${todos.length} todos`
  }, [todos]);

  useEffect(() => {
    window.localStorage.setItem("todos_array", JSON.stringify(todos))
  }, [todos])

  function getTodosFromLocalStorage() {
    const storedTodos = window.localStorage.getItem("todos_array");

    if (storedTodos) {
      return JSON.parse(storedTodos);
    } else {
      return [];
    }
  }

  function handleTodoChange(event) {
    setTodo(event.target.value);
  }

  function handleLongitudeChange(event) {
    setLongitude(event.target.value);
  }

  function handleLatitudeChange(event) {
    setLatitude(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!todo) {
      return setValidationMsg("Please enter a todo");
    }

    const newTodo = {
      text: todo,
      longitude,
      latitude
    }
    setTodos([...todos, newTodo]);
    marker.setLngLat([longitude, latitude])
    setTodo("");
    setLongitude("");
    setLatitude("");
    setValidationMsg("");

  }

  function handleDeleteClick(indexToDelete) {
    setTodos(todos.filter((todo, index) => index !== indexToDelete))
  }

  function handleLocationChange(event) {
    const lngLat = event.target.value.split(',')
    marker.setLngLat(lngLat)
  }

  return (<>
    <h1 className="heading-text">My To-do List</h1>
    <div className="main-container">
      <div className="todo-container">
        <AddTodoForm todo={todo}
          longitude={longitude}
          latitude={latitude}
          onTodoChange={handleTodoChange}
          onFormSubmit={handleFormSubmit}
          onLongitudeChange={handleLongitudeChange}
          onLatitudeChange={handleLatitudeChange}
          validationMsg={validationMsg}
        />

        <TodoList todos={todos} onDeleteClick={handleDeleteClick} />
      </div>
      <div className="map-container">
        <Map todos={todos}
          onLocationChange={handleLocationChange} />
      </div>
    </div>
  </>
  );
}

export default TodoApp;
