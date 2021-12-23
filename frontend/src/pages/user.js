import axios from "axios";
import React from "react";
//import "./css/index.css";
//import "./css/style.css";
//import "./css/landingPage.css";
//import "./css/userPage.css";
//import "./css/dragAndDrop.css";
class User extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenWE = this.handleOpenWE.bind(this);
    this.handleCreateWE = this.handleCreateWE.bind(this);
    this.handleOpenCreateWEPopup = this.handleOpenCreateWEPopup.bind(this);
    this.handleCloseCreateWEPopup = this.handleCloseCreateWEPopup.bind(this);
    this.handleWEPopupTitleChange = this.handleWEPopupTitleChange.bind(this);
    this.handleOpenDatasetPopup = this.handleOpenDatasetPopup.bind(this);
    this.handleCloseDatasetPopup = this.handleCloseDatasetPopup.bind(this);
    this.handleCreateDataset = this.handleCreateDataset.bind(this);
    this.handleDeleteWE = this.handleDeleteWE.bind(this);
    this.handleChangeIsPublic = this.handleChangeIsPublic.bind(this);
    this.handleDeleteDataset = this.handleDeleteDataset.bind(this);
    this.handleWEPopupDescriptionChange =
      this.handleWEPopupDescriptionChange.bind(this);
    this.state = {
      isAddingWE: false,
      isAddingDataset: false,
      environments: [],
      datasets: [],
      wePopup: {
        title: "",
        description: "",
        isPublic: "",
      },
      datasetPopup: {
        title: "",
        description: "",
        file: "",
      },
    };

    const config = {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    };

    this.refreshEnvironmentList(config);
    this.refreshDatasetList(config);
  }

  getTextWidth(text, font) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    context.font = font || getComputedStyle(document.body).font;

    return context.measureText(text).width;
  }

  handleOpenWE(id) {
    localStorage.setItem("we_id", id);
    this.props.history.push("/work_environment");
  }

  handleDeleteWE(evt, id) {
    evt.stopPropagation();

    const config = {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    };

    axios
      .delete("http://127.0.0.1:8090/api/environments/" + id, config)
      .then((res) => {
        console.log(res);
        this.refreshEnvironmentList(config);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChangeIsPublic(evt, id) {
    evt.stopPropagation();

    let index;

    for (var i = 0; i < this.state.environments.length; i++) {
      if (id === this.state.environments[i].id) {
        index = i;
      }
    }

    let items = [...this.state.environments];
    let item = { ...items[index] };
    item.isPublic = !item.isPublic;
    items[index] = item;

    const config = {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    };

    const body = JSON.stringify({
      title: item.name,
      description: item.description,
      public: item.isPublic,
    });

    axios
      .patch("http://127.0.0.1:8090/api/environments/" + id, body, config)
      .then((res) => {
        console.log(res);
        this.setState({ environments: items });
      })
      .catch((err) => {
        console.log(err);
        console.log(body);
      });
  }

  handleOpenCreateWEPopup() {
    this.setState({ isAddingWE: true });
  }

  handleCloseCreateWEPopup() {
    this.setState({
      isAddingWE: false,
      wePopup: { title: "", description: "" },
    });
  }

  handleCreateWE() {
    const body = JSON.stringify({
      title: this.state.wePopup.title,
      description: this.state.wePopup.description,
    });

    const config = {
      headers: {
        Authorization: "Token " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://127.0.0.1:8090/api/environments", body, config)
      .then((res) => {
        console.log(res);
        this.refreshEnvironmentList(config);
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      isAddingWE: false,
      wePopup: { title: "", description: "" },
    });
  }

  handleWEPopupTitleChange(evt) {
    this.setState({
      wePopup: {
        title: evt.target.value,
        description: this.state.wePopup.description,
      },
    });
  }

  handleWEPopupDescriptionChange(evt) {
    this.setState({
      wePopup: {
        title: this.state.wePopup.title,
        description: evt.target.value,
      },
    });
  }

  handleOpenDatasetPopup() {
    this.setState({ isAddingDataset: true });
  }

  handleCloseDatasetPopup() {
    this.setState({
      isAddingDataset: false,
      datasetPopup: { title: "", description: "" },
    });
  }

  handleFilePick = (e) => {
    this.setState({
      datasetPopup: {
        title: this.state.datasetPopup.title,
        description: this.state.datasetPopup.description,
        file: e.target.files[0],
      },
    });
  };

  handleDeleteDataset(evt, id) {}

  handleCreateDataset() {
    const formData = new FormData();
    formData.append("file", this.state.datasetPopup.file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Token " + localStorage.getItem("token"),
      },
    };

    axios
      .post("http://127.0.0.1:8090/api/datasetUpload", formData, config)
      .then((res) => {
        console.log(res);
        this.refreshDatasetList(config);
        this.setState({ isAddingDataset: false });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshEnvironmentList(config) {
    this.setState({ environments: [] });
    axios
      .get("http://127.0.0.1:8090/api/environments", config)
      .then((res) => {
        var jsonLength = Object.keys(res.data).length;

        for (var i = 0; i < jsonLength; i++) {
          this.setState({
            environments: this.state.environments.concat({
              id: res.data[i].id,
              name: res.data[i].title,
              description: res.data[i].description,
              lastUpdated: "Updated June 23",
              isPublic: res.data[i].public,
            }),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  refreshDatasetList(config) {
    this.setState({ datasets: [] });
    axios
      .get("http://127.0.0.1:8090/api/datasets", config)
      .then((res) => {
        var jsonLength = Object.keys(res.data).length;

        for (var i = 0; i < jsonLength; i++) {
          this.setState({
            datasets: this.state.datasets.concat({
              name: res.data[i].name,
              description: "",
              lastUpdated: "Updated June 23",
            }),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const listItems = this.state.environments.map((environment) => (
      <li key={environment.id}>{environment}</li>
    ));

    return (
      <div class="userPage">
        {/* Work Environment section header */}
        <div>
          <div class="userpageHeader">
            <p class="userpageHeaderText">Work Environments</p>
            <div
              class="addWEButton"
              onClick={() => this.handleOpenCreateWEPopup()}
            >
              <b class="addWEButtonPlusMark">+</b>
            </div>
          </div>
          <hr class="userpageSeperator"></hr>
        </div>

        {/* Work environment list */}
        <ul class="row">
          {this.state.environments.map((item) => (
            <li
              className="column"
              key={item.id}
              onClick={() => this.handleOpenWE(item.id)}
            >
              <p class="cellTitle">{item.name}</p>
              <p class="cellDescription">{item.description}</p>
              <p class="cellUpdate">{item.lastUpdated}</p>
              <div
                class="deleteCellButton"
                onClick={(evt) => this.handleDeleteWE(evt, item.id)}
              >
                <p class="deleteCellButtonText">Delete</p>
              </div>
              <div
                class="makePublicButton"
                onClick={(evt) => this.handleChangeIsPublic(evt, item.id)}
              >
                <p class="makePublicButtonText">
                  {item.isPublic ? "Make Private" : "Make Public"}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Dataset section header */}
        <div>
          <div class="userpageHeader">
            <p class="userpageHeaderText">Datasets</p>
            <div
              class="addDatasetButton"
              onClick={() => this.handleOpenDatasetPopup()}
            >
              <b class="addWEButtonPlusMark">+</b>
            </div>
          </div>
          <hr class="userpageSeperator"></hr>
        </div>

        {/* Dataset list */}
        <ul class="row">
          {this.state.datasets.map((item) => (
            <li className="column">
              <p class="cellTitle">{item.name}</p>
              <p class="cellDescription">{item.description}</p>
              <p class="cellUpdate">{item.lastUpdated}</p>
              <div
                class="deleteCellButton"
                onClick={(evt) => this.handleDeleteDataset(evt, item.id)}
              >
                <p class="deleteCellButtonText">Delete</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Add work environment popup */}
        {this.state.isAddingWE && (
          <div class="popupbackground">
            <div class="popupframe">
              <p class="popupTitle">Create a Work Environment</p>
              <p class="popupFieldName">Title</p>
              <input
                value={this.state.wePopup.title}
                onChange={(evt) => this.handleWEPopupTitleChange(evt)}
              />
              <p class="popupFieldName">Description</p>
              <input
                value={this.state.wePopup.description}
                onChange={(evt) => this.handleWEPopupDescriptionChange(evt)}
              />
              <div
                class="popupCreateButton"
                onClick={() => this.handleCreateWE()}
              >
                <p class="popupCreateButtonText">Create</p>
              </div>
              <div
                class="popupCloseButton"
                onClick={() => this.handleCloseCreateWEPopup()}
              >
                <b class="popupCloseButtonXMark">X</b>
              </div>
            </div>
          </div>
        )}

        {/* Add dataset popup */}
        {this.state.isAddingDataset && (
          <div class="popupbackground">
            <div class="popupframe">
              <p class="popupTitle">Add a New Dataset (In Progress)</p>
              <div
                class="popupCloseButton"
                onClick={() => this.handleCloseDatasetPopup()}
              >
                <b class="popupCloseButtonXMark">X</b>
              </div>
              <p class="popupFieldName">File</p>
              <input
                type="file"
                className="popupFileUpload"
                id="customFile"
                onChange={this.handleFilePick}
              />
              <div
                class="popupCreateButton"
                onClick={() => this.handleCreateDataset()}
              >
                <p class="popupCreateButtonText">Create</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default User;
