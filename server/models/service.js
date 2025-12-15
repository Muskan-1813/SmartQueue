import mongoose, { model } from "mongoose";
const Schema = mongoose.Schema;


const serviceSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    queue:[{
        type:Schema.Types.ObjectId,
        ref:"User",
    }],
    startAt:{
        type:Date,
        required:true
    },
    endAt:{
        type:Date,
        required:true
    }
})

module.exports(mongoose.model("Service",serviceSchema));