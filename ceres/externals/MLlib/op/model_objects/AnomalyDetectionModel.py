import os
import numpy as np
from tensorflow import keras
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from sklearn.covariance import EllipticEnvelope
from matplotlib import pyplot as plt
import matplotlib.font_manager
from .ABCModelObject import ModelObject


class AnomalyDetectionModel(ModelObject):
    def __init__(self):
        super().__init__()
        self.inner_model = EllipticEnvelope(support_fraction=1.,contamination=0.1)

    def train(
        self,
        contamination : float
    ):
        self.inner_model.contamination = contamination
        self.inner_model.fit(self.associated_data.X)

    def plot_scatter(self):
        plt.clf()

        colors = ['m', 'g', 'b']
        legend1 = {}
        legend2 = {}
        X = self.associated_data.X
        xx1, yy1 = np.meshgrid(np.linspace(int(X[:,0].min()), int(X[:,0].max()), 500), np.linspace(int(X[:,1].min()), int(X[:,1].max()), 500))
        plt.figure(1)
        Z1 = self.inner_model.decision_function(np.c_[xx1.ravel(), yy1.ravel()])
        Z1 = Z1.reshape(xx1.shape)
        legend1["Empirical"] = plt.contour(
            xx1, yy1, Z1, levels=[0], linewidths=2, colors=colors[0])
        legend1_values_list = list(legend1.values())
        legend1_keys_list = list(legend1.keys())
        plt.plot(X[:, 0].mean() , X[:, 1].mean() , "bX")       
        plt.figure(1)  # two clusters
        ##plt.title("Outlier detection on a real data set")
        plt.scatter(X[:, 0], X[:, 1], color='black')
        bbox_args = dict(boxstyle="round", fc="0.1")
        arrow_args = dict(arrowstyle="->")
        plt.annotate("outlying points", xy=(4, 2),
                    xycoords="data", textcoords="data",
                    xytext=(3, 1.25), bbox=bbox_args, arrowprops=arrow_args)
        plt.xlim((xx1.min(), xx1.max()))
        plt.ylim((yy1.min(), yy1.max()))
        plt.legend((legend1_values_list[0].collections[0],),
                (legend1_keys_list[0],),
                loc="upper center",
                prop=matplotlib.font_manager.FontProperties(size=11))
        plt.ylabel("Y")
        plt.xlabel("X")

        return plt        

if __name__ == "__main__":
    pass