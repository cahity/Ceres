import os
from datetime import datetime

BASE_DIR = 'userfiles'
DATASETS = 'datasets'
WORKENVS = 'workenvs'


def save_dataset(file, name, uid):
    dir_path = os.path.join(BASE_DIR, str(uid), DATASETS)
    if not os.path.exists(dir_path):
        os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, name)
    with open(file_path, 'wb+') as dest:
        for chunk in file.chunks():
            dest.write(chunk)

def get_dataset_path(name, uid):
    return os.path.join(BASE_DIR, str(uid), DATASETS, name)

def save_plot(plot, uid, eid, oid):
    dir_path = os.path.join(BASE_DIR, str(uid), WORKENVS, str(eid))
    if not os.path.exists(dir_path):
        os.makedirs(dir_path, exist_ok=True)
    file_path = os.path.join(dir_path, str(oid) + '@' + datetime.now().strftime('%Y_%m_%d--%H_%M_%S'))
    print(file_path)
    plot.savefig(file_path)
    return file_path + '.png'
    
