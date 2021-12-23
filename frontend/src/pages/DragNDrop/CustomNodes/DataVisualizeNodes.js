import ReactFlow, { Handle, Position, OnLoadParams } from 'react-flow-renderer';
import React, { useState } from 'react';
import axios from "axios";
import wazowski from "./images/wazowski.jpg";

import RunButton, { RunShowButton } from '../NodeButtons';
import {
  nodeBodyStyle,
  nodeHeaderStyle,
  labelStyle,
  selectStyle,
  textboxStyle,
} from './NodeStyles';

const classHeaderStyle = {
  ...nodeHeaderStyle,
  background: "rgba(184, 159, 90, 1)",
}

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};

export const ScatterPlotNode = ({ data }) => {
  let nodeid = `ScatterPlotNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "2d",
  });

  function greetUser() {
    if (data["out_img"]){
      console.log("IN DOC:", data["out_img"]);
      setImg_link(data["out_img"]);
    }
    else{
      console.log("IN DOC: no path");
    }

    if(visible === "none"){
      setVisible("inline-block")
    }
    else{
      setVisible("none");
    }
  }

  function run() {
    let we_id = parseInt(localStorage.getItem('we_id') || '0');
    let node_id = data.id;
    let type = data.type;

    var body = {
      "optype": type,
      ...params,
    }

    axios
    .patch(`http://127.0.0.1:8090/api/environments/${we_id}/ops/${node_id}`, body, config)
    .then((res) => {
      body["op_id"] = node_id.toString();
      console.log(body);
      axios
        .post(`http://127.0.0.1:8090/api/environments/${we_id}/run`, body, config)
        .then((res) => {
          console.log(res);
          if (res.data["path"]){
            data["out_img"] = res.data["path"];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <div style={classHeaderStyle}>
        <center>
          {"Scatter Plotter"}
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="option" style={labelStyle}>Option: &nbsp; </label>
        <select
          name="option"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "option": event.target.value});
          }}
        >
          <option value='2d'>2d</option>
          <option value='3d'>3d</option>
        </select>
        <div>
        </div>
        <div id = "image_generated" style={{textAlign: "center"}}>
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible}} class="center"></img>
        </a>
        </div>
        <Handle
          type="target"
          position={Position.Left}
        />
        <RunButton run={run} greet={greetUser} show={true} />
      </div>
    </div>
  );
};
