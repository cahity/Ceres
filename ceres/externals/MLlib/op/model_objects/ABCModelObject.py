import os
from abc import ABC as AbstractBaseClass, abstractmethod
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow import keras



class ModelObject(AbstractBaseClass):
    def __init__(self):
        super().__init__()

        self.name = ''
        self.associated_data = None

    @abstractmethod
    def train(self):
        pass

    def _get_gradient_optimizer(self, type: str, lr: float):
        """
        Call only from gradient optimized models.
        Input - type: One of 'Adam', 'SGD'
        """
        
        if type == 'SGD':
            return keras.optimizers.SGD(learning_rate=lr, momentum=0.9)
        if type == 'Adam':
            return keras.optimizers.Adam(learning_rate=lr)

if __name__ == "__main__":
    pass