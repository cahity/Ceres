from op.data_ops import DataCreateOps
from op.data_ops import DataVisualizeOps
from op.data_ops import DataModifyOps

from op.model_ops import ModelTrainOps
from op.model_ops import ModelCreateOps
from op.model_ops import ModelVisualizeOps


class WorkEnvironment():
    """
    Work environment is the class that users will utilize to use the library.
    It is stacked below the backend of the project. So frontend interactions
    will run as Work Environment sessions.
    """

    op_dict = {
        "CSV_X_DataOp": DataCreateOps.CSV_X_DataOp,
        "CSV_XY_DataOp": DataCreateOps.CSV_XY_DataOp,
        "ScatterPlotOp": DataVisualizeOps.ScatterPlotOp,
        
        "ScalerOp": DataModifyOps.ScalerOp,
        "DataShuffleOp": DataModifyOps.DataShuffleOp,
        "LabelIndexerOp": DataModifyOps.LabelIndexerOp,
        "LabelsToOneHotOp": DataModifyOps.LabelsToOneHotOp,
        
        "LinearRegression_ModelOp": ModelCreateOps.LinearRegression_ModelOp,
        "LinearRegression_TrainOp": ModelTrainOps.LinearRegression_TrainOp,
        "LinearRegression_VisualizeOp": ModelVisualizeOps.LinearRegression_VisualizeOp,

        "LogisticRegression_ModelOp": ModelCreateOps.LogisticRegression_ModelOp,
        "LogisticRegressionTrainOp": ModelTrainOps.LogisticRegressionTrainOp,
        "LogisticRegression_VisualizeOp": ModelVisualizeOps.LogisticRegression_VisualizeOp,

        "KMeans_ModelOp": ModelCreateOps.KMeans_ModelOp,
        "KMeans_TrainOp": ModelTrainOps.KMeans_TrainOp,
        "KMeans_VisualizeOp": ModelVisualizeOps.KMeans_VisualizeOp,

        "AnomalyDetection_ModelOp": ModelCreateOps.AnomalyDetection_ModelOp,
        "AnomalyDetection_TrainOp": ModelTrainOps.AnomalyDetection_TrainOp,
        "AnomalyDetection_VisualizeOp" : ModelVisualizeOps.AnomalyDetection_VisualizeOp,

        "MLPClassifier_ModelOp": ModelCreateOps.MLPClassifier_ModelOp,
        "MLPClassifier_TrainOp": ModelTrainOps.MLPClassifier_TrainOp,
        "MLPClassifier_VisualizeOp" : ModelVisualizeOps.MLPClassifier_VisualizeOp,
    }


    def __init__(self):
        
        # Holds Work Environment OPs as a dictionary
        # Where Op id is key and Op is value
        self.OPs = {}

    def add_op(self, op_key:str, params:dict, op_id:int):
        """
        Add the OP to environment.
        """
        for k, v in params.items():
            if (
                k == 'data_object_op'
                or k == 'model_object_op'
                or k == 'associated_data_op'
            ):
                if v in self.OPs:
                    params[k] = self.OPs[v]                    
                else:
                    return False, 'This Op references an Op that is not in the WE. Adding op failed.'
        self.OPs[op_id] = self.op_dict[op_key](**params)
        return True, 'success'

    def run_op(self, op_id:int):
        """
        Run the OP in environment.
        Since OPs are in-order, index value is sufficient to identify.

        params are OP specific and they can be seen in the OP documentation.
        """
        return self.OPs[op_id].run()
            
    def _we_summary(self):
        """
        Debug method.
        Prints work environment state.
        Should not be called.
        """

        print("--- OPs ---")
        for op in self.OPs:
            print(type(op).__name__)