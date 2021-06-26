import './map.css';



function Map(props) {
  const {todos, onLocationChange, mapRef} = props;


  return (<>
    <div id="map-menu">
      <p>Please Select:</p>
      <select name="" onChange={onLocationChange} >
          {todos.map((todo,i) => (
            <option key={i} value={[todo.longitude, todo.latitude]}>{todo.text}</option>
          ))}
      </select>
    </div>
    <div ref={mapRef} className="map"></div>
  </>)
}

export default Map;