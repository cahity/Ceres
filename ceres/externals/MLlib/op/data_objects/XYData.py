from .ABCDataObject import DataObject

import numpy as np
from matplotlib import pyplot as plt
from sklearn.utils import shuffle as sk_shuffle


class XYData(DataObject):
    def __init__(self, X: np.ndarray, Y: np.ndarray):
        super().__init__()
        self.X = np.array(X)
        self.Y = np.array(Y)
        self.labels = None

    def plot(self, option: str):
        # if X is 2d and Y is 1d, plot 3d.
        # if X is 1d and Y is 2d, plot 3d.
        # if X is 1d and Y is 1d, plot 2d.
        plt.clf()

        if option == '2d':
            assert (self.X.shape[1] == 1 and self.Y.shape[1] == 1) or self.X.shape[1] == 2, \
                "Dimension error!"
            if self.X.shape[1] == 2:
                plt.plot(self.X[..., 0], self.X[..., 1], 'b.')  # TODO
            else:
                plt.plot(self.X, self.Y, 'b.')  # TODO
            return plt

    def shuffle(self):
        # Shuffle supervised data
        # Might be in memory or as indices
        # Indices case must return shuffled indices
        # self.X, self.Y = sk_shuffle(self.X, self.Y)
        self.X, self.Y = sk_shuffle(self.X, self.Y)

