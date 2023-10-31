const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    formTitle: {
        type: String,
    },
    formImg: {
        type: String,
    },
    formDescription: {
        type: String,
        default: 'none',
    },
    questions: {
        type: [{ question: { type: String }, questImg: { type: String }, type: { type: String }, quests: { type: Array } }],
    },
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form;