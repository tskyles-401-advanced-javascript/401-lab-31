import React, { useEffect, useState } from "react";
import uuid from "uuid/v4";
import { When } from "../if";
import Modal from "../modal";
import "./todo.scss";


const ToDo = props => {
  const [todoList, setTodoList] = useState([]);
  const [item, setItem] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    let complete = todoList.filter(item => !item.complete).length;
    let incomplete = todoList.filter(item => item.complete).length;

    document.title = `ToDo:${complete} Done:${incomplete}`;
  });

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const addItem = e => {
    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete: false };
    const newItem = Object.assign({}, item, defaults);

    setTodoList([...todoList, newItem]);
    setItem({});
    console.log(todoList);
  };

  const deleteItem = id => {
    setTodoList(todoList.filter(item => item._id !== id));
  };

  const saveItem = updatedItem => {
    setTodoList(
      todoList.map(item => (item._id === updatedItem._id ? updatedItem : item))
    );
  };

  const toggleComplete = id => {
    let item = todoList.filter(i => i._id === id)[0] || {};
    if (item._id) {
      item.complete = !item.complete;
      saveItem(item);
    }
  };

  const toggleDetails = id => {
    let showDetailsState = !showDetails;
    let itemDetails = todoList.filter(item => item._id === id)[0] || {};

    setDetails(itemDetails);
    setShowDetails(showDetailsState);
  };

  return (
    <>
      <header>
        <h2>
          There are
          {todoList.filter(item => !item.complete).length}
          Items To Complete
        </h2>
      </header>

      <section className="todo">
        <div>
          <h3>Add Item</h3>
          <form onSubmit={addItem}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input
                type="range"
                min="1"
                max="5"
                name="difficulty"
                defaultValue="3"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Assigned To</span>
              <input
                type="text"
                name="assignee"
                placeholder="Assigned To"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Due</span>
              <input type="date" name="due" onChange={handleInputChange} />
            </label>
            <button>Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            {todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
                <span onClick={() => toggleComplete(item._id)}>
                  {item.text}
                </span>
                <button onClick={() => toggleDetails(item._id)}>Details</button>
                <button onClick={() => deleteItem(item._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={showDetails}>
        <Modal title="To Do Item" close={toggleDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.assignee}</span>
              <span>Due: {details.due}</span>
            </header>
            <div className="item">{details.text}</div>
          </div>
        </Modal>
      </When>
    </>
  );
};

export default ToDo;
