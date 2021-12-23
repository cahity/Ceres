import numpy as np
import pandas as pd

class Cluster():
    """ Create a random 2D dataset for clustering as pandas dataframe. """
    def __init__(self, cluster_centroids=[(3, 3), (7, 7)], datum_centroid=200, random_state=123):
        np.random.seed(random_state)

        self.datum_cnt = datum_centroid
        self.centroids = cluster_centroids

        self.data = np.vstack(np.asarray(
            [
                np.pad(
                    np.random.randn(self.datum_cnt, 2) + centroid,
                    pad_width=[(0,0), (0,1)], mode='constant', constant_values=i
                ) for i, centroid in enumerate(self.centroids)
            ]
        ))

        self.dataframe = pd.DataFrame(
            data=self.data,
            columns=["0", "1", "centroid"]
        )

    def save_csv(self, path):
        self.dataframe.to_csv(path, index=False)

if __name__ == "__main__":
    df = Cluster()
    df.save_csv('../data/2d_cluster.csv')
