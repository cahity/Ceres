import React, { memo, FC, CSSProperties, DragEvent, useState } from 'react';
import { Handle, Position, NodeProps, Connection, Edge } from 'react-flow-renderer';
import dropdownIcon from '../../images/dropdown.webp';

interface SidebarItem{
  style: string;
  name: string;
  nodeType: string;
}

const onDragStart = (event: DragEvent, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

const Dropdown = (items: SidebarItem[], title: string, bgColor: string) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="dropdownButton" style={{backgroundColor: bgColor}} onClick={() => setIsOpen(!isOpen)}>
        <div>
          <p className="dropdownButtonText">{title}</p>
        </div>
        {!isOpen && (
          <div>
            <img className="dropdownIconOpened" src={dropdownIcon}/>
          </div>
        )}
        {isOpen && (
          <div>
            <img className="dropdownIconClosed" src={dropdownIcon}/>
          </div>
        )}
      </div>

      {isOpen && (
        <ul>
          {items.map((item, index) => (
            <li className={item.style} key={index} onDragStart={(event: DragEvent) => onDragStart(event, item.nodeType)} draggable>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar = () => {
  const dataCreateList = [
    {style: "dndnode data_create", name: "CSV XY Creator", nodeType: "CSV_XY_DataNode"}, 
    {style: "dndnode data_create", name: "CSV X Creator", nodeType: "CSV_X_DataNode"}
  ];

  const dataProcessList = [
    {style: "dndnode data_preprocess", name: "Data Scaler", nodeType: "DataScaleNode"},
    {style: "dndnode data_preprocess", name: "Data Shuffler", nodeType: "DataShuffleNode"},
    {style: "dndnode data_preprocess", name: "One-Hot Labeler", nodeType: "LabelsToOneHotNode"},
    {style: "dndnode data_preprocess", name: "Label Indexer", nodeType: "LabelIndexerNode"}
  ]

  const dataVisualizeList = [
    {style: "dndnode data_visualize", name: "Scatter Plotter", nodeType: "ScatterPlotNode"}
  ]

  const modelCreateList = [
    {style: "dndnode model_create", name: "Linear Regression Creator", nodeType: "LinearRegression_CreateNode"},
    {style: "dndnode model_create", name: "Logistic Regression Creator", nodeType: "LogisticRegression_CreateNode"},
    {style: "dndnode model_create", name: "MLP Classifier Creator", nodeType: "MLPClassifier_CreateNode"},
    {style: "dndnode model_create", name: "K-Means Creator", nodeType: "KMeans_CreateNode"},
    {style: "dndnode model_create", name: "Anomaly Detection Creator", nodeType: "AnomalyDetection_CreateNode"}
  ]

  const modelTrainList = [
    {style: "dndnode model_train", name: "Linear Regression Trainer", nodeType: "LinearRegression_TrainNode"},
    {style: "dndnode model_train", name: "Logistic Regression Trainer", nodeType: "LogisticRegression_TrainNode"},
    {style: "dndnode model_train", name: "MLP Classifier Trainer", nodeType: "MLPClassifier_TrainNode"},
    {style: "dndnode model_train", name: "K-Means Trainer", nodeType: "KMeans_TrainNode"},
    {style: "dndnode model_train", name: "Anomaly Detection Trainer", nodeType: "AnomalyDetection_TrainNode"}
  ]

  const modelVisualizeList = [
    {style: "dndnode model_visualize", name: "Linear Regression Visualizer", nodeType: "LinearRegression_VisualizeNode"},
    {style: "dndnode model_visualize", name: "Logistic Regression Visualizer", nodeType: "LogisticRegression_VisualizeNode"},
    {style: "dndnode model_visualize", name: "MLP Classifier Visualizer", nodeType: "MLPClassifier_VisualizeNode"},
    {style: "dndnode model_visualize", name: "K-Means Visualizer", nodeType: "KMeans_VisualizeNode"},
    {style: "dndnode model_visualize", name: "Anomaly Detection Visualizer", nodeType: "AnomalyDetection_VisualizeNode"}
  ]

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      {Dropdown(dataCreateList, "Data Create", "rgba(170, 111, 214, 1)")}
      {Dropdown(dataProcessList, "Data Preprocess", "rgb(111, 181, 214, 1)")}
      {Dropdown(dataVisualizeList, "Data Visualize", "rgba(184, 159, 90, 1)")}
      {Dropdown(modelCreateList, "Model Create", "rgba(168, 64, 64, 1)")}
      {Dropdown(modelTrainList, "Model Train", "rgba(69, 106, 176, 1)")}
      {Dropdown(modelVisualizeList, "Model Visualize", "rgba(66, 194, 69, 1)")}
    </aside>
  );
};

export default Sidebar;
