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

app.get('/', (req, res) => {
    res.send("Hello World");
});
app.post('/createForm', async (req, res) => {
    try {
        const { formTitle, formDescription, formImg, questions } = req.body;
        // console.log(formTitle, formDescription, questions);
        const form = new Form({ formTitle, formDescription, formImg, questions });
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


connectDb()
    .then((result) => { return app.listen(port, () => { console.log(`The server is up and running on port ${port}`) }) })
    .catch((error) => { return error });

