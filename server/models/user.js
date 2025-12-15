import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    registeredOrgs:[{
        type:Schema.Types.ObjectId,
        ref:"Organisation"
    }],
    queue:{
        type:Schema.Types.ObjectId,
        ref:"Service"
    }
})


module.exports(mongoose.model("User",userSchema));