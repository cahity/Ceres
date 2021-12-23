import os
from matplotlib import pyplot as plt

from WorkEnv import WorkEnvironment

def AnomalyDetectionTest():
    we = WorkEnvironment()

    out_path = 'outputs/anomaly_detection/'
    os.makedirs(out_path, exist_ok=True)

    # Create X Data from CSV
    we.add_op(op_key='CSV_X_DataOp', params={
        'path': 'data\\penguins.csv',
        'data_obj_name': 'hw',
        'X_columns': ['flipper_length_mm' , 'bill_length_mm'],
    })
    we.run_op(op_index=0)    

    we.add_op(op_key='ScatterPlotOp', params={
        'data_object_op': 0,
    })
    ret_val = we.run_op(op_index=1)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'data_scatter.png')
        )

    we.add_op(op_key='AnomalyDetection_ModelOp', params={
        'model_name': 'anomaly_detector',
        'associated_data_op': 0,
    })
    we.run_op(op_index=2)

    we.add_op(op_key='AnomalyDetection_TrainOp', params={
        'model_object_op': 2,
        'contamination' : 0.1
    })
    we.run_op(op_index=3)

    we.add_op(op_key='AnomalyDetection_VisualizeOp', params = {
        'model_object_op' : 3,
        'option' : 'scatter'
    })
    ret_val = we.run_op(op_index=4)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'decision.png')
        )

if __name__ == "__main__":
    AnomalyDetectionTest()