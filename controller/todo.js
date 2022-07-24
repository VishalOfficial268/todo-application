const TodoModel = require('../model/Todo');
const dotenv = require('dotenv');



const addTodoData = async (req, res, next) => {
    try {
        // res.send("addTodoData working...");
        const { todoname, description } = req.body;
        if (todoname) {
            const todo = new TodoModel({ todoname, description, userId: req.userId });
            let insertedData = await todo.save();
            if (insertedData) {
                console.log(insertedData);
                res.status(200).json({ message: "Todo created successfully" });
            } else {
                res.status(500).json({ error: "something went wrong while creating todo" });
            }
        } else {
            console.log("Todo name is required.");
            return res.status(400).json({ error: "Todo name is required." });
        }
    } catch (error) {
        next(error);
    }
}

const getTodoData = async (req, res, next) => {
    // console.log(req.userId);
    try {
        const todoData = await TodoModel.find({ userId: req.userId });
        if (todoData && todoData.length) {
            res.status(200).json({ data: todoData });
        } else {
            return res.status(500).json({ error: "Sorry, No todo records found." });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
}

const getTodoDataById = async (req, res, next) => {
    try {
        const params = req.params;
        // console.log(params.id);
        if (params.id) {
            let dataById = await TodoModel.findById(params.id);
            if (dataById) {
                console.log("Your todo data by id found");
                res.status(200).json({ data: dataById });
            } else {
                return res.status(500).json({ error: "Something went wrong while getting data by id." });
            }
        } else {
            return res.status(400).json({ error: "Please provide _id for search data by id" });
        }
    } catch (error) {
        next(error);
    }
}

const updateTodoDataById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const body = req.body;
        if (id && body) {
            let updateData = await TodoModel.findByIdAndUpdate(
                id,
                {
                    $set: {
                        todoname: body.todoname,
                        description: body.description,
                        updatedDate: new Date(),
                        userId: req.userId
                    }
                },
                { upsert: true, new: true }
            )
            if (updateData) {
                console.log(updateData)
                return res.status(200).json({ message: "Your todo updated successfully" });
            } else {
                return res.status(401).json({ error: "Something went wrong while update todo." });
            }
        } else {
            return res.status(400).json({ error: "Please provide the value to update." });
        }
    } catch (error) {
        next(error);
    }
}


const deleteTodoData = async (req, res, next) => {
    try {
        let params = req.params;
        // console.log(params)
        if (params.id) {
            const deletedData = await TodoModel.findOneAndDelete(params.id);
            if (deletedData) {
                console.log(deletedData);
                return res.status(200).json({ message: "Data deleted successsfully..." });
            } else {
                return res.status(400).json({ error: "Something went wrong while deleting data..." })
            }
        } else {
            console.log("Please provide id for deleting...");
            return res.status(400).json({ error: "Please provide id for deleting..." });
        }
    } catch (error) {
        next(error);
    }
}


module.exports = {
    addTodoData,
    getTodoData,
    getTodoDataById,
    updateTodoDataById,
    deleteTodoData
}