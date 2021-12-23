from django.db import models
from polymorphic.models import PolymorphicModel
from django.contrib.auth.models import User

class Environment(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete = models.CASCADE, default = None)
    public = models.BooleanField(default=False)
    star_count = models.IntegerField(default=0)
    pos_x = models.FloatField(default=0)
    pos_y = models.FloatField(default=0)
    zoom = models.FloatField(default=1)
    def _str_(self):
        return self.title

class Star(models.Model):
    eid = models.ForeignKey(Environment, on_delete = models.CASCADE, default = None)
    uid = models.ForeignKey(User, on_delete = models.CASCADE, default = None)

class Dataset(models.Model):
    name = models.CharField(max_length=30)
    owner = models.ForeignKey(User, on_delete = models.CASCADE, default = None)
    def _str_(self):
        return self.name

class CeresOp(PolymorphicModel):
    title = models.CharField(max_length=120, blank=True)
    description = models.TextField(blank=True)
    we = models.ForeignKey(Environment, on_delete = models.CASCADE, default = None)
    pos_x = models.FloatField(blank=True, default=0)
    pos_y = models.FloatField(blank=True, default=0)
    def _str_(self):
        return self.id
    def params_to_dict(self):
        return dict()
    def set_input_op(self, in_op_id):
        return 'Not supported on CeresOp'
    def get_name(self):
        return 'CeresOp'

# DATA OPS
class DataCreateOp(CeresOp):
    #created_data = models.CharField(max_length=30)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        #d.update({'created_data': self.created_data})
        return d
    def set_input_op(self, in_op_id):
        return 'Not supported on DataCreateOp'
    def get_name(self):
        return 'DataCreateOp'

class DataModifyOp(CeresOp):
    # data_object = models.CharField(max_length=30)
    data_object_op = models.IntegerField(default=-1)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        d.update({'data_object_op': self.data_object_op})
        return d
    def set_input_op(self, in_op_id):
        self.data_object_op = in_op_id
        self.save()
        return 'Input op set'
    def get_name(self):
        return 'DataModifyOp'

class DataVisualizeOp(CeresOp):
    # data_object = models.CharField(max_length=30)
    data_object_op = models.IntegerField(default=-1)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        d.update({'data_object_op': self.data_object_op})
        return d
    def set_input_op(self, in_op_id):
        self.data_object_op = in_op_id
        self.save()
        return 'Input op set'
    def get_name(self):
        return 'DataVisualizeOp'

# DATA CREATE OPS
class CSV_XY_DataOp(DataCreateOp):
    path = models.CharField(max_length=30, blank=True)
    data_obj_name = models.CharField(max_length=30, blank=True)
    X_columns = models.CharField(max_length=120, blank=True)
    Y_column = models.CharField(max_length=30, blank=True)
    def params_to_dict(self):
        d = DataCreateOp.params_to_dict(self)
        d.update({'path': self.path, 'data_obj_name': self.data_obj_name, 'X_columns': self.X_columns, 'Y_column': self.Y_column})
        return d
    def get_name(self):
        return 'CSV_XY_DataOp'

class CSV_X_DataOp(DataCreateOp):
    path = models.CharField(max_length=30, blank=True)
    data_obj_name = models.CharField(max_length=30, blank=True)
    X_columns = models.CharField(max_length=120,blank=True)
    def params_to_dict(self):
        d = DataCreateOp.params_to_dict(self)
        d.update({'path': self.path, 'data_obj_name': self.data_obj_name, 'X_columns': self.X_columns})
        return d
    def get_name(self):
        return 'CSV_X_DataOp'

# DATA MODIFY OPS
class DataShuffleOp(DataModifyOp):
    def params_to_dict(self):
        d = DataModifyOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'DataShuffleOp'

class ScalerOp(DataModifyOp):
    option = models.CharField(max_length=30, blank=True)
    def params_to_dict(self):
        d = DataModifyOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'ScalerOp'

class LabelsToOneHotOp(DataModifyOp):
    def params_to_dict(self):
        d = DataModifyOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'LabelsToOneHotOp'

class LabelIndexerOp(DataModifyOp):
    def params_to_dict(self):
        d = DataModifyOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'LabelIndexerOp'

# DATA VISUALIZE OPS
class ScatterPlotOp(DataVisualizeOp):
    option = models.CharField(max_length=30, default='2d')
    def params_to_dict(self):
        d = DataVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'ScatterPlotOp'

# MODEL OPS
class ModelCreateOp(CeresOp):
    model_name = models.CharField(max_length=30, blank=True)
    # associated_data = models.CharField(max_length=30)
    associated_data_op = models.IntegerField(default=-1)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        d.update({'model_name': self.model_name, 'associated_data_op': self.associated_data_op})
        return d
    def set_input_op(self, in_op_id):
        self.associated_data_op = in_op_id
        self.save()
        return 'Input op set'
    def get_name(self):
        return 'ModelCreateOp'

class ModelTrainOp(CeresOp):
    # model_object = models.CharField(max_length=30)
    model_object_op = models.IntegerField(default=-1)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        d.update({'model_object_op': self.model_object_op})
        return d
    def set_input_op(self, in_op_id):
        self.model_object_op = in_op_id
        self.save()
        return 'Input op set'
    def get_name(self):
        return 'ModelTrainOp'

class ModelVisualizeOp(CeresOp):
    # model_object = models.CharField(max_length=30)
    model_object_op = models.IntegerField(default=-1)
    def params_to_dict(self):
        d = CeresOp.params_to_dict(self)
        d.update({'model_object_op': self.model_object_op})
        return d
    def set_input_op(self, in_op_id):
        self.model_object_op = in_op_id
        self.save()
        return 'Input op set'
    def get_name(self):
        return 'ModelVisualizeOp'

# MODEL CREATE OPS
class LinearRegression_ModelOp(ModelCreateOp):
    def params_to_dict(self):
        d = ModelCreateOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'LinearRegression_ModelOp'

class LogisticRegression_ModelOp(ModelCreateOp):
    def params_to_dict(self):
        d = ModelCreateOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'LogisticRegression_ModelOp'

class KMeans_ModelOp(ModelCreateOp):
    def params_to_dict(self):
        d = ModelCreateOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'KMeans_ModelOp'

class AnomalyDetection_ModelOp(ModelCreateOp):
    def params_to_dict(self):
        d = ModelCreateOp.params_to_dict(self)
        return d
    def get_name(self):
        return 'AnomalyDetection_ModelOp'

class MLPClassifier_ModelOp(ModelCreateOp):
    in_units = models.IntegerField(default=0)
    out_units = models.IntegerField(default=0)
    hidden_sizes = models.CharField(max_length=120, blank=True)
    hidden_activation = models.CharField(max_length=30, default="ReLU", blank=True)
    output_activation = models.CharField(max_length=30, default="Softmax", blank=True)
    def params_to_dict(self):
        d = ModelCreateOp.params_to_dict(self)
        d.update({'in_units':self.in_units, 'out_units':self.out_units, 'hidden_sizes':self.hidden_sizes, 'hidden_activation':self.hidden_activation, 'output_activation':self.output_activation})
        return d
    def get_name(self):
        return 'MLPClassifier_ModelOp'


# MODEL TRAIN OPS
class LinearRegression_TrainOp(ModelTrainOp):
    lr = models.DecimalField(max_digits=5, decimal_places=5, default=0.1)
    optimizer = models.CharField(max_length=30, blank=True)
    epoch = models.IntegerField(default=1)
    batch_Size = models.IntegerField(default=4)
    def params_to_dict(self):
        d = ModelTrainOp.params_to_dict(self)
        d.update({'lr': self.lr, 'optimizer': self.optimizer, 'epoch': self.epoch, 'batch_size': self.batch_Size})
        return d
    def get_name(self):
        return 'LinearRegression_TrainOp'

class LogisticRegressionTrainOp(ModelTrainOp):
    lr = models.DecimalField(max_digits=5, decimal_places=5, default=0.1)
    optimizer = models.CharField(max_length=30, blank=True)
    epoch = models.IntegerField(default=1)
    batch_Size = models.IntegerField(default=4)
    def params_to_dict(self):
        d = ModelTrainOp.params_to_dict(self)
        d.update({'lr': self.lr, 'optimizer': self.optimizer, 'epoch': self.epoch, 'batch_size': self.batch_Size})
        return d
    def get_name(self):
        return 'LogisticRegressionTrainOp'

class KMeans_TrainOp(ModelTrainOp):
    k = models.IntegerField(default=1)
    def params_to_dict(self):
        d = ModelTrainOp.params_to_dict(self)
        d.update({'k': self.k})
        return d
    def get_name(self):
        return 'KMeans_TrainOp'

class AnomalyDetection_TrainOp(ModelTrainOp):
    contamination = models.FloatField(default=0, blank=True)
    def params_to_dict(self):
        d = ModelTrainOp.params_to_dict(self)
        d.update({'contamination': self.contamination})
        return d
    def get_name(self):
        return 'AnomalyDetection_TrainOp'

class MLPClassifier_TrainOp(ModelTrainOp):
    lr = models.FloatField(default=0.001, blank=True)
    optimizer = models.CharField(max_length=30, default='Adam', blank=True)
    epoch = models.IntegerField(default=100, blank=True)
    batch_size = models.IntegerField(default=32, blank=True)
    def params_to_dict(self):
        d = ModelTrainOp.params_to_dict(self)
        d.update({'lr': self.lr, 'optimizer': self.optimizer, 'epoch': self.epoch, 'batch_size': self.batch_size})
        return d
    def get_name(self):
        return 'MLPClassifier_TrainOp'


# MODEL VISUALIZE OPS
class LinearRegression_VisualizeOp(ModelVisualizeOp):
    option = models.CharField(max_length=30, blank=True)
    def params_to_dict(self):
        d = ModelVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'LinearRegression_VisualizeOp'

class LogisticRegression_VisualizeOp(ModelVisualizeOp):
    option = models.CharField(max_length=30, blank=True)
    def params_to_dict(self):
        d = ModelVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'LogisticRegression_VisualizeOp'
        
class KMeans_VisualizeOp(ModelVisualizeOp):
    option = models.CharField(max_length=30, blank=True)
    def params_to_dict(self):
        d = ModelVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'KMeans_VisualizeOp'

class AnomalyDetection_VisualizeOp(ModelVisualizeOp):
    option = models.CharField(max_length=30, blank=True, default='scatter')
    def params_to_dict(self):
        d = ModelVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'AnomalyDetection_VisualizeOp'

class MLPClassifier_VisualizeOp(ModelVisualizeOp):
    option = models.CharField(max_length=30, blank=True, default='loss')
    def params_to_dict(self):
        d = ModelVisualizeOp.params_to_dict(self)
        d.update({'option': self.option})
        return d
    def get_name(self):
        return 'MLPClassifier_VisualizeOp'
