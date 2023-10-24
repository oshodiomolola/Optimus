const { taskModel } = require('../Models/tasks');
const appError = require('../utils/errorHandler');
const mongoose = require('mongoose');
const objectId = mongoose.Types.objectId;

async function getAll(req, res, next) {
  try {
      if (req.user.active === true) {
          const userId = req.user.id
          const userTasks = await taskModel.find({ user: userId });
          if (!userTasks) return next(new appError('cannot find task', 404))
          res.status(200).json({ result: "SUCCESS", size: userTasks.length, userTasks })
      }
  } catch (err) {
      next(new appError(err, 500))
  }

}

async function createTask(req, res, next) {
  try {
      const body = req.body;
      body.user = req.user._id;
      if (req.user.active === true) {
          const newTask = await taskModel.create(body);

          res.status(201).json({ result: "SUCCESS", message: 'A new task has been added', newTask });
      }
      else {
          return next(new appError('cannot create new task', 400))
      }
  } catch (err) {
      next(new appError(err, 500))
  }
}

async function updateTask(req, res, next) {
  try {
      if (req.user.active === true) {
          const task = await taskModel.findById(req.params.id)
          task.status = 'completed',
              await task.save();
          res.status(201).json({ result: "SUCCESS", message: 'task has been updated', task })
      }
      else {
          return next(new appError('User does not exist kindly signUp', 404))
      }

  } catch (err) {
      next(new appError(err, 500))
  }

}
async function deleteTask(req, res, next) {
  try {
      if (req.user.active === true) {
          const task = await taskModel.findById(req.params.id)
          task.status = 'deleted'
          await task.save();
          res.status(200).json({ result: "SUCCESS", message: 'A task has been deleted', task })
      } else {
          return next(new appError('User does not exist kindly signUp', 404))
      }

  } catch (err) {
      next(new appError(err, 500))
  }

}

async function getTaskStats(req, res) {
  try {
      const userId = req.user._id
      const pipeline = [
          { $match: { user: new objectId(userId) } },
          {
              $group: {
                  _id: '$status',
                  count: { $sum: 1 },
              },
          },
          {
              $project: {
                  _id: 0,
                  status: "$_id",
                  count: 1,
              },
          }

      ]
      if (req.user.active === true) {
          const taskStats = await taskModel.aggregate(pipeline)
          res.status(200).json({ result: 'SUCESS', taskStats })

      }
  } catch (err) {
      next(new appError(err, 500))
  }
}

module.exports = { getAll, deleteTask, updateTask, createTask, getTaskStats }