const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;