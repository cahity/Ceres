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

const classHeaderStyle = {
  ...nodeHeaderStyle,
  background: "rgba(69, 106, 176, 1)",
}
// Style definitions

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};


export const MLPClassifier_TrainNode = ({ data }) => {
  let nodeid = `MLPClassifier_TrainNode_${data.id}`

  const [params, setParams] = useState({
    "lr": "",
    "optimizer": "",
    "epoch": "",
    "batch_size": "",
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
          {"MLP Classifier Trainer"}
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="lr" style={labelStyle}>Learning Rate: &nbsp; </label>
        <input
          name="lr"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "lr": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="optimizer" style={labelStyle}>Optimizer: &nbsp; </label>
        <select
          name="optimizer"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "optimizer": event.target.value});
          }}
        >
          <option value='SGD'>SGD</option>
          <option value='Adam'>Adam</option>
        </select>
        <br></br>
        <label for="epoch" style={labelStyle}>Epoch Number: &nbsp; </label>
        <input
          name="epoch"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "epoch": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="batch_size" style={labelStyle}>Batch Size: &nbsp; </label>
        <input
          name="batch_size"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "batch_size": event.target.value});
          }}
        ></input>
        <br></br>
        
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

export const AnomalyDetection_TrainNode = ({ data }) => {
  let nodeid = `AnomalyDetection_TrainNode_${data.id}`

  const [contamination, setCont] = useState("");
  const [params, setParams] = useState({
    "contamination": contamination,
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
          {"Anomaly Detection Trainer"}
          <br></br>
        </center>
      </div>
      <div style={nodeBodyStyle} id={nodeid}>
        <label for="contamination" style={labelStyle}>Contamination: &nbsp; </label>
        <input
          name="contamination"
          style={textboxStyle}
          onChange={(event) => {
            setCont(event.target.value);
            setParams({...params, "contamination": contamination});
          }}
        ></input>
        <br></br>
        
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

export const LinearRegression_TrainNode = ({ data }) => {
  let nodeid = `LinearRegression_TrainNode_${data.id}`

  const [params, setParams] = useState({
    "lr": "",
    "optimizer": "SGD",
    "epoch": "",
    "batch_size": "",
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
        {"Linear Regression Trainer"}
        <br></br>
      </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="lr" style={labelStyle}>Learning Rate: &nbsp; </label>
        <input
          name="lr"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "lr": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="optimizer" style={labelStyle}>Optimizer: &nbsp; </label>
        <select
          name="optimizer"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "optimizer": event.target.value});
          }}
        >
          <option value='SGD'>SGD</option>
          <option value='Adam'>Adam</option>
        </select>
        <br></br>
        <label for="epoch" style={labelStyle}>Epoch Number: &nbsp; </label>
        <input
          name="epoch"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "epoch": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="batch_size" style={labelStyle}>Batch Size: &nbsp; </label>
        <input
          name="batch_size"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "batch_size": event.target.value});
          }}
        ></input>
        <br></br>
        
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

export const LogisticRegression_TrainNode = ({ data }) => {
  let nodeid = `LogisticRegression_TrainNode_${data.id}`

  const [params, setParams] = useState({
    "lr": "",
    "optimizer": "SGD",
    "epoch": "",
    "batch_size": "",
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
        {"Logistic Regression Trainer"}
        <br></br>
      </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="lr" style={labelStyle}>Learning Rate: &nbsp; </label>
        <input
          name="lr"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "lr": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="optimizer" style={labelStyle}>Optimizer: &nbsp; </label>
        <select
          name="optimizer"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "optimizer": event.target.value});
          }}
        >
          <option value='SGD'>SGD</option>
          <option value='Adam'>Adam</option>
        </select>
        <br></br>
        <label for="epoch" style={labelStyle}>Epoch Number: &nbsp; </label>
        <input
          name="epoch"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "epoch": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="batch_size" style={labelStyle}>Batch Size: &nbsp; </label>
        <input
          name="batch_size"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "batch_size": event.target.value});
          }}
        ></input>
        <br></br>
        
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

export const KMeans_TrainNode = ({ data }) => {
  let nodeid = `KMeans_TrainNode_${data.id}`

  const [params, setParams] = useState({
    "k": "",
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
         {"K-Means Trainer"} 
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
      <label for="k" style={labelStyle}>Cluster number: &nbsp; </label>
      <input
        name="k"
        style={textboxStyle}
        onChange={(event) => {
          setParams({...params, "k": event.target.value});
        }}
      ></input>
      <br></br>
      
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