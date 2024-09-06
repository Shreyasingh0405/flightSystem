import mongoose from "mongoose";
import users from "./users.js";
const airlinesSchema = new mongoose.Schema({
    airlineName: {
        type: String,
        required: true,
        trim: true
    },
    airlineCode: {
        type: String,
        required: true,
        trim: true
    },
    // airlineLogo: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
    contactInfo: {
        type: JSON,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required: true,
        trim: true
    },
    status:{
        type:Number,
        enum:[0,1], // 0:active,1:deleted
        default:0 
    }
},
{timestamps:true,versionKey:false}
)
export default mongoose.model("airlines",airlinesSchema)

