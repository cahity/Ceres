import React from 'react';

// Style for node
const nodeStyle = {
  paddingRight: 10,
  paddingLeft: 10,
  width: "250px",
}
const nodeBodyStyle = {
  ...nodeStyle,
  padding: 10,
  borderRadius: '0px 0px 10px 10px',
  background: 'rgba(70,78,92,0.95)',
  color: '#000',
}
const nodeHeaderStyle = {
  ...nodeStyle,
//   background: 'rgba(170, 111, 214,1)',
  // background: 'rgba(197,117,58,1)',
  borderRadius: '10px 10px 0px 0px',
  color: '#000'
};

// Style for inner elements
const labelStyle = {
  color: '#fff',
  fontSize: '12px',
}
const itemStyle = {
  position: 'absolute',
  right: '10px',
  borderRadius: '6px',
  border: '1px solid',
  onclick: 'this.focus();this.select()',
}
const selectStyle = {
  ...itemStyle,
  marginBottom: 5,
  width: '3.5cm',
}
const textboxStyle = {
  ...itemStyle,
  marginTop: 3,
  marginBottom: 3,
  width: '1.9cm',
}

export {
    nodeBodyStyle,
    nodeHeaderStyle,
    labelStyle,
    selectStyle,
    textboxStyle,
};