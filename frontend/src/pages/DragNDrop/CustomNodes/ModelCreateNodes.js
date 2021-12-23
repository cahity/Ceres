import React from 'react';
import { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import { Position } from 'react-flow-renderer';
import RunButton from '../NodeButtons';
import axios from "axios";


import {
  nodeBodyStyle,
  nodeHeaderStyle,
  labelStyle,
  selectStyle,
  textboxStyle,
} from './NodeStyles';

// Style definitions
const classHeaderStyle = {
  ...nodeHeaderStyle,
  background: "rgba(168, 64, 64, 1)",
}
const intTextboxStyle= {
  ...textboxStyle,
  width: '0.75cm',
}


const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};


export const MLPClassifier_CreateNode = ({ data }) => {
  let nodeid = `MLPClassifier_CreateNode_${data.id}`;

  const [params, setParams] = useState({
    "in_units": "",
    "out_units": "",
    "hidden_sizes": "",
    "hidden_activation": "ReLU",
    "output_activation": "Softmax",
  });

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
          {"MLP Classifier Creator"}
          <br></br>
        </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>
        <label for="in_units" style={labelStyle}>In Units: &nbsp; </label>
        <input
          name="in_units"
          style={intTextboxStyle}
          onChange={(event) => {
            setParams({...params, "in_units": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="out_units" style={labelStyle}>Out Units: &nbsp; </label>
        <input
          name="out_units"
          style={intTextboxStyle}
          onChange={(event) => {
            setParams({...params, "out_units": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="hidden_sizes" style={labelStyle}>Hidden Sizes: &nbsp; </label>
        <input
          name="hidden_sizes"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "hidden_sizes": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="hidden_activation" style={labelStyle}>Hidden Activation: &nbsp; </label>
        <select
          name="hidden_activation"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "hidden_activation": event.target.value});
          }}
        >
          <option value='ReLU'>ReLU</option>
        </select>
        <br></br>
        <label for="output_activation" style={labelStyle}>Output Activation: &nbsp; </label>
        <select
          name="output_activation"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "output_activation": event.target.value});
          }}
        >
          <option value='Softmax'>Softmax</option>
        </select>

        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};

export const AnomalyDetection_CreateNode = ({ data }) => {
  let nodeid = `AnomalyDetection_CreateNode_${data.id}`;

  const [params, setParams] = useState({});

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
          {"Anomaly Detection Creator"}
          <br></br>
        </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>

        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};

export const LinearRegression_CreateNode = ({ data }) => {
  let nodeid = `LinearRegression_CreateNode_${data.id}`;

  const [params, setParams] = useState({});

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
          {"Linear Regression Creator"}
          <br></br>
        </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>

        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};

export const LogisticRegression_CreateNode = ({ data }) => {
  let nodeid = `LogisticRegression_CreateNode_${data.id}`;

  const [params, setParams] = useState({});

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
          {"Logistic Regression Creator"}
          <br></br>
        </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>

        <Handle
          type="target"
          position={Position.Left}
        />
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};

export const KMeans_CreateNode = ({ data }) => {
  let nodeid = `KMeans_CreateNode_${data.id}`;

  const [params, setParams] = useState({});

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
        {"K-Means Creator"}
        <br></br>
      </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>
      <Handle
        type="target"
        position={Position.Left}
      />
      <Handle
        type="source"
        position={Position.Right}
      />
      <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};