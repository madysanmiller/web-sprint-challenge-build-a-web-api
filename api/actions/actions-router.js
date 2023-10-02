// Write your "actions" router here!
const express = require('express');

const { validateActionId, validateActionContents } = require('./actions-middlware');
const Action = require('./actions-model');

const router = express.Router();


router.get('/', (req, res) => {
    Action.get()
        .then(actions => res.json(actions))
        .catch(err => console.log(err));
})


router.get('/:id', validateActionId, (req, res) => {
    res.json(req.action);
})


router.post('/', validateActionContents, (req, res) => {
    Action.insert({
        project_id: req.body.project_id,
        description: req.description,
        notes: req.notes
    })
        .then(newAction => res.status(201).json(newAction))
        .catch(err => console.log(err));
})


router.put('/:id', validateActionId, validateActionContents, async (req, res) => {
    const { id } = req.params;
    try{
        await Action.update(id, {
            project_id: req.body.project_id,
            description: req.description,
            notes: req.notes,
            completed: req.body.completed
        });
        const updated = await Action.get(id);
        res.status(200).json(updated);
    }
    catch(err){
        res.status(500).json({message: 'There was an error updating the action'});
    }
})


router.delete('/:id', validateActionId, async (req, res) => {
    const { id } = req.params;
    try{
        const toDelete = await Action.get(id);
        res.json(toDelete);
        await Action.remove(id);
    }
    catch(err){
        res.status(500).json({message: 'There was an error with deleting the action'});
    }
})



module.exports = router