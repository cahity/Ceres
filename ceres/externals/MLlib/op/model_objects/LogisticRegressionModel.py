import os
import numpy as np

from tensorflow import keras
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from matplotlib import colors
from matplotlib import pyplot as plt

from .ABCModelObject import ModelObject


class LogisticRegressionModel(ModelObject):
    def __init__(self):
        super().__init__()
        self.inner_model = keras.Sequential()
        self.history = None

    def train(
        self, lr: float = 0.01, optimizer: str = 'Adam',
        epoch: int = 10, batch_size: int = 128, logs: list = [],
    ):
        output_dim = len(self.associated_data.labels)
        self.inner_model.add(
            keras.layers.Dense(
                units=output_dim,
                activation=keras.activations.softmax,
                kernel_initializer='zeros'
            )
        )
        optimizer_obj = self._get_gradient_optimizer(type=optimizer, lr=lr)
        loss = keras.losses.CategoricalCrossentropy()
        self.inner_model.compile(
            optimizer=optimizer_obj,
            loss=loss , metrics=['accuracy']
        )
        # print(self.associated_data.Y[:5])
        # print(output_dim)
        self.history = self.inner_model.fit(
            x=self.associated_data.X, y=self.associated_data.Y,
            epochs=epoch, batch_size=batch_size, verbose=1
        )

    def plot_loss_vs_iteration(self):
        plt.clf()
        
        plt.title('Model Loss')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.plot(self.history.history['loss'])
        plt.legend(['train', 'test'], loc='upper left')
        return plt

    def plot_accuracy_vs_iteration(self):
        plt.clf()
        
        plt.title('Model Accuracy')
        plt.xlabel('Epoch')
        plt.ylabel('Accuracy')
        plt.plot(self.history.history['accuracy'])
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
        plt.contourf(xs, ys, Z, cmap=colors.ListedColormap(['orange', 'cyan', 'olive']))
        plt.scatter(
            self.associated_data.X[:, 0], self.associated_data.X[:, 1],
            c=np.argmax(self.associated_data.Y, axis=1), s=50,
            cmap=colors.ListedColormap(['yellow', 'blue', 'green'])
        )
        return plt


    def plot_recall_vs_iteration(self):
        pass

if __name__ == "__main__":
    pass