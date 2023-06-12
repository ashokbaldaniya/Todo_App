const Todo = require("../models/Todo")

module.exports = {

  todoAdd: async function (params) {
    const addtodo = new Todo(params.body)
    addtodo.user = params.user
    await addtodo.save()
    return addtodo
  },

  todoUpdate: async function (params) {
    const updateTodo = await Todo.findByIdAndUpdate(params.id, params)
    return updateTodo
  },

  todoView: async function (params) {
    const viewtodo = await Todo.findOne({ _id: params.id })
    return viewtodo
  },

  todoDelet: async function (params) {
    const deleteTodo = await Todo.findByIdAndDelete({ _id: params.id })
    return deleteTodo
  },

  todoGet: async function () {
    const getTodo = await Todo.find().populate({
      path: 'user',
      select: 'name email -_id'
    })
    return getTodo
  }
}