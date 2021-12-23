import React, { useState } from "react";

function TextBox(props) {
  const [value, setValue] = useState("");

  function handleChange(evt) {
    setValue(evt.target.value);
    //this.props.onChange(evt.target.value);
  }

  return (
    <input type="text" value={value} onChange={(evt) => handleChange(evt)} />
  );
}

export default TextBox;
