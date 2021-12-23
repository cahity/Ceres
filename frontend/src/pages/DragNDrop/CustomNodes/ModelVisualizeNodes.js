import wazowski from "./images/wazowski.jpg";
import { Handle } from 'react-flow-renderer';
import { Position } from 'react-flow-renderer';
import React, { useState } from 'react';
import axios from "axios";
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
  background: "rgba(66, 194, 69, 1)",
  
}

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};

export const MLPClassifier_VisualizeNode = ({ data }) => {
  let nodeid = `MLPClassifier_VisualizeNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "loss",
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
            {"MLP Classifier Visualizer"}
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
          <option value='loss'>loss</option>
          <option value='decision'>decision</option>
        </select>
        <div id = "image_generated">
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible }}></img>
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

export const LinearRegression_VisualizeNode = ({ data }) => {
  let nodeid = `LinearRegression_VisualizeNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "loss",
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
          {"Linear Regression Visualizer"}
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
          <option value='loss'>loss</option>
          <option value='line'>line</option>
        </select>
        <div id = "image_generated">
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible }}></img>
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

export const LogisticRegression_VisualizeNode = ({ data }) => {
  let nodeid = `LogisticRegression_VisualizeNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "loss",
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
          {"Logistic Regression Visualizer"}
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
          <option value='loss'>loss</option>
          <option value='accuracy'>accuracy</option>
          <option value='decision'>decision</option>
        </select>
        <div id = "image_generated">
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible }}></img>
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

export const KMeans_VisualizeNode = ({ data }) => {
  let nodeid = `KMeans_VisualizeNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "centers",
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
          {"K-Means Visualizer"}
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
          <option value='centers'>centers</option>
        </select>
        
        <div id = "image_generated">
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible }}></img>
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

export const AnomalyDetection_VisualizeNode = ({ data }) => {
  let nodeid = `AnomalyDetection_VisualizeNode_${data.id}`

  const [visible , setVisible] = useState("none");
  const [img_link , setImg_link] = useState(wazowski);

  const [params, setParams] = useState({
    "option": "scatter",
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
          {"Anomaly Detection Visualizer"}
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
          <option value='scatter'>scatter</option>
        </select>
        
        <div id = "image_generated">
          <a href = {`http://${img_link}`} target="_blank">
        <img name = "out" src = {`http://${img_link}`} draggable="false" style={{display: visible }}></img>
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
