const mongoose = require('mongoose');

const savedItemsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Assuming you have a User model
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product' // Assuming you have a Product model
    },
    quantity: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const SavedItemsModel = mongoose.model('SavedItems', savedItemsSchema);

module.exports = SavedItemsModel;
