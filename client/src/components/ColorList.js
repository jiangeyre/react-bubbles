import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  // stretch
  const [newColor, setNewColor] = useState({
    color: '',
    code: {
      hex: ''
    }
  });

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const newColors = [...colors];
        newColors[colors.findIndex((color) => color.id === res.data.id)] = res.data;
        updateColors(newColors);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = ({id}) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${id}`)
      .then((res) => {
        updateColors(colors.filter((color) => color.id !== res.data));
      })
      .catch((err) => console.log(err));
  };

  const handleChanges = e => {
    setNewColor({
      ...newColor,
      color: e.target.value
    })
  };

  const handleHexChanges = e => {
    setNewColor({
      ...newColor,
      code: {
        hex: e.target.value
      }
    })
  };

  const addColor = (e) => {
    axiosWithAuth()
      .post('/colors', newColor)
      .then(res => {
        updateColors([...colors, newColor])
      })
      .catch(err => console.log(err));
    e.preventDefault();
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color, e)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" style={{marginTop: -425}}/>
      {/* stretch - build another form here to add a color */}
        <h1>Add a New Color!</h1>
        <form onSubmit={addColor}>
          <input 
            name="color" 
            value={newColor.color}
            onChange={handleChanges}
            placeholder='New color.'
          />
          <input 
            name="color" 
            value={newColor.code.hex}
            onChange={handleHexChanges}
            placeholder='Hex#'
          />
          <button>Add!</button>
        </form>
    </div>
  );
};

export default ColorList;
