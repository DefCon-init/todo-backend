const Todo = require("../models/todo");
const dateFNS = require('date-fns');

module.exports = {
    getAll: (req, res, cb) => {
        Todo.find((err, todos) => {
            if (!!err) {
                cb(err, null);
            } else {
                cb(null, todos);
            }
        });
    },
    addTodo: (req, res, cb) => {
        let todo = new Todo(req.body);
        todo
            .save()
            .then(todo => {
                const response = {
                    success: true,
                    message: "Todo added successfully",
                    todo
                };
                cb(null, response);
            })
            .catch(err => {
                const error = {
                    success: false,
                    err,
                    message: "Failed while adding todo"
                };
                cb(error, null);
            });
    },
    updateTodoStatus: (req, res, cb) => {
        Todo.findById(req.params.id, (err, todo) => {
            if (!todo) {
                cb({ success: false, message: "Data not found" }, null);
            } else {
                todo.done = !todo.done;
                todo
                    .save()
                    .then(todo => {
                        cb(null, { success: true, message: "Updated success" });
                    })
                    .catch(err => {
                        cb({ success: false, message: "Error while updating data" }, null);
                    });
            }
        });
    },
    deleteTodo: (req, res, cb) => {
        Todo.findByIdAndDelete(req.params.id, (err, todo) => {
            if (!todo) {
                cb({ success: false, message: "Error while removing todo" }, null);
            } else {
                cb(null, { success: true, message: "Todo successfully deleted", todo });
            }
        });
    },
    completeAll: (req, res, cb) => {
        Todo.find((err, todos) => {
            if (!todos && todos.length == 0) {
                cb({ success: false, message: "No todos found" }, null);
            } else {
                let promiseArray = []
                promiseArray = todos.map((todo) => {
                    try {
                        if (!todo.done && dateFNS.isSameDay(new Date(todo.date), new Date(req.body.date))) {
                            todo.done = true
                            return todo.save()
                        }
                    } catch (error) {
                        throw error
                    }
                })
                Promise.all(promiseArray)
                    .then((res) => cb(null, { success: true, message: "All todo updated", res }))
                    .catch((err) => cb({ success: true, message: "Error while updating all todo", err }, null))
            }
        });
    },
    deleteAll: (req, res, cb) => {
        Todo.find((err, todos) => {
            if (!todos && todos.length == 0) {
                cb({ success: false, message: "No todos found" }, null);
            } else {
                let promiseArray = []
                promiseArray = todos.map((todo) => {
                    try {
                        if (dateFNS.isSameDay(new Date(todo.date), new Date(req.body.date))) {
                            return todo.remove()
                        }
                    } catch (error) {
                        throw error
                    }
                })
                Promise.all(promiseArray)
                    .then((res) => cb(null, { success: true, message: "All todo removed", res }))
                    .catch((err) => cb({ success: true, message: "Error while removing todo", err }, null))
            }
        });
    }
};
