import copy

from ..Op import Op

from .ModelOps import ModelTrainOp
from ..model_objects.LinearRegressionModel import LinearRegressionModel
from ..model_objects.LogisticRegressionModel import LogisticRegressionModel
from ..model_objects.KMeansModel import KMeansModel
from ..model_objects.AnomalyDetectionModel import AnomalyDetectionModel
from ..model_objects.MLPClassifierModel import MLPClassifierModel


class LinearRegression_TrainOp(ModelTrainOp):
    def __init__(
        self,
        model_object_op: Op,
        lr: float = 0.01, optimizer: str = 'SGD',
        epoch: int = 10, batch_size: int = 32,
    ):
        super().__init__(model_object_op)

        self.lr = float(lr)
        self.optimizer = optimizer
        self.epoch = epoch
        self.batch_size = batch_size

    def run(self):
        print("asdas")
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."
        print(self.lr)
        self.model_object = copy.copy(self.model_object_op.model_object)
        print(self.lr)
        self.model_object.train(
            lr=self.lr, optimizer=self.optimizer,
            epoch=self.epoch, batch_size=self.batch_size,
            logs=[],
        )
        print("HiHİHİ")
        return {}


class LogisticRegressionTrainOp(ModelTrainOp):
    def __init__(
        self,
        model_object_op: Op,
        lr: float = 0.01, optimizer: str = 'SGD',
        epoch: int = 10, batch_size: int = 32,
    ):
        super().__init__(model_object_op)

        self.lr = float(lr)
        self.optimizer = optimizer
        self.epoch = epoch
        self.batch_size = batch_size

    def run(self):
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."
        
        print(self.lr)
        print(self.epoch)

        self.model_object = copy.copy(self.model_object_op.model_object)

        self.model_object.train(
            lr=self.lr, optimizer=self.optimizer,
            epoch=self.epoch, batch_size=self.batch_size,
            logs=[],
        )
        return {}


class KMeans_TrainOp(ModelTrainOp):
    def __init__(
        self,
        model_object_op: Op,
        k: int = 2,
    ):
        super().__init__(model_object_op)

        self.k = k

    def run(self):
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."
        
        self.model_object = copy.copy(self.model_object_op.model_object)

        self.model_object.train(k=self.k)
        return {}


class AnomalyDetection_TrainOp(ModelTrainOp):
    def __init__(
        self,
        model_object_op: Op,
        contamination: float,
    ):
        super().__init__(model_object_op)
        self.contamination = contamination

    def run(self):
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."
        
        self.model_object = copy.copy(self.model_object_op.model_object)
        
        self.model_object.train(self.contamination)
        return {}


class MLPClassifier_TrainOp(ModelTrainOp):
    def __init__(
        self,
        model_object_op: Op,
        lr: float = 0.001, optimizer: str = 'Adam',
        epoch: int = 100, batch_size: int = 32,
    ):
        super().__init__(model_object_op)

        self.lr = lr
        self.optimizer = optimizer
        self.epoch = epoch
        self.batch_size = batch_size

    def run(self):
        assert self.model_object_op.model_object != None, \
            "Run the linked OP first."

        self.model_object = copy.copy(self.model_object_op.model_object)

        self.model_object.train(
            lr=self.lr, optimizer=self.optimizer,
            epoch=self.epoch, batch_size=self.batch_size,
            logs=[],
        )
        return {}
