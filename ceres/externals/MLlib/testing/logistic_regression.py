import os
from WorkEnv import WorkEnvironment

def LogisticRegressionTest():
    we = WorkEnvironment()
    
    out_path = 'outputs/logreg/'
    os.makedirs(out_path, exist_ok=True)

    # Create XY Data from CSV
    we.add_op(op_key='CSV_XY_DataOp', params={
        'path': 'data\\penguins.csv',
        'data_obj_name': 'pg',
        'X_columns': ["bill_length_mm" , "bill_depth_mm"],
        'Y_column': ['island'],
    })
    we.run_op(op_index=0)

    we.add_op(op_key='ScalerOp', params={
        'data_object_op': 0,
        'option' : "standard"
    })
    we.run_op(op_index=1)

    we.add_op(op_key='DataShuffleOp', params={
        'data_object_op': 1,
    })
    we.run_op(op_index=2)

    we.add_op(op_key='LabelIndexerOp', params={
        'data_object_op': 2,
    })
    we.run_op(op_index=3)

    we.add_op(op_key="LabelsToOneHotOp" , params={
        'data_object_op': 3,
    })
    we.run_op(op_index=4)

    we.add_op(op_key='LogisticRegression_ModelOp', params={
        'model_name': "logistic_classifier",
        'associated_data_op': 4,
    })
    we.run_op(op_index=5)
    
    we.add_op(op_key='LogisticRegression_TrainOp' , params = {
        'model_object_op': 5,
        'optimizer': "SGD" ,
        'epoch' : 10 ,
    })
    we.run_op(op_index=6)

    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object_op': 6,
        'option':'loss',
    })
    ret_val = we.run_op(op_index=7)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'loss_plot.png')
        )

    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object_op': 6,
        'option':'accuracy',
    })
    ret_val = we.run_op(op_index=8)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'accuracy.png')
        )

    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object_op': 6,
        'option':'decision',
    })
    ret_val = we.run_op(op_index=9)
    if 'plot' in ret_val:
        ret_val['plot'].savefig(
            os.path.join(out_path, 'decision.png')
        )


def LogisticRegressionTest2():
    we = WorkEnvironment()

    # Create XY Data from CSV
    we.add_op(op_key='CSV_XY_DataOp', params={
        'path': 'data\\weight-height.csv',
        'data_obj_name': 'wh',
        'X_columns': ["Weight" , "Height"],
        'Y_column': ['Gender'],
    })
    we.run_op(op_index=0)

    we.add_op(op_key='ScalerOp', params={
        'data_object': 'wh',
        'option' : "standard"
    })
    we.run_op(op_index=1)

    we.add_op(op_key='DataShuffleOp', params={
        'data_object': 'wh'
    })
    we.run_op(op_index=2)

    we.add_op(op_key='LabelIndexerOp', params={
        'data_object': 'wh'
    })
    we.run_op(op_index=3)

    we.add_op(op_key="LabelsToOneHotOp" , params={
        'data_object': 'wh',
    })
    we.run_op(op_index=4)

    we.add_op(op_key='LogisticRegression_ModelOp' , params={
        'model_name' : "logistic_classifier" ,
        'associated_data': 'wh',
    })
    we.run_op(op_index=5)

    we.add_op(op_key='LogisticRegression_TrainOp' , params = {
        'model_object' : 'logistic_classifier' ,
        'optimizer' : "SGD" ,
        'epoch' : 10 ,
    })
    we.run_op(op_index=6)

    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object': 'logistic_classifier',
        'option':'loss',
    })
    we.run_op(op_index=7)
    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object': 'logistic_classifier',
        'option':'accuracy',
    })
    we.run_op(op_index=8)
    we.add_op(op_key='LogisticRegression_VisualizeOp', params={
        'model_object': 'logistic_classifier',
        'option':'decision',
    })
    we.run_op(op_index=9)
    

if __name__ == "__main__":
    LogisticRegressionTest()