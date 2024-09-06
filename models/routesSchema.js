import mongoose from "mongoose"
import users from "./users.js"
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
        type: Number,
        trim: true
    },
    travelDuration: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: users,
        required: true
    }
},
    { timestamps: true, versionKey: false })
export default mongoose.model("routes", routesSchema)