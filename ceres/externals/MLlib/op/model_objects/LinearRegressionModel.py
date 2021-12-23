import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow import keras

from matplotlib import pyplot as plt

from .ABCModelObject import ModelObject


class LinearRegressionModel(ModelObject):
    def __init__(self):
        super().__init__()
        self.inner_model = keras.Sequential(
            keras.layers.Dense(units=1, activation=keras.activations.linear, kernel_initializer='zeros')
        )
        self.history = None

    def train(
        self, lr: float = 0.01, optimizer: str = 'SGD',
        epoch: int = 10, batch_size: int = 32, logs: list = [],
    ):
        print("TRAINING")
        optimizer_obj = self._get_gradient_optimizer(type=optimizer, lr=lr)
        loss = keras.losses.MeanSquaredError()
        self.inner_model.compile(optimizer=optimizer_obj, loss=loss)
        self.history = self.inner_model.fit(
            x=self.associated_data.X, y=self.associated_data.Y,
            epochs=epoch, batch_size=batch_size
        )

    def plot_scatter_line(self):
        plt.clf()

        X_tmp = self.associated_data.X[:100]
        Y_tmp = self.associated_data.Y[:100]

        m = self.inner_model.layers[0].weights[0][0][0].numpy()
        b = self.inner_model.layers[0].weights[1][0].numpy()

        # Y_pred = self.inner_model.predict(X_tmp)

        plt.plot(X_tmp, Y_tmp, 'b.')
        plt.plot(X_tmp, m*X_tmp + b, 'r')  # TODO, call .predict
        return plt
  
    def plot_loss_vs_iteration(self):
        plt.clf()
        
        plt.title('Model Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.plot(self.history.history['loss'])
        plt.legend(['train', 'test'], loc='upper left')
        return plt

if __name__ == "__main__":
    pass