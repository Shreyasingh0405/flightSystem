import mongoose from "mongoose";
const objectId = mongoose.Schema.Types.ObjectId
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
        type:Object,
        required: true,
        trim: true
    },
    createdBy: {
        type: objectId,
        ref: "users",
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

