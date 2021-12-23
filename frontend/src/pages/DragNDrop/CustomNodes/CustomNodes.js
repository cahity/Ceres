import { CSV_XY_DataNode , CSV_X_DataNode} from './DataCreateNodes'
import { LabelsToOneHotNode } from './DataModifyNodes'
import { DataShuffleNode } from './DataModifyNodes'
import { DataScaleNode } from './DataModifyNodes'
import { LabelIndexerNode } from './DataModifyNodes'
import { ScatterPlotNode } from './DataVisualizeNodes'
import { MLPClassifier_VisualizeNode , LinearRegression_VisualizeNode, 
LogisticRegression_VisualizeNode , AnomalyDetection_VisualizeNode , KMeans_VisualizeNode} from './ModelVisualizeNodes'
import { MLPClassifier_CreateNode , LinearRegression_CreateNode
, LogisticRegression_CreateNode , KMeans_CreateNode , AnomalyDetection_CreateNode } from './ModelCreateNodes'
import { MLPClassifier_TrainNode , LinearRegression_TrainNode
    , LogisticRegression_TrainNode ,KMeans_TrainNode , AnomalyDetection_TrainNode } from './ModelTrainNodes'

const CustomNodeTypes = {
    CSV_XY_DataNode: CSV_XY_DataNode,
    CSV_X_DataNode: CSV_X_DataNode,
    DataScaleNode: DataScaleNode,
    DataShuffleNode: DataShuffleNode,
    LabelsToOneHotNode: LabelsToOneHotNode,
    LabelIndexerNode: LabelIndexerNode,
    ScatterPlotNode: ScatterPlotNode,
    LinearRegression_CreateNode: LinearRegression_CreateNode,
    LogisticRegression_CreateNode: LogisticRegression_CreateNode,
    MLPClassifier_CreateNode: MLPClassifier_CreateNode,
    KMeans_CreateNode: KMeans_CreateNode,
    AnomalyDetection_CreateNode: AnomalyDetection_CreateNode,
    LinearRegression_TrainNode: LinearRegression_TrainNode,
    LogisticRegression_TrainNode: LogisticRegression_TrainNode,
    MLPClassifier_TrainNode: MLPClassifier_TrainNode,
    KMeans_TrainNode: KMeans_TrainNode,
    AnomalyDetection_TrainNode: AnomalyDetection_TrainNode,
    LinearRegression_VisualizeNode: LinearRegression_VisualizeNode,
    LogisticRegression_VisualizeNode: LogisticRegression_VisualizeNode,
    MLPClassifier_VisualizeNode: MLPClassifier_VisualizeNode,
    KMeans_VisualizeNode: KMeans_VisualizeNode,
    AnomalyDetection_VisualizeNode: AnomalyDetection_VisualizeNode,
};

export default CustomNodeTypes;
