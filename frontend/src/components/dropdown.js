import React, { useState } from "react";

function DropdownItem(props) {
  return (
    <a href="#" className="menu-item">
      {props.children}
    </a>
  );
}

function Dropdown(props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    if (props.updateTitle) {
      setTitle(item.text);
    }

    setSelectedIndex(item.id);
    props.onItemClicked(props.id, item.text); // it was item.id. should handle it later.
  }

  return (
    <div>
      <div role="button" onClick={() => toggle(!open)}>
        <div>
          <p>{title}</p>
        </div>
      </div>

      {open && (
        <ul className="dd-list">
          {props.items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;

export { DropdownItem };
