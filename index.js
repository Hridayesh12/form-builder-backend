const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const Form = require('./models/formSchema');
const { MongoClient, ObjectId } = require('mongodb');
dotenv.config();
const port = 5000 || process.env.PORT;
const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`MongoDb connected ${conn.connection.host}`);
    }
    catch (err) {
        // console.log(err);
        process.exit(1);
    }
}
const app = express();
app.use(cors());
app.use(express.json());

app.post('/createForm', async (req, res) => {
    try {
        const { formTitle, formDescription, questions } = req.body;
        // console.log(formTitle, formDescription, questions);
        const form = new Form({ formTitle, formDescription, questions });
        await form.save()
            .then(() => {
                // console.log("ZA WARUDO");
                res.status(200).json({ Success: "Form Created", id: form._id });
            })
            .catch((err) => {
                res.status(400).json({ Error: "Error adding form" });
            });
    }
    catch (error) {
        // console.log(error);
        return res.status(400).json({ Error: "Error Occured" });
    }
});
app.get('/getForm', async (req, res) => {
    try {
        const forms = await Form.find();
        // console.log(forms);
        if (forms) {
            res.status(200).json({ Success: forms });
        }
        else {
            res.status(400).json({ Error: "Doesn't exist" });
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(400).json({ Error: "Error Occured" });
    }
});
app.get('/getForm/:_id', async (req, res) => {
    try {
        const _id = new ObjectId(req.params._id);
        // console.log(_id);
        const form = await Form.findById(_id);
        // console.log(form);
        if (form) {
            res.status(200).json({ Success: form });
        }
        else {
            res.status(400).json({ Error: "Doesn't exist" });
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(400).json({ Error: "Error Occured" });
    }
});

// app.post('/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
//         // console.log(username, email, password);
//         const userFound = await User.findOne({ email });
//         if (userFound) {
//             res.status(400).json({ Error: "User already exists" });
//         }
//         else {
//             const user = new User({ username, email, password });
//             await user.save()
//                 .then(() => {
//                     // console.log("ZA WARUDO");
//                     res.status(200).json({ Success: "User Created", id: user._id });
//                 })
//                 .catch((err) => {
//                     res.status(400).json({ Error: "Error adding user" });
//                 });
//         }

//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });

// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // console.log(email, password);
//         const userFound = await User.findOne({ email });
//         if (userFound && userFound.password == password) {
//             res.status(200).json({ Success: userFound.username, id: userFound._id });
//         }
//         else {
//             res.status(400).json({ Error: "Doesn't exist" });
//         };
//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });

// app.post('/postTodo', async (req, res) => {
//     try {
//         const { todo, author } = req.body;
//         // console.log(todo, author);
//         const user = new Todo({ todo, author });
//         await user.save()
//             .then(() => {
//                 // console.log("ZA WARUDO");
//                 res.status(200).json({ Success: "Task Added To The List" });
//             })
//             .catch((err) => {
//                 res.status(400).json({ Error: "Error adding task" });
//             });

//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });

// app.post('/getTodo', async (req, res) => {
//     try {
//         const { author } = req.body;
//         const todoFound = await Todo.find({ author });
//         if (todoFound) {
//             res.status(200).json({ Success: todoFound });
//         }
//         else {
//             res.status(400).json({ Error: "Doesn't exist" });
//         };
//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });

// app.put('/updateTodo/:_id', async (req, res) => {
//     try {
//         const { _id } = req.params;
//         // console.log(_id);
//         const { todo, isCompleted } = req.body;
//         const todoUpdate = await Todo.findByIdAndUpdate(_id, { todo, isCompleted }, { new: true });
//         // console.log(todoUpdate);
//         if (todoUpdate) {
//             res.status(200).json({ Success: 'Update Successful' });
//         }
//         else {
//             res.status(400).json({ Error: "Doesn't exist" });
//         };
//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });

// app.delete('/deleteTodo/:_id', async (req, res) => {
//     try {
//         const _id = new ObjectId(req.params._id);
//         // console.log(_id);
//         const deleted = await Todo.deleteOne(_id).populate("_id");
//         // console.log(deleted);
//         if (deleted['acknowledged']) {
//             res.status(200).json({ Success: 'Update Successful' });
//         }
//         else {
//             res.status(400).json({ Error: "Doesn't exist" });
//         };
//     }
//     catch (error) {
//         // console.log(error);
//         return res.status(400).json({ Error: "Error Occured" });
//     }
// });
connectDb()
    .then((result) => { return app.listen(port, () => { console.log(`The server is up and running on port ${port}`) }) })
    .catch((error) => { return error });

