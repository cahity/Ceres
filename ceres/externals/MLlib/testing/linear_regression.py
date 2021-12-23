import os
from matplotlib import pyplot as plt

from WorkEnv import WorkEnvironment

def LinearRegressionTest():
    we = WorkEnvironment()

    out_path = 'outputs/linear_regression/'
    os.makedirs(out_path, exist_ok=True)

    # Create XY Data from CSV
    we.add_op(op_id=0, op_key='CSV_XY_DataOp', params={
        'path': 'data\\weight-height.csv',
        'data_obj_name': 'hw',
        'X_columns': ['Weight'],
        'Y_column': ['Height'],
    })
    we.run_op(op_id=0)
    
    # Plot data on a scatter plot
    we.add_op(op_id=1, op_key='ScatterPlotOp', params={
        'data_object_op': 0,
    })
    ret_val = we.run_op(op_id=1)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'data_scatter.png')
        )
    
    # Scale the imported data
    we.add_op(op_id=2, op_key='ScalerOp', params={
        'data_object_op': 0,
    })
    we.run_op(op_id=2)

    # Create the Linear Regression Model
    we.add_op(op_id=3, op_key='LinearRegression_ModelOp', params={
        'model_name': 'linear',
        'associated_data_op': 2,
    })
    we.run_op(op_id=3)
    
    # Create trainer for model
    we.add_op(op_id=4, op_key='LinearRegression_TrainOp', params={
        'model_object_op': 3,
        'epoch': 40,
    })
    we.run_op(op_id=4)

    # Visualize regressed line with some data
    we.add_op(op_id=5, op_key='LinearRegression_VisualizeOp', params={
        'model_object_op': 4,
    })
    ret_val = we.run_op(op_id=5)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'line_plot.png')
        )

    # Visualize model training loss
    we.add_op(op_id=6, op_key='LinearRegression_VisualizeOp', params={
        'model_object_op': 4,
        'option':'loss',
    })
    ret_val = we.run_op(op_id=6)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'loss_plot.png')
        )


if __name__ == "__main__":
    LinearRegressionTest()