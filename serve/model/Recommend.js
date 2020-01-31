const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    categoryList: [
        {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            cover: {
                type: String,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Recommend',schema);