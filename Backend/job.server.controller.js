exports.update = function(req, res){
    var job = req.job;
    job.title = req.body.title;
    console.log(req.body.assignedTo);

    //check if no user is assigned
    if(req.body.assignedTo!==undefined){
    job.assignedTo = req.body.assignedTo._id;
    }
    //Keep updates inside an array everytime someone does an update at a given time
    job.modifiedOn.addToSet(Date.now());
    job.modifiedBy.push(req.user);
    job.scenter = req.body.scenter._id;
    job.jstate = req.body.jstate._id;
    job.lift = req.body.lift._id;
    job.reservedAt = req.body.reservedAt;
    job.customerName = req.body.customerName;
    job.customerPhone = req.body.customerPhone;
    job.vnumber = req.body.vnumber;

    //updating tasks list by adding new tasks to the set without repetition
    for(task in req.body.tasks){
        job.tasks.addToSet(task._id);
    }
    //job.tasks = req.body.tasks;
    var tupdate;
    //check for updates
    if(req.body.tupdates.length>0){
    for (tupdate in req.body.tupdates){
        if(reqTupdate!==null) {
            
            if(reqTupdate.tstate.tsname=="start"){
                tupdate = ({
                task: reqTupdate.task._id,
                tstate: reqTupdate.tstate._id,
                assignedTo : reqTupdate.user._id,
                lift: reqTupdate.lift._id,
                startedat: Date.now()

            });
            }
            else if(reqTupdate.tstate.tsname=="stop"){
                 tupdate = ({
                    task: reqTupdate.task._id,
                    tstate: reqTupdate.tstate._id,
                    assignedTo : reqTupdate.user._id,
                    lift: reqTupdate.lift._id,
                    stoppedat: Date.now()

                });
            }
            job.tupdates.push(tupdate);
            }
        }
    }
    job.save(function(err){
        if(err){
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        }else{
            res.json(job);
        }
    });
};
