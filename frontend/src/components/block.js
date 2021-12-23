import React from "react";
import TextBox from "./textBox";
// import Dropdown, { DropdownItem } from "./dropdown";
import Checkbox from "./checkboxParameter";

class Block extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnParameterChanged = this.handleOnParameterChanged.bind(this);

    this.state = {
      parameterConfig: props.parameters.map((item) => ({
        key: item.id,
        value: -1,
      })),
    };
  }

  handleOnParameterChanged(parameterId, selectedOptionId) {
    let newConfig = this.state.parameterConfig;

    for (var i = 0; i < newConfig.length; i++) {
      if (newConfig[i].key === parameterId) {
        newConfig[i].value = selectedOptionId;
      }
    }

    this.setState({ parameterConfig: newConfig });

    const requestOptions = {
      method: "PATCH",
      body: JSON.stringify({
        resourcetype: this.props.id,
        [parameterId]: selectedOptionId,
      }),
    };
    console.log(requestOptions.body);

    fetch(
      "http://127.0.0.1:8090/api/1/environments/1/ops/" + this.props.index,
      requestOptions
    )
      .then(async (response) => {
        const data = await response.json();
        console.log(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  render() {
    return (
      <div>
        <div className="blockItemContainer">
          <div>
            <div>
              <p>{this.props.title}</p>
            </div>
          </div>

          <ul className="parameterList">
            {this.props.parameters.map((item) => (
              <li className="parameterItem" key={item.id}>
                <Dropdown
                  title={"Select parameter"}
                  items={item.options}
                  onItemClicked={this.handleOnParameterChanged}
                  updateTitle={true}
                  id={item.id}
                ></Dropdown>
              </li>
            ))}
            {this.props.checkboxParameters.map((item) => (
              <li className="parameterItem" key={item.id}>
                <Checkbox title={item.text} />
              </li>
            ))}
            {this.props.textboxParameters.map((item) => (
              <li className="parameterItem" key={item.id}>
                <TextBox />
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => this.props.handleRemoveBlock(this.props.index)}
          >
            <span>Remove</span>
          </button>
        </div>
      </div>
    );
  }
}

export default Block;
