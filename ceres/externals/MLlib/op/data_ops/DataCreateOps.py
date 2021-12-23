import pandas as pd

from .DataOps import DataCreateOp
from ..data_objects.XYData import XYData
from ..data_objects.XData import XData


class CSV_XY_DataOp(DataCreateOp):
    def __init__(
        self, path: str, 
        data_obj_name: str,
        X_columns: list,
        Y_column: list
    ):
        super().__init__()
        self.data_obj_name = data_obj_name
        self.path = path

        self.X_columns = X_columns
        self.Y_column = Y_column

        self.data_object = None

    def run(self):
        created_data = pd.read_csv(self.path).dropna()
        data_object = XYData(
            created_data[self.X_columns],
            created_data[self.Y_column],
        )

        self.data_object = data_object
        
        return {}


class CSV_X_DataOp(DataCreateOp):
    def __init__(
        self, path: str,
        data_obj_name: str,
        X_columns: list
    ):
        super().__init__()
        self.data_obj_name = data_obj_name
        self.path = path

        self.X_columns = X_columns

        self.data_object = None

    def run(self):
        created_data = pd.read_csv(self.path).dropna()
        data_object = XData(
            created_data[self.X_columns],
        )

        self.data_object = data_object

        return {}