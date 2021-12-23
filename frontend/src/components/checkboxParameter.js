import React, { useState } from "react";

function Checkbox(props) {
  // const [checked, setChecked] = useState(false);
  // const [title, setTitle] = useState(props.title);

  // function handleOnClick(item) {}

  return (
    <div>
      <form>
        <input id={props.id} type="checkbox" />
        <label for={props.id}>{props.title}</label>
      </form>
    </div>
  );
}

export default Checkbox;
