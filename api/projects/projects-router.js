// Write your "projects" router here!
const express = require('express');

const Project = require('./projects-model');

const { validateProjectId, validateProjectContents } = require('./projects-middleware');

const router = express.Router();



router.get('/', (req, res) => {
    Project.get()
        .then(projs => res.json(projs))
        .catch(err => console.log(err));
})


router.get('/:id', validateProjectId, (req, res) => {
    res.json(req.project);
})


router.post('/', validateProjectContents, (req, res) => {
    Project.insert({name: req.name, description: req.description, completed: req.body.completed})
        .then(newProject => {
            res.status(201).json(newProject);
        })
        .catch(err => console.log(err))
})


router.put('/:id', validateProjectId, validateProjectContents, async (req, res) => {
    Project.update(req.params.id, {
        name: req.name,
        description: req.description,
        completed: req.body.completed
    })
        .then(updatedProject => {
            res.status(200).json(updatedProject);
        })
        .catch(err => console.log(err));
})


router.delete('/:id', validateProjectId, async (req, res) => {
    const { id } = req.params;

    try{
        const toDelete = await Project.get(id);
        res.json(toDelete);
        await Project.remove(id);
    }
    catch(err){
        console.log(err);
    }
    

})


router.get('/:id/actions', validateProjectId, (req, res) => {
    Project.getProjectActions(req.params.id)
        .then(actions => res.json(actions))
        .catch(err => console.log(err));
})



module.exports = router