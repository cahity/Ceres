from .DataOps import DataVisualizeOp
# from ..data_objects.ABCDataObject import DataObject
from ..Op import Op


class ScatterPlotOp(DataVisualizeOp):
    def __init__(self, data_object_op: Op, option='2d'):
        super().__init__(data_object_op)
        self.option = option
    
    def run(self):
        assert self.data_object_op.data_object != None, \
            "Run the linked OP first."

        plt = self.data_object_op.data_object.plot(self.option)
        return {'plot': plt}
