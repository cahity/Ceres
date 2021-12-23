from abc import ABC as AbstractBaseClass, abstractmethod


class DataObject(AbstractBaseClass):
    
    def __init__(self) -> None:
        super().__init__()

        self.object_name = None  #TODO, assign objects name to itself???
        self.scaler = None
        self.dim_reducer = None

    @abstractmethod
    def plot(self):
        pass

    @abstractmethod
    def shuffle(self):
        pass

    def scale(self):
        '''
        Scales the X data.
        '''
        assert self.scaler != None, 'Set a scaler.'
        
        self.X = self.scaler.fit_transform(self.X)
