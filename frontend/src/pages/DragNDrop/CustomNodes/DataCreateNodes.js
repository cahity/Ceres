import React from 'react';
import { useState, useMemo, useEffect } from 'react';
import { Handle } from 'react-flow-renderer';
import { Position } from 'react-flow-renderer';
import axios from "axios";

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
  background: "rgba(170, 111, 214, 1)",
}

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};


export const CSV_XY_DataNode = ({ data }) => {
  let nodeid = `CSV_XY_DataNode_${data.id}`;

  const [datasets, setDsets] = useState([]);
  useEffect(() => {
    let d_sets = []
    axios
      .get("http://127.0.0.1:8090/api/datasets", config)
      .then((res) => {
        var jsonLength = Object.keys(res.data).length;

        for (var i = 0; i < jsonLength; i++) {
          d_sets.push(
            <option value={res.data[i].name}>{res.data[i].name}</option>
          );
        }

        setDsets([d_sets]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [params, setParams] = useState({
    "path": "",
    "X_columns": "",
    "Y_column": "",
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
          {"CSV XY Creator"}
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="path" style={labelStyle}>CSV Filepath: &nbsp; </label>
        <select
          name="path"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "path": event.target.value});
          }}
        >
          <option value=''></option>
          {datasets}
        </select>
        <br></br>
        <label for="X_columns" style={labelStyle}>X Columns: &nbsp; </label>
        <input
          name="X_columns"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "X_columns": event.target.value});
          }}
        ></input>
        <br></br>
        <label for="Y_column" style={labelStyle}>Y Columns: &nbsp; </label>
        <input
          name="Y_column"
          style={textboxStyle}
          onChange={(event) => {
            setParams({...params, "Y_column": event.target.value});
          }}
        ></input>
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};

export const CSV_X_DataNode = ({ data }) => {
  let nodeid = `CSV_X_DataNode_${data.id}`;

  const [datasets, setDsets] = useState([]);
  useEffect(() => {
    let d_sets = []
    axios
      .get("http://127.0.0.1:8090/api/datasets", config)
      .then((res) => {
        var jsonLength = Object.keys(res.data).length;

        for (var i = 0; i < jsonLength; i++) {
          d_sets.push(
            <option value={res.data[i].name}>{res.data[i].name}</option>
          );
        }

        setDsets([d_sets]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const [params, setParams] = useState({
    "path": "",
    "X_columns": "",
  });

  function run() {
    let we_id = parseInt(localStorage.getItem('we_id') || '0');
    let node_id = data.id;
    let type = data.type;

    var body = {
      "optype": type,
      ...params,
    }

    console.log("NODE", body);

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
          {"CSV X Creator"}
          <br></br>
        </center>
      </div>

      <div style={nodeBodyStyle} id={nodeid}>
        <label for="path" style={labelStyle}>CSV Filepath: &nbsp; </label>
        <select
          name="path"
          style={selectStyle}
          onChange={(event) => {
            setParams({...params, "path": event.target.value});
          }}
        >
          <option value=''></option>
          {datasets}
        </select>
        <br></br>
        <label for="X_columns" style={labelStyle}>X Columns: &nbsp; </label>
        <input
          name="X_columns"
          style={textboxStyle}
          onInput={(event) => {
            setParams({...params, "X_columns": event.target.value});
          }}
        ></input>
        <Handle
          type="source"
          position={Position.Right}
        />
        <RunButton run={run}></RunButton>
      </div>
    </div>
  );
};
