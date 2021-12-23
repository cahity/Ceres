import React from "react";
import Block from "../components/block";
import Dropdown, { DropdownItem } from "../components/dropdown";
import { operationBlocks } from "../components/definitions";

const addButtonItems = [
  {
    id: "CsvCreatorOP",
    text: "CsvCreatorOP",
  },
  {
    id: "UnknownOP",
    text: "UnknownOP",
  },
];

class WorkEnvironment extends React.Component {
  constructor(props) {
    super(props);
    this.onDropdownItemClicked = this.onDropdownItemClicked.bind(this);
    this.handleRemoveBlock = this.handleRemoveBlock.bind(this);
    this.handleOnParameterChanged = this.handleOnParameterChanged.bind(this);
    this.handleExecuteRun = this.handleExecuteRun.bind(this);
    this.state = {
      blocks: [],
    };

    // Adding/removing working environments will be handled in another page

    // Get working environment
    fetch("http://127.0.0.1:8090/api/environments/1")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // Get operation blocks
    fetch("http://127.0.0.1:8090/api/environments/1/ops")
      .then(async (response) => {
        const data = await response.json();
        var jsonLength = Object.keys(data).length;

        for (var i = 0; i < jsonLength; i++) {
          console.log(data[i]);
          this.addBlock(data[i].resourcetype, true, data[i].id);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  handleRemoveBlock(id) {
    console.log(id);

    const blocks = this.state.blocks;

    const requestOptions = {
      method: "DEL",
    };

    // when DEL request is fixed, change the suffix of the below string.
    fetch(
      "http://127.0.0.1:8090/api/environments/1/ops" + "/22",
      requestOptions
    ).then((response) => response.json());

    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].props.index === id) {
        blocks.splice(i, 1);
        break;
      }
    }

    this.setState({ blocks: blocks });
  }

  // TODO: Clean up this mess.
  addBlock(blockId, isInitiating, index) {
    let opIndex = -1;
    var title;
    var parameters;

    for (var i = 0; i < operationBlocks.length; i++) {
      if (blockId === operationBlocks[i].id) {
        opIndex = i;
        title = operationBlocks[i].title;
        parameters = operationBlocks[i].parameters;
      }
    }

    if (isInitiating) {
      var block = (
        <Block
          id={blockId}
          title={title}
          parameters={parameters}
          index={index}
          handleRemoveBlock={this.handleRemoveBlock}
          handleParameterChanged={this.handleOnParameterChanged}
          checkboxParameters={operationBlocks[opIndex].checkboxParameters}
          textboxParameters={operationBlocks[opIndex].textboxParameters}
        />
      );

      const blocks = this.state.blocks.concat(block);

      this.setState({ blocks: blocks });
    } else {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          title: title,
          description: operationBlocks[opIndex].description, // change this
          resourcetype: blockId,
          file_name: "CsvCreatorOP-file_name-o0",
          object_name: "CsvCreatorOP-object_name-o0",
        }),
      };

      fetch("http://127.0.0.1:8090/api/environments/1/ops", requestOptions)
        .then(async (response) => {
          const data = await response.json();

          const blocks = this.state.blocks.concat(
            <Block
              id={blockId}
              title={title}
              parameters={parameters}
              index={data.id}
              handleRemoveBlock={this.handleRemoveBlock}
              handleParameterChanged={this.handleOnParameterChanged}
              checkboxParameters={operationBlocks[opIndex].checkboxParameters}
              textboxParameters={operationBlocks[opIndex].textboxParameters}
            />
          );

          this.setState({ blocks: blocks });
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  onDropdownItemClicked(dropdownId, clickedItemId) {
    this.addBlock(clickedItemId, false, 0);
  }

  handleOnParameterChanged() {}

  handleExecuteRun() {
    fetch("http://127.0.0.1:8090/api/environments/1/run")
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  render() {
    const listItems = this.state.blocks.map((block) => (
      <li key={block.index}>{block}</li>
    ));

    return (
      <div>
        <Dropdown
          title={"Add new block"}
          items={addButtonItems}
          onItemClicked={this.onDropdownItemClicked}
          updateTitle={false}
          id={0}
        ></Dropdown>

        <ul className="blockContainer">{listItems}</ul>

        <button type="button" onClick={() => this.handleExecuteRun()}>
          <span>Run</span>
        </button>
      </div>
    );
  }
}

export default WorkEnvironment;
