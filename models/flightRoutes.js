import mongoose from 'mongoose';
const objectId = mongoose.Schema.Types.ObjectId
const routesSchema = new mongoose.Schema({
    originCity: {
        type: String,
        required: true,
        trim: true
    },
    destinationCity: {
        type: String,
        required: true,
        trim: true
    },
    distance: {
        type: String,
        trim: true
    },
    travelDuration: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: objectId,
        ref: "users",
        required: true
    },
    status:{
        type:Number,
        enum:[0,1], // 0:active,1:deleted
        default:0 
    }
},
    { timestamps: true, versionKey: false })
export default mongoose.model("routes", routesSchema)