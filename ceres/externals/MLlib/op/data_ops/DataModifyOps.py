import copy
import numpy as np
from sklearn.preprocessing import StandardScaler, RobustScaler, MinMaxScaler

from .DataOps import DataModifyOp 
from ..data_objects.ABCDataObject import DataObject
from ..data_objects.XYData import XYData

from ..Op import Op


class ScalerOp(DataModifyOp):
    '''
    option: OneOf(min-max, robust, standard)
    '''
    def __init__(self, data_object_op: Op, option='min-max'):
        super().__init__(data_object_op)
        self.option = option
    
    def run(self):
        assert self.data_object_op.data_object != None, \
            "Run the linked OP first."
        self.data_object = copy.deepcopy(self.data_object_op.data_object)

        if self.option == 'min-max':
            self.data_object.scaler = MinMaxScaler()
        elif self.option == 'robust':
            self.data_object.scaler = RobustScaler()
        elif self.option == 'standard':
            self.data_object.scaler = StandardScaler()

        self.data_object.scale()

        return {}


class DataShuffleOp(DataModifyOp):
    def __init__(self, data_object_op: Op):
        super().__init__(data_object_op)

    def run(self):
        assert self.data_object_op.data_object != None, \
            "Run the linked OP first."
        self.data_object = copy.deepcopy(self.data_object_op.data_object)
        
        self.data_object_op.data_object.shuffle()
        return {}


class LabelsToOneHotOp(DataModifyOp):
    def __init__(self, data_object_op: Op):
        super().__init__(data_object_op)

        self.data_object = None

    def run(self):
        assert self.data_object_op.data_object != None, \
            "Run the linked OP first."
        self.data_object = copy.deepcopy(self.data_object_op.data_object)

        self.data_object.Y = self.data_object.Y.squeeze()
        Y_new = np.zeros(
            (self.data_object.Y.size, int(np.max(self.data_object.Y)) + 1)
        )
        Y_new[
            np.arange(self.data_object.Y.size), self.data_object.Y.astype(int)
        ] = 1

        self.data_object.Y = Y_new
        return {}


class LabelIndexerOp(DataModifyOp):
    def __init__(self, data_object_op: Op):
        super().__init__(data_object_op)

    def run(self):
        assert self.data_object_op.data_object != None, \
            "Run the linked OP first."
        self.data_object = copy.deepcopy(self.data_object_op.data_object)

        self.data_object.labels = np.unique(self.data_object.Y)
        Y_new = np.zeros_like(self.data_object.Y, dtype=int)

        for i, lbl in enumerate(self.data_object.labels):
            Y_new[self.data_object.Y == lbl] = i

        self.data_object.Y = Y_new
        return {}

