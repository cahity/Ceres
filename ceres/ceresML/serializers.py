from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer
from .models import *

class CeresOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CeresOp
        fields = ('__all__')

class EnvironmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Environment
        fields = ('__all__')

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = ('name', 'owner')

# DATA OPS
class DataCreateOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataCreateOp
        fields = ('__all__')

class DataModifyOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataModifyOp
        fields = ('__all__')

class DataVisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataVisualizeOp
        fields = ('__all__')

# DATA CREATE OPS
class CSV_XY_DataOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSV_XY_DataOp
        fields = ('__all__')

class CSV_X_DataOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSV_X_DataOp
        fields = ('__all__')

# DATA MODIFY OPS
class DataShuffleOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataShuffleOp
        fields = ('__all__')

class ScalerOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScalerOp
        fields = ('__all__')

class LabelsToOneHotOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelsToOneHotOp
        fields = ('__all__')

class LabelIndexerOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabelIndexerOp
        fields = ('__all__')

# DATA VISUALIZE OPS
class ScatterPlotOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScatterPlotOp
        fields = ('__all__')

# MODEL OPS
class ModelCreateOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelCreateOp
        fields = ('__all__')

class ModelTrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelTrainOp
        fields = ('__all__')

class ModelVisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelVisualizeOp
        fields = ('__all__')

# MODEL CREATE OPS
class LinearRegression_ModelOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinearRegression_ModelOp
        fields = ('__all__')

class LogisticRegression_ModelOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogisticRegression_ModelOp
        fields = ('__all__')

class KMeans_ModelOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = KMeans_ModelOp
        fields = ('__all__')

class AnomalyDetection_ModelOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnomalyDetection_ModelOp
        fields = ('__all__')

class MLPClassifier_ModelOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLPClassifier_ModelOp
        fields = ('__all__')

# MODEL TRAIN OPS
class LinearRegression_TrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinearRegression_TrainOp
        fields = ('__all__')

class LogisticRegressionTrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogisticRegressionTrainOp
        fields = ('__all__')

class KMeans_TrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = KMeans_TrainOp
        fields = ('__all__')

class AnomalyDetection_TrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnomalyDetection_TrainOp
        fields = ('__all__')

class MLPClassifier_TrainOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLPClassifier_TrainOp
        fields = ('__all__')

# MODEL VISUALIZE OPS
class LinearRegression_VisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinearRegression_VisualizeOp
        fields = ('__all__')

class LogisticRegression_VisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = LogisticRegression_VisualizeOp
        fields = ('__all__')

class KMeans_VisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = KMeans_VisualizeOp
        fields = ('__all__')

class AnomalyDetection_VisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnomalyDetection_VisualizeOp
        fields = ('__all__')

class MLPClassifier_VisualizeOpSerializer(serializers.ModelSerializer):
    class Meta:
        model = MLPClassifier_VisualizeOp
        fields = ('__all__')

class CeresOpPolymorphicSerializer(PolymorphicSerializer):
    resource_type_field_name = 'optype'
    model_serializer_mapping = {
        CeresOp: CeresOpSerializer,
        DataCreateOp: DataCreateOpSerializer,
        DataModifyOp: DataModifyOpSerializer,
        DataVisualizeOp: DataVisualizeOpSerializer,
        CSV_XY_DataOp: CSV_XY_DataOpSerializer,
        CSV_X_DataOp: CSV_X_DataOpSerializer,
        DataShuffleOp: DataShuffleOpSerializer,
        ScalerOp: ScalerOpSerializer,
        LabelsToOneHotOp: LabelsToOneHotOpSerializer,
        LabelIndexerOp: LabelIndexerOpSerializer,
        ScatterPlotOp: ScatterPlotOpSerializer,
        ModelCreateOp: ModelCreateOpSerializer,
        ModelTrainOp: ModelTrainOpSerializer,
        ModelVisualizeOp: ModelVisualizeOpSerializer,
        LinearRegression_ModelOp: LinearRegression_ModelOpSerializer,
        LogisticRegression_ModelOp: LogisticRegression_ModelOpSerializer,
        KMeans_ModelOp: KMeans_ModelOpSerializer,
        AnomalyDetection_ModelOp: AnomalyDetection_ModelOpSerializer,
        MLPClassifier_ModelOp: MLPClassifier_ModelOpSerializer,        
        LinearRegression_TrainOp: LinearRegression_TrainOpSerializer,
        LogisticRegressionTrainOp: LogisticRegressionTrainOpSerializer,
        KMeans_TrainOp: KMeans_TrainOpSerializer,
        AnomalyDetection_TrainOp: AnomalyDetection_TrainOpSerializer,
        MLPClassifier_TrainOp: MLPClassifier_TrainOpSerializer,        
        LinearRegression_VisualizeOp: LinearRegression_VisualizeOpSerializer,
        LogisticRegression_VisualizeOp: LogisticRegression_VisualizeOpSerializer,
        KMeans_VisualizeOp: KMeans_VisualizeOpSerializer,
        AnomalyDetection_VisualizeOp: AnomalyDetection_VisualizeOpSerializer,
        MLPClassifier_VisualizeOp: MLPClassifier_VisualizeOpSerializer     
    }
