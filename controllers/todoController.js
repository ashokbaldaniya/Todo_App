const todoService = require("../services/todoService")

const err = {
  success: false,
  message: "unauthorised"
}

module.exports = {

  todoAdd: async (req, res, next) => {
    try {
      const params = { ...req.body, user: req.user }
      const todocreate = await todoService.todoAdd(params)
      res.send(todocreate, "todo created successfully");
    } catch (error) {
      next(error)
    }
  },

  todoUpdate: async (req, res) => {
    try {
      const params = { ...req.body, ...req.params }
      const updateTodo = await todoService.todoUpdate(params)
      res.send(todoData(updateTodo, "todo updated successfully"))
    } catch (error) {
      res.send(err)
    }
  },

  todoView: async (req, res) => {
    try {
      const params = { ...req.body, ...req.params }
      const viewtodo = await todoService.todoView(params)
      res.send(todoData(viewtodo, "todo view by id successfully"))
    } catch (error) {
      res.send(err)

    }
  },

  todoDelet: async (req, res) => {
    try {
      const params = { ...req.body, ...req.params }
      const deletetodo = await todoService.todoDelet(params)
      res.send(todoData(deletetodo, "todo deleted successfuly"))
    } catch (error) {
      res.send(err)
    }
  },

  todoGet: async (req, res) => {
    try {
      const gettodo = await todoService.todoGet()
      res.send(todoData(gettodo, "get todo list successfully"))
    } catch (error) {
      res.send(err)
    }
  },
}