const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    formTitle: {
        type: String,
    },
    formDescription: {
        type: String,
        default: 'none',
    },
    questions: {
        type: [{ question: { type: String }, type: { type: String }, quests: { type: Array } }],
    },
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;