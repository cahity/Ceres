from ..Op import Op

from .ModelOps import ModelVisualizeOp
from ..model_objects.LinearRegressionModel import LinearRegressionModel
from ..model_objects.LogisticRegressionModel import LogisticRegressionModel
from ..model_objects.KMeansModel import KMeansModel
from ..model_objects.AnomalyDetectionModel import AnomalyDetectionModel
from ..model_objects.MLPClassifierModel import MLPClassifierModel


class LinearRegression_VisualizeOp(ModelVisualizeOp):
    '''
    option: OneOf(line, loss)
    '''
    def __init__(self, model_object_op: Op, option='line'):
        super().__init__()

        self.model_object_op = model_object_op
        self.option = option

    def run(self):
        plt = None
        if self.option == 'line':
            plt = self.model_object_op.model_object.plot_scatter_line()
        elif self.option == 'loss':
            plt = self.model_object_op.model_object.plot_loss_vs_iteration()
        
        return {'plot': plt}

class LogisticRegression_VisualizeOp(ModelVisualizeOp):
    '''
    option: OneOf(line, loss)
    '''
    def __init__(self, model_object_op: Op, option='loss'):
        super().__init__()

        self.model_object_op = model_object_op
        self.option = option

    def run(self):
        plt = None
        if self.option == 'accuracy':
            plt = self.model_object_op.model_object.plot_accuracy_vs_iteration()
        elif self.option == 'loss':
            plt = self.model_object_op.model_object.plot_loss_vs_iteration()
        elif self.option == 'decision':
            plt = self.model_object_op.model_object.plot_2d_decision_boundary()
        return {'plot': plt}
        
class KMeans_VisualizeOp(ModelVisualizeOp):
    '''
    option: OneOf(centers)
    '''
    def __init__(self, model_object_op: Op, option='centers'):
        super().__init__()

        self.model_object_op = model_object_op
        self.option = option

    def run(self):
        plt = None
        if self.option == 'centers':
            plt = self.model_object_op.model_object.plot_clustered_data_scatter()
        
        return {'plot': plt}

class AnomalyDetection_VisualizeOp(ModelVisualizeOp):
    def __init__(self, model_object_op: Op, option='scatter'):
        super().__init__()

        self.model_object_op = model_object_op
        self.option = option
    
    def run(self):
        plt = None
        if self.option == 'scatter':
            plt = self.model_object_op.model_object.plot_scatter()
        
        return {'plot': plt}

class MLPClassifier_VisualizeOp(ModelVisualizeOp):
    '''
    option: OneOf(decision, loss)
    '''
    def __init__(self, model_object_op: Op, option='loss'):
        super().__init__()

        self.model_object_op = model_object_op
        self.option = option

    def run(self):
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."

        plt = None
        if self.option == 'loss':
            plt = self.model_object_op.model_object.plot_loss_vs_iteration()
        if self.option == 'decision':
            plt = self.model_object_op.model_object.plot_2d_decision_boundary()
        
        return {'plot': plt}