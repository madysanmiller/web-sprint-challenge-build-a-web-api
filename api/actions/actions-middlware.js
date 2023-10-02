// add middlewares here related to actions
const Action = require('./actions-model');
const Project = require('../projects/projects-model');


async function validateActionId(req, res, next) {
    const { id } = req.params;

    try {
        const action = await Action.get(id);

        if (!action) {
            res.status(404).json({
                message: 'Action not found'
            })
        }
        else {
            req.action = action;
            next();
        }
    }
    catch (err) {
        res.status(500).json({ message: 'There was a problem accessing the action!' })
    }
}

async function validateActionContents(req, res, next) {
    try{
        const project = await Project.get(req.body.project_id)
        if(!project){
            res.status(400).json({message: 'No project with that project_id was found!'})
        }else{
            if(req.method === 'PUT' && (req.body.completed !== true && req.body.completed !== false)){
                res.status(400).json({message: 'Completion status required when updating'})
            }else{
                if (!req.body.description || !req.body.notes || !req.body.description.trim().length > 128) {
                    res.status(400).json({
                        message: `
                            Valid project ID, description, and notes are all required fields
                            Description must be 128 chars or less
                        `});
                }
                else{
                    req.description = req.body.description.trim();
                    req.notes = req.body.notes.trim();
                    next();
                }
            }
        }
    }
    catch(err){
        res.status(500).json({message: 'There was an error validingActionContents!'})
    }

}



module.exports = {
    validateActionId,
    validateActionContents
}