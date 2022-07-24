const router = require('express').Router();
const auth = require('../middlewares/auth')
const todoController = require('../controller/todo');

//add todo data:
router.post('/add-todo', auth, todoController.addTodoData);

//get todo data:
router.get('/get-todo', auth, todoController.getTodoData);

//get todo data by id:
router.get('/get-todo/:id', auth, todoController.getTodoDataById);

//update todo data by id:
router.put('/update-todo/:id', auth, todoController.updateTodoDataById);

//delete todo data by id:
router.delete('/delete-todo/:id', auth, todoController.deleteTodoData);


//exporting the router:
module.exports = router;