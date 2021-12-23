from ..Op import Op

from ..data_objects.ABCDataObject import DataObject


class ModelCreateOp(Op):
    def __init__(self, model_name: str, associated_data_op: Op):
        super().__init__()
        self.model_name = model_name
        self.associated_data_op = associated_data_op
        
        self.model_object = None


class ModelTrainOp(Op):
    def __init__(self, model_object_op):
        super().__init__()
        self.model_object_op = model_object_op
        self.model_object = None


class ModelVisualizeOp(Op):
    def __init__(self):
        super().__init__()
