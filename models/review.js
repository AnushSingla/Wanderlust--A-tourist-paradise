const { number, string } = require("joi");
const mongoose=require("mongoose");
const reviewSchema = new mongoose.Schema({
    rating :{
        type:Number,
    },
    comments:{
        type:String,
    },
    createdAt:{
        type: Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    }
})

const Review = mongoose.model("Review",reviewSchema);
module.exports=Review;