import os
import numpy as np

from matplotlib import pyplot as plt

from .ABCModelObject import ModelObject


class KMeansModel(ModelObject):
    
    colors = ['#FF0000', '#00FF00', '#0000FF', '#F9F900', '#FF00FF' , '#00F9F9']

    def __init__(self):
        super().__init__()

        self.centroid_history = []
        self.last_bindings = None

    def train(self, k: int):
        cluster = self.associated_data.X
        dimension = cluster.shape[1]

        # maximums and minimums of every dimension
        bb_max = np.max(cluster, axis=0)
        bb_min = np.min(cluster, axis=0)

        # randomly generate centroids, can be chosen more wisely
        centroids = np.random.uniform(bb_min, bb_max, size=(k, dimension))

        old_objective = -1
        objective = None
        while True:
            # add centroids to the history
            # last centroids not needed since it has not changed
            self.centroid_history.append(centroids)

            # euclidean squared L2 distance
            binds = np.asarray(
                [np.sum(np.square(cluster-center), axis=1) for center in centroids]
            ).T

            # calculate loss
            old_objective = objective
            objective = 0.5 * np.sum(np.min(binds, axis=1))

            # bind every datum to a centroid
            binds = np.argmin(binds, axis=1)
            
            # move centroids to means
            for i in range(len(centroids)):
                datums = cluster[binds == i]

                if len(datums) != 0:
                    centroids[i] = np.mean(datums, axis=0)
                else:  # if no binding, randomly move the centroid
                    centroids[i] = np.random.uniform(bb_min, bb_max, size=dimension)

            # minimum reached
            if old_objective == objective:
                self.last_bindings = binds
                break

    def plot_clustered_data_scatter(self):
        assert self.centroid_history != [] and np.all(self.last_bindings != None), \
             "Train before clustered plottings."
            
        plt.clf()

        cluster = self.associated_data.X
        centroids = self.centroid_history[-1]
        
        for i in range(len(centroids)):
            datums = cluster[self.last_bindings == i]
            plt.scatter(datums[:, 0], datums[:, 1], c=self.colors[i], s=5)
            plt.scatter([centroids[i][0]], [centroids[i][1]], c='black', marker="X", s=150)
        return plt
