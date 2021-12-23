type opRequest = {
  [key: string]: any
  title: string
  description: string
  optype: string
  parameters: string[]
  pos_x?: number
  pos_y?: number
}
//optype Python
//reference olmayan parametre
//
export const opDefinitions: { [key: string]: opRequest } = {
  CSV_XY_DataNode: { //DONE
    title: "",
    description: "",
    optype: "CSV_XY_DataOp",
    parameters: ["path", "X_columns", "Y_column"],
  },
  CSV_X_DataNode: { //DONE
    title: "",
    description: "",
    optype: "CSV_X_DataOp",
    parameters: ["path", "X_columns"],
  },
  ScatterPlotNode: { //DONE
    title: "",
    description: "",
    optype: "ScatterPlotOp",
    parameters: ["option"],
  },
  KMeans_CreateNode: { //DONE
    title: "",
    description: "",
    optype: "KMeans_ModelOp",
    parameters: [],
  },
  KMeans_TrainNode: { //DONE
    title: "",
    description: "",
    optype: "KMeans_TrainOp",
    parameters: ["k"],
  },
  KMeans_VisualizeNode: { //DONE
    title: "",
    description: "",
    optype: "KMeans_VisualizeOp",
    parameters: ["option"],
  },
  DataShuffleNode:{ //DONE
    title: "",
    description: "",
    optype: "DataShuffleOp",
    parameters: [],
  },
  DataScaleNode:{ //DONE
    title: "",
    description: "",
    optype: "ScalerOp",
    parameters: ["option"],
  } ,
  LabelsToOneHotNode:{ // Done
    title: "",
    description: "",
    optype: "LabelsToOneHotOp",
    parameters: [],
  },
  LabelIndexerNode:{ 
    title: "",
    description: "",
    optype: "LabelIndexerOp",
    parameters: [],
  },
  LinearRegression_CreateNode: { // Done
    title: "",
    description: "",
    optype: "LinearRegression_ModelOp",
    parameters: [],
  },
  LogisticRegression_CreateNode: { //Done
    title: "",
    description: "",
    optype: "LogisticRegression_ModelOp",
    parameters: [],
  },
  MLPClassifier_CreateNode:{ //Done
    title: "",
    description: "",
    optype: "MLPClassifier_ModelOp",
    parameters: ["in_units" , "out_units" , "hidden_sizes" , "hidden_activation" , "output_activation"],
  },
  AnomalyDetection_CreateNode: { //Done
    title: "",
    description: "",
    optype: "AnomalyDetection_ModelOp",
    parameters: [""],
  },
  MLPClassifier_TrainNode:{ //
    title: "",
    description: "",
    optype: "MLPClassifier_TrainOp",
    parameters: ["lr" , "optimizer" , "epoch" , "batch_size"],
  },
  LinearRegression_TrainNode:{
    title: "",
    description: "",
    optype: "LinearRegression_TrainOp",
    parameters:  ["lr" , "optimizer" , "epoch" , "batch_size"],
  },
  LogisticRegression_TrainNode:{
    title: "",
    description: "",
    optype: "LogisticRegressionTrainOp",
    parameters: ["lr" , "optimizer" , "epoch" , "batch_size"],
  },
  AnomalyDetection_TrainNode:{
    title: "",
    description: "",
    optype: "AnomalyDetection_TrainOp",
    parameters: ["contamination"],
  },
  MLPClassifier_VisualizeNode:{ //
    title: "",
    description: "",
    optype: "MLPClassifier_VisualizeOp",
    parameters: ["option"],
  },
  LinearRegression_VisualizeNode:{
    title: "",
    description: "",
    optype: "LinearRegression_VisualizeOp",
    parameters: ["option"],
  },
  LogisticRegression_VisualizeNode:{
    title: "",
    description: "",
    optype: "LogisticRegression_VisualizeOp",
    parameters: ["option"],
  },
  AnomalyDetection_VisualizeNode:{
    title: "",
    description: "",
    optype: "AnomalyDetection_VisualizeOp",
    parameters: ["option"],
  },
};
