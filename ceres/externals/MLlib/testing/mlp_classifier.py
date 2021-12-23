import os
from matplotlib import pyplot as plt

from WorkEnv import WorkEnvironment

def MLPClassifierTest():
    we = WorkEnvironment()

    out_path = 'outputs/mlp/'
    os.makedirs(out_path, exist_ok=True)

    # Create XY Data from CSV
    data_dimension = 2
    we.add_op(op_key='CSV_XY_DataOp', params={
        'path': 'data/2d_400_cluster.csv',
        'data_obj_name': 'hw',
        'X_columns': [str(i) for i in range(data_dimension)],
        'Y_column': ['centroid'],
    })
    we.run_op(op_index=0)
    
    # Scale the imported data
    we.add_op(op_key='DataShuffleOp', params={
        'data_object_op': 0,
    })
    we.run_op(op_index=1)

    # Plot data on a scatter plot
    we.add_op(op_key='ScatterPlotOp', params={
        'data_object_op': 1,
    })
    ret_val = we.run_op(op_index=2)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'data_scatter.png')
        )
    
    # Class index to one hot vector,
    # e.g. (2 -> [0,0,1])
    we.add_op(op_key='LabelsToOneHotOp', params={
        'data_object_op': 1,
    })
    we.run_op(op_index=3)

    # Create the MLP Model
    we.add_op(op_key='MLPClassifier_ModelOp', params={
        'model_name': 'mlp',
        'associated_data_op': 3,
        'in_units': 2, 'out_units': 2,
        'hidden_sizes': [4]
    })
    we.run_op(op_index=4)
    
    # Create trainer for model
    we.add_op(op_key='MLPClassifier_TrainOp', params={
        'model_object_op': 4,
        'lr': 0.01, 'epoch': 100, 'batch_size': 32
    })
    we.run_op(op_index=5)

    # Visualize model training loss
    we.add_op(op_key='MLPClassifier_VisualizeOp', params={
        'model_object_op': 5,
        'option':'loss',
    })
    ret_val = we.run_op(op_index=6)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'loss_plot.png')
        )

    # Visualize model training loss
    we.add_op(op_key='MLPClassifier_VisualizeOp', params={
        'model_object_op': 5,
        'option':'decision',
    })
    ret_val = we.run_op(op_index=7)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'boundary_plot.png')
        )


if __name__ == "__main__":
    MLPTest()