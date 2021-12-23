import os
from WorkEnv import WorkEnvironment

def KMeansTest():
    we = WorkEnvironment()
    
    out_path = 'outputs/kmeans/'
    os.makedirs(out_path, exist_ok=True)

    # Create XY Data from CSV
    data_dimension = 2
    we.add_op(op_key='CSV_X_DataOp', params={
        'path': 'data\\2d_cluster.csv',
        'data_obj_name': 'hw',
        'X_columns': [str(i) for i in range(data_dimension)],
    })
    we.run_op(op_index=0)
    
    # Plot data on a scatter plot
    we.add_op(op_key='ScatterPlotOp', params={
        'data_object_op': 0,
    })
    ret_val = we.run_op(op_index=1)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'data_scatter.png')
        )
    
    # Create the Linear Regression Model
    we.add_op(op_key='KMeans_ModelOp', params={
        'model_name': 'kmean',
        'associated_data_op': 0,
    })
    we.run_op(op_index=2)
    
    # Create trainer for model
    we.add_op(op_key='KMeans_TrainOp', params={
        'model_object_op': 2,
        'k': 3,
    })
    we.run_op(op_index=3)

    # Visualize regressed line with some data
    we.add_op(op_key='KMeans_VisualizeOp', params={
        'model_object_op': 3,
    })
    ret_val = we.run_op(op_index=4)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'centers.png')
        )

def KMeansTest2():
    we = WorkEnvironment()
    we.add_op(op_key='CSV_X_DataOp', params={
        'path': 'data\\weight-height.csv',
        'data_obj_name': 'hw',
        'X_columns': ["Weight" , "Height"],
    })
    we.run_op(op_index=0)   
    
    we.add_op(op_key='ScatterPlotOp', params={
        'data_object': 'hw',
    })
    we.run_op(op_index=1)
    we.add_op(op_key='KMeans_ModelOp', params={
        'model_name': 'kmean',
        'associated_data': 'hw',
    })
    we.run_op(op_index=2)
    
    # Create trainer for model
    we.add_op(op_key='KMeans_TrainOp', params={
        'model_object': 'kmean',
        'k': 6,
    })
    we.run_op(op_index=3)

    # Visualize regressed line with some data
    we.add_op(op_key='KMeans_VisualizeOp', params={
        'model_object': 'kmean',
    })
    we.run_op(op_index=4)


if __name__ == "__main__":
    KMeansTest()