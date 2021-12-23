import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import { Position } from 'react-flow-renderer';
import axios from "axios";

// Style definitions
import RunButton from '../NodeButtons';
import {
  nodeBodyStyle,
  nodeHeaderStyle,
  labelStyle,
  selectStyle,
  textboxStyle,
} from './NodeStyles';

const classHeaderStyle = {
  ...nodeHeaderStyle,
  background: "rgb(111, 181, 214, 1)",
}

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};


export const LabelsToOneHotNode = ({ data }) => {
  let nodeid = `LabelsToOneHotNode_${data.id}`

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
          {"One-Hot Labeler"}
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
        <RunButton run={run}/>
      </div>
    </div>
  );
};

export const LabelIndexerNode = ({ data }) => {
  let nodeid = `LabelIndexerNode_${data.id}`

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
          {"Label Indexer"}
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
        <RunButton run={run}/>
      </div>
    </div>
  );
};

export const DataShuffleNode = ({ data }) => {
  let nodeid = `DataShuffleNode_${data.id}`

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
          {"Data Shuffler"}
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
        <RunButton run={run}/>
      </div>
    </div>
  );
};

export const DataScaleNode = ({ data }) => {
  let nodeid = `DataScaleNode_${data.id}`

  const [params, setParams] = useState({
    "option": "standard",
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
          {"Data Scaler"}
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="option" style={labelStyle}>Scaling Option: &nbsp; </label>
        <select
          name="option"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "option": event.target.value});
          }}
        >
          <option value='standard'>standard</option>
          <option value='min-max'>min-max</option>
          <option value='robust'>robust</option>
        </select>
        <Handle
          type="source"
          position={Position.Right}
        />
        <Handle
            type="target"
            position={Position.Left}
        />
        <RunButton run={run}/>
      </div>
    </div>
  );
};
