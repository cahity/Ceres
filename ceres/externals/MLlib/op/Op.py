from abc import ABC as AbstractBaseClass, abstractmethod


class Op(AbstractBaseClass):
    @abstractmethod
    def run(self):
        raise NotImplementedError

