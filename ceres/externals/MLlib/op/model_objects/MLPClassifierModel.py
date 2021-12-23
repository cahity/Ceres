import os
import numpy as np

from tensorflow import keras
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from matplotlib import colors
from matplotlib import pyplot as plt

from .ABCModelObject import ModelObject


class MLPClassifierModel(ModelObject):
    """
    :param: hidden_activation: OneOf('ReLU', 'Sigmoid', 'Tanh', 'Softmax'), string
    :param: output_activation: OneOf('ReLU', 'Sigmoid', 'Tanh', 'Softmax'), string
    """
    def __init__(
        self,
        in_units: int, out_units: int, hidden_sizes=[],
        hidden_activation='ReLU', output_activation='Sigmoid'
    ):
        super().__init__()

        assert hidden_activation in ['ReLU', 'Sigmoid', 'Tanh', 'Softmax']
        assert output_activation in ['ReLU', 'Sigmoid', 'Tanh', 'Softmax']
        self.hidden_activation = hidden_activation.lower()
        self.output_activation = output_activation.lower()

        self.h_s = [in_units] + hidden_sizes + [out_units]
        modules = [keras.layers.Dense(units=self.h_s[1], input_dim=self.h_s[0])]
        for i, h_s in enumerate(self.h_s[2:]):
            modules.extend([
                keras.layers.Activation(getattr(keras.activations, self.hidden_activation)),
                keras.layers.Dense(units=h_s, input_dim=self.h_s[i + 1]),
            ])
        modules.append(
            keras.layers.Activation(getattr(keras.activations, self.output_activation)),
        )
        self.inner_model = keras.Sequential(modules)
        self.history = None

    def train(
        self, lr: float = 0.01, optimizer: str = 'SGD',
        epoch: int = 10, batch_size: int = 32, logs: list = [],
    ):
        optimizer_obj = self._get_gradient_optimizer(type=optimizer, lr=lr)
        loss = keras.losses.BinaryCrossentropy()
        self.inner_model.compile(optimizer=optimizer_obj, loss=loss)
        self.history = self.inner_model.fit(
            x=self.associated_data.X, y=self.associated_data.Y,
            epochs=epoch, batch_size=batch_size, verbose=0
        )
  
    def plot_loss_vs_iteration(self):
        plt.clf()
        
        plt.title('Model Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.plot(self.history.history['loss'])
        plt.legend(['train', 'test'], loc='upper left')
        return plt

    def plot_2d_decision_boundary(self):
        plt.clf()

        # determine canvas borders
        mins = np.amin(self.associated_data.X, 0)
        mins = mins - 0.1 * np.abs(mins)
        maxs = np.amax(self.associated_data.X, 0)
        maxs = maxs + 0.1 * maxs

        ## generate dense grid
        xs, ys = np.meshgrid(
            np.linspace(mins[0], maxs[0], 300),
            np.linspace(mins[1], maxs[1], 300)
        )

        # evaluate model on the dense grid
        Z = self.inner_model.predict(np.c_[xs.flatten(), ys.flatten()])
        Z = np.argmax(Z, axis=1)
        Z = Z.reshape(xs.shape)

        # Plot the contour and training examples
        plt.contourf(xs, ys, Z, cmap=plt.cm.Spectral)
        plt.scatter(
            self.associated_data.X[:, 0], self.associated_data.X[:, 1],
            c=np.argmax(self.associated_data.Y, axis=1), s=50,
            cmap=colors.ListedColormap(['orange', 'blue'])
        )
        return plt

if __name__ == "__main__":
    pass