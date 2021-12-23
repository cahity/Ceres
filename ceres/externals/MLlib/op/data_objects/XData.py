from .ABCDataObject import DataObject
import matplotlib
matplotlib.use('Agg')

import numpy as np
from matplotlib import pyplot as plt
# from sklearn.utils import shuffle as sk_shuffle


class XData(DataObject):
    def __init__(self, X:np.ndarray):
        super().__init__()
        self.X = np.array(X)

    def plot(self, option:str):
        # if X is 3d, plot 3d.
        # if X is 2d, plot 2d.
        # if X is 1d, plot histogram.
        # if higher dimension, PCA might help.
        plt.clf()

        if option == '2d':
            assert (self.X.shape[1] == 2), \
                "Dimension error!"
            plt.plot(self.X[..., 0], self.X[..., 1], 'b.')  # TODO
            return plt
        pass
    
    def shuffle(self):
        # Shuffle unsupervised data
        # Might be in memory or as indices
        # Indices case must return shuffled indices
        # self.X = sk_shuffle(self.X)
        pass
