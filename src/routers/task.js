const express = require('express');
const Task = require('../models/task');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/tasks', authMiddleware, async (req, res) => {
  const task = new Task({...req.body, owner: req.user._id});
  // const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(404).send(e);
  }
  // task
  //   .save()
  //   .then(task => {
  //     res.status(201).send(task);
  //   })
  //   .catch(e => {
  //     res.status(400).send(e);
  //   });
});

// GET /tasks?completed=true
// GET /tasks?limit=10
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt_asc
// GET /tasks?sortBy=createdAt_desc
router.get('/tasks', authMiddleware, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
          // sortBy: {
          //   // La propiedad (los de nuestra coleccion) que queremos ordenar
          //   createdAt: -1 // sort de forma descendente, 1 es ascendente
          // }
        }
      })
      .execPopulate();
    // await req.user.populate('tasks').execPopulate();
    // const tasks = await Task.find({});

    res.send(req.user.tasks);
    // res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
  // Task.find({})
  //   .then(tasks => {
  //     res.send(tasks);
  //   })
  //   .catch(error => {
  //     res.status(500).send();
  //   });
});

router.get('/tasks/:id', authMiddleware, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({_id, owner: req.user._id});
    // const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }

  // Task.findById(_id)
  //   .then(task => {
  //     if (!task) {
  //       res.status(404).send(error);
  //     }

  //     res.send(task);
  //   })
  //   .catch(errror => {
  //     res.status(500).send();
  //   });
});

router.patch('/tasks/:id', authMiddleware, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['description', 'completed'];
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates'});
  }

  try {
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
    // const task = await Task.findById(_id);
    // updates.forEach(update => (task[update] = req.body[update]));
    // await task.save();

    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true
    // });

    if (!task) {
      return res.status(404).send();
    }

    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete('/tasks/:id', authMiddleware, async (req, res) => {
  const {params, user} = req;

  try {
    const task = await Task.findByIdAndDelete({
      _id: params.id,
      owner: user._id
    });
    // const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      res.status(404).send();
    }

    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
