const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRouter = express.Router();
const categoryRouter = express.Router();
const todoRoutes = require('./routes/todo')
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

todoRouter.route('/getAll').post(function(req, res) {
    todoRoutes.getAll(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

todoRouter.route('/add').post(function(req, res) {
    todoRoutes.addTodo(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

todoRouter.route('/update/:id').post(function(req, res) {
    todoRoutes.updateTodoStatus(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

todoRouter.route('/completeAll').post(function(req, res) {
    todoRoutes.completeAll(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

todoRouter.route('/deleteAll').post(function(req, res) {
    todoRoutes.deleteAll(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

todoRouter.route('/delete/:id').post(function(req, res) {
    todoRoutes.deleteTodo(req, res, (error, response) => {
        if (error) {
            res.status(400).json(error);
        } else {
            res.status(200).json(response);
        }
    })
});

app.use('/todos', todoRouter);

mongoose
  .connect(
    `mongodb+srv://gallery:2vxJMtu7y2U8kd3J@cluster0-kkm3j.mongodb.net/todo?retryWrites=true`,
    { useNewUrlParser: true }
  )
  .then(() => {
    const connection = mongoose.connection;

    connection.once('open', function() {
        console.log("MongoDB database connection established successfully");
    })    
    app.listen(PORT);
    console.log(`App listen to port ${PORT}`);
  })
  .catch(err => {
    console.log(err);
  });