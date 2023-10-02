// add middlewares here related to projects
const Project = require('./projects-model');

async function validateProjectId(req, res, next) {
    const { id } = req.params;

    try{
        const project = await Project.get(id);

        if(!project){
            res.status(404).json({
                message: `Project not found`
            })
        }else{
            req.project = project;
            next();
        }
    }
    catch(err){
        res.status(500).json({message: 'There was a problem with accessing the project!'})
    }
}

function validateProjectContents(req, res, next) {
    if(req.method === 'PUT' && (req.body.completed !== true && req.body.completed !== false)){
        res.status(400).json({message: 'Completion status required when updating'})
    }else{
        if(!req.body.name || !req.body.description){
            res.status(400).json({message: 'Name and description is required!'});
        }
        else{
            req.name = req.body.name.trim();
            req.description = req.body.description.trim();
            next();
        }
    }
}




module.exports = {
    validateProjectId,
    validateProjectContents,
}