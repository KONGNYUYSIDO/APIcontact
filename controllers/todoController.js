import todo from "../models/todoModel.js";


export async function getTodos ( req, res ) {
    const userId = req.user._id;
    try {
        const todos = await todo.find( { userId }, { _id: 0, userId: 0 } );
        if ( todos.length === 0 ) {
            res.status( 404 ).json( { status: "Success", message: "No task(s) available in your list" } );
        }
        res.status( 200 ).json( { status: "Success", message: "Your list of different tasks", data: todos } );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function createTodo ( req, res ) {
    const newTask = new todo ( {
        userId: req.user._id,
        task: req.body.task,
        Status: req.body.Status,
        dueDate: req.body.dueDate,
        createdAt: req.body.createdAt
    } );

    try {
        const newTodo = await newTask.save();
        res.status( 201 ).json( { status: "successful", message: "Task added successfully", data: newTodo } );
    } catch (error) {
        res.status( 500 ).json( { message: error.message } );
    }
}



export async function updateTodo ( req, res ) {
    const userId = req.user._id;
    try {
        const updateTask =await todo.findByIdAndUpdate( req.params.id, req.body, { userId, new: true, fields: { _id: 0, userId: 0 } } );
        if (!updateTask) {
            res.status( 404 ).json( { status: "failed", message: "Task does not exist" } );
        }
        res.status( 200 ).json( { status: "Successful", message: "Task updated Successfully" } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error", message: error.message } );
    }
}



export async function completedTodo ( req, res ) {
    const userId = req.user._id;
    try {
        const completeTask = await todo.find( { userId, Status: 'completed' } );
        res.status( 200 ).json( { status: "Successful", message: "List of completed task(s)", data: completeTask } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error/Failed", message: error.message } );
    }
}



export async function uncompletedTodo ( req, res ) {
    const userId = req.user._id;
    try {
        const uncompleteTask = await todo.find( { userId, Status: { $in: ['pending', 'in_progress'] } } );
        res.status( 200 ).json( { status: "Successfull", message: "List of uncompleted task(s)", data: uncompleteTask } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error/Failed", message: error.message } );
    }
}




export async function deleteTodo ( req, res ) {
    const userId = req.user._id;
    try {
        const deleteTask = await todo.findByIdAndDelete( req.params.id, { userId } );
        if (!deleteTask) {
            res.status( 404 ).json( { status: "failed", message: "Could not delete a nonexistent task" } );
        }
        res.status( 200 ).json( { status: "Successful", message: "Task successfully deleted" } );
    } catch (error) {
        res.status( 500 ).json( { status: "Error", message: error.message } );
    }
}