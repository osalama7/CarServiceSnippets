 $scope.addtoTupdates = function (param1, param2, param3, param4,  list){

        var taskstate = Tstates.get({
            tstateId: param1._id
        }).$promise.then(function f(data){
                
                return data;
            });

        var updatedtask= Tasks.get({
            taskId: param2._id
        }).$promise.then(function(data){
            
                return data;
        });
        var indx;
        var tupdates = ({
            task : Tasks.get({
                taskId: param2._id
            }),
            tstate : Tstates.get({
                tstateId: param1._id
            }),
            user : Users.get({
                userId: param3._id
            }),
            lift : Lifts.get({
                liftId: param4._id
            })

        });
        
        if(list.indexOf(tupdates)===-1){
            var indx2 = _.indexOf(list, taskstate._id);
            
            list.push(tupdates);
            
        }else {
            if ((indx =list.indexOf(tupdates))>-1) {
            
            }
        }
        $scope.job.tupdates = Array.from(list);

    };
