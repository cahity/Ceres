from ..Op import Op
# from ..data_objects.ABCDataObject import DataObject


class DataCreateOp(Op):
    def __init__(self):
        super().__init__()


class DataModifyOp(Op):
    def __init__(self, data_object_op: Op):
        super().__init__()

        self.data_object_op = data_object_op
        self.data_object = None


class DataVisualizeOp(Op):
    def __init__(self, data_object_op: Op):
        super().__init__()

        self.data_object_op = data_object_op

