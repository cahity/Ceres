import React, { DragEvent , useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  Controls,
  OnLoadParams,
  Elements,
  Connection,
  Edge,
  Node,
  FlowTransform
} from 'react-flow-renderer';

import Sidebar from './Sidebar';
import './dragAndDrop.css';
import './dnd.css';
import CustomNodeTypes from './CustomNodes/CustomNodes'
import axios from "axios";
import { opDefinitions } from '../../jsonRequests';

type opResponse = {
  [key: string]: any
}

const debug: any = [];
const onDragOver = (event: DragEvent) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

const config = {
  headers: {
    Authorization: "Token " + localStorage.getItem("token"),
  },
};


const DnDFlow = () => {
  const [we_id, setWeId] = useState(parseInt(localStorage.getItem('we_id') || '0'));
  const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
  const [elements, setElements] = useState<Elements>(debug);

  const onRun = (instance: OnLoadParams<any>, id: number) => {
    let node = instance.getElements().filter(
      item => parseInt(item.id) == id
    )[0];

    let type = opDefinitions[node.type!.toString()].optype;
    var body: { [key: string]: string | number } = {
      "optype": type
    }

    // let elm = document.getElementById(
    //   node.type!.toString().concat('_'.concat(node.id.toString()))
    // );
    // let selects = Array.from(elm!.getElementsByTagName("select"));
    // let inputs = Array.from(elm!.getElementsByTagName("input"));
    // console.log(node.type!.toString().concat('_'.concat(node.id.toString())));
    
    // selects.forEach(sel => {
    //   let selName = sel.name;
    //   let selInd = sel.options.selectedIndex;
    //   let selOpt = sel.options[selInd].text;
    //   body[selName] = selOpt;
    // });

    // inputs.forEach(inp => {
    //   let inpName = inp.name;
    //   let inpOpt = inp.value;
    //   body[inpName] = inpOpt;
    // });
    
    // axios
    // .patch(`http://127.0.0.1:8090/api/environments/${we_id}/ops/${node.id}`, body, config)
    // .then((res) => {
    //   body["op_id"] = node.id.toString();
    //   console.log(body);
    //   axios
    //     .post(`http://127.0.0.1:8090/api/environments/${we_id}/run`, body, config)
    //     .then((res) => {
    //       console.log(res);
    //       if (res.data["path"]){
    //         node.data["out_img"] = res.data["path"];
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  const onNodeDragStop = (event: any, node: Node) => {
    let type = opDefinitions[node.type!.toString()].optype;

    var body: { [key: string]: string | number } = {}
    body = {
      'optype': type,
      'pos_x': node.position.x,
      'pos_y': node.position.y,
    }

    axios
    .patch(`http://127.0.0.1:8090/api/environments/${we_id}/ops/${node.id}`, body, config)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
  };

  const onMoveEnd = (flowTransform?: FlowTransform | undefined) => {
    if (!flowTransform){
      return;
    }

    const body = {
      "pos_x": flowTransform.x,
      "pos_y": flowTransform.y,
      "zoom": flowTransform.zoom,
    }

    axios
      .patch(`http://127.0.0.1:8090/api/environments/${we_id}`, body, config)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const onConnect = (params: Connection | Edge) => {
    if (!params.source || !params.target){
      return;
    }
    console.log(params);

    var body: { [key: string]: string | number } = {}
    body = {
      "method": "add",
      "in_op": params.target!,
      "out_op": params.source!,
    }

    axios
    .post(`http://127.0.0.1:8090/api/updateoplink/${we_id}`, body, config)
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });

    setElements((els) => addEdge(params, els));

    axios
      .get(`http://127.0.0.1:8090/api/environments/${we_id}/ops`, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onElementsRemove = (elementsToRemove: Elements) => {
    // Delete from backend
    if (!reactFlowInstance) {
      return;
    }

    elementsToRemove.forEach(element => {
      console.log(element);
      const elmType = element.type;
      
      if (elmType == undefined) {
        return;
      }

      // If element is edge
      if (element.id.includes("edge"))
      {
        var body: { [key: string]: string | number } = {}
        body = {
          "method": "delete",
          "in_op": (element as Edge).target!,
          "out_op": (element as Edge).source!,
        }

        axios
        .post(`http://127.0.0.1:8090/api/updateoplink/${we_id}`, body, config)
        .then((res) => {
          // Delete from frontend
          setElements((els) => removeElements([element], els));
        })
        .catch((err) => {
          console.log(err);
        });
        return;
      }

      // Else element is node
      axios
      .delete(`http://127.0.0.1:8090/api/environments/${we_id}/ops/${element.id}`, config)
      .then((res) => {
        // Delete from frontend
        setElements((els) => removeElements([element], els));
      })
      .catch((err) => {
        console.log(err);
      });
    });
  };

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    // Generate old ops
    axios
      .get(`http://127.0.0.1:8090/api/environments/${we_id}/ops`, config)
      .then((res) => {
        const old_ops: Array<opResponse> = res.data;
        
        let newNodes = old_ops.map((op) => {
          // Get type from op definitions
          let type = Object.keys(opDefinitions).filter(
            item => opDefinitions[item].optype === op["optype"]
          )[0];

          // Create new node
          let newNode: Node = {
            id: op["id"].toString(),
            type: type,
            position: {x: op["pos_x"], y: op["pos_y"]},
            data: { id: op["id"].toString(), runCallback: onRun, instance: _reactFlowInstance },
          }
          return newNode;
        });

        // Add links
        old_ops.map((op) => {
          let linkKeys: string[] = Object.keys(op).filter(
            item => item.includes('_op')
          );
          if (linkKeys.length > 0 && linkKeys[0] != "-1")
          {
            const newEdge: Connection = {
              source: op[linkKeys[0]].toString(),
              target: op["id"].toString(),
              sourceHandle: null,
              targetHandle: null,
            };
            setElements((els) => addEdge(newEdge, els));
          }
        });
        
        // Add all new nodes
        setElements((els) => els.concat(newNodes));
      })
      .catch((err) => {
        console.log("OPS", err);
      });

    axios
      .get(`http://127.0.0.1:8090/api/environments/${we_id}`, config)
      .then((res) => {
        let oldTransform: FlowTransform = {
          x: res.data["pos_x"],
          y: res.data["pos_y"],
          zoom: res.data["zoom"]
        }
        _reactFlowInstance.setTransform(oldTransform);
      })
      .catch((err) => {
        console.log("WE", err);
      });

    setReactFlowInstance(_reactFlowInstance);
  };

  const onDrop = (event: DragEvent) => {
    // event.preventDefault();

    if (!reactFlowInstance) {
      return;
    }

    const type = event.dataTransfer.getData('application/reactflow');
    const op = opDefinitions[type];
    
    if (op == null){
      return;
    }

    // Request body
    var body: { [key: string]: string | number } = {}
    // Set parameters empty
    // op.parameters.map((p) => {
    //   body[p] = "";
    // })
    
    // Set body elements
    // TODO: body elements are the keys in definition except parameters
    var bodyElms = ["optype", "title", "description"]
    bodyElms.forEach(element => {body[element] = op[element];});

    const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
    body['pos_x'] = position.x;
    body['pos_y'] = position.y;

    console.log(body);
    console.log(config);

    // Post request, add node if successfull
    axios
    .post(`http://127.0.0.1:8090/api/environments/${we_id}/ops`, body, config)
    .then((res) => {
      console.log(res.data["id"]);
      const newNode: Node = {
        id: res.data["id"].toString(),
        type,
        position,
        data: { id: res.data["id"].toString(), runCallback: onRun, instance: reactFlowInstance },
      };

      setElements((els) => els.concat(newNode));
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const bg = {
    background: "white",
    // backgroundImage: "linear-gradient(gray .01em, transparent .1em), linear-gradient(90deg, gray .01em, transparent .1em)",
    // backgroundSize: "1.5em 1.5em",
  };

  return (
    <div className="dndflow" style={bg}>
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onNodeDragStop={onNodeDragStop}
            // onNodeDoubleClick={onNodeDoubleClick}
            onDragOver={onDragOver}
            onMoveEnd={onMoveEnd}
            nodeTypes = {CustomNodeTypes}
            deleteKeyCode={46}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
        <Sidebar />
    </div>
  );
};

export default DnDFlow;
