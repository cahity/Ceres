import externals.MLlib.WorkEnv
import threading
import ceresML.file_handler

WorkEnvironments = {}

def run_we(op, uid, eid):
    uetuple = (uid, eid)
    we = None
    # use WE in memory if there is one
    if uetuple in WorkEnvironments:
        we = WorkEnvironments[uetuple]
    # create new WE and add to memory if there is none
    else:
        we = externals.MLlib.WorkEnv.WorkEnvironment()
        WorkEnvironments[uetuple] = we
        print(WorkEnvironments)

    # added ran op to the WE
    params = op.params_to_dict()
    key = op.get_name()
    if 'path' in params:
        params['path'] = ceresML.file_handler.get_dataset_path(params['path'], uid)
    if 'X_columns' in params:
        params['X_columns'] = params['X_columns'].replace(' ', '').split(',')
    if 'Y_column' in params:
        params['Y_column'] = params['Y_column'].replace(' ', '').split(',')
    if 'hidden_sizes' in params:
        params['hidden_sizes'] = map(int, params['hidden_sizes'].replace(' ', '').split())

    suc, msg = we.add_op(op_key = key, params = params, op_id=op.id)        
    if not suc:
        return msg, None

    ret = we.run_op(op.id)
    for k,v in ret.items():
        if k == "plot":
            return "success", ceresML.file_handler.save_plot(v, uid, eid, op.id)
    return "success", None

#def run_we(op, uid, eid):
#    t = threading.Thread(target=t_run_we, args=(op, uid, eid))
#    t.start()
#    t.join()
#    return "success"
