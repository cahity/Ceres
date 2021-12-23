from ..Op import Op

from .ModelOps import ModelCreateOp
from ..data_objects.XYData import XYData
from ..data_objects.XData import XData
from ..model_objects.LinearRegressionModel import LinearRegressionModel
from ..model_objects.LogisticRegressionModel import LogisticRegressionModel
from ..model_objects.KMeansModel import KMeansModel
from ..model_objects.AnomalyDetectionModel import AnomalyDetectionModel
from ..model_objects.MLPClassifierModel import MLPClassifierModel


class LinearRegression_ModelOp(ModelCreateOp):
    def __init__(self, model_name: str, associated_data_op: Op):
        super().__init__(model_name, associated_data_op)
    
    def run(self):
        model_object = LinearRegressionModel()
        model_object.associated_data = self.associated_data_op.data_object

        self.model_object = model_object
        
        return {}


class LogisticRegression_ModelOp(ModelCreateOp):
    def __init__(self, model_name: str, associated_data_op: Op):
        super().__init__(model_name, associated_data_op)
    
    def run(self):
        model_object = LogisticRegressionModel()
        model_object.associated_data = self.associated_data_op.data_object

        self.model_object = model_object

        return {}


class KMeans_ModelOp(ModelCreateOp):
    def __init__(self, model_name: str, associated_data_op: Op):
        super().__init__(model_name, associated_data_op)
    
    def run(self):
        model_object = KMeansModel()
        model_object.associated_data = self.associated_data_op.data_object

        self.model_object = model_object

        return {}


class AnomalyDetection_ModelOp(ModelCreateOp):
    def __init__(self, model_name: str, associated_data_op: Op):
        super().__init__(model_name, associated_data_op)
    
    def run(self):
        model_object = AnomalyDetectionModel()
        model_object.associated_data = self.associated_data_op.data_object

        self.model_object = model_object

        return {}


class MLPClassifier_ModelOp(ModelCreateOp):
    def __init__(
        self,
        model_name: str, associated_data_op: Op,
        in_units: int, out_units: int, hidden_sizes: list = [],
        hidden_activation='ReLU', output_activation='Softmax',
    ):
        super().__init__(model_name, associated_data_op)

        self.in_units = in_units
        self.out_units = out_units
        self.hidden_sizes = hidden_sizes
        self.hidden_activation = hidden_activation
        self.output_activation = output_activation

    def run(self):
        model_object = MLPClassifierModel(
            self.in_units, self.out_units, self.hidden_sizes,
            self.hidden_activation, self.output_activation
        )
        model_object.associated_data = self.associated_data_op.data_object

        self.model_object = model_object
        return {}
