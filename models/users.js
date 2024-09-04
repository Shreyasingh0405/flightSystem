import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        trim:true
    },
    lastName: {
        type: String,
        required:true,
        trim:true
    },
    mobileNo: {
        type: Number,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required:true,
        trim:true,
        lowercase:true
    },
    password: {
        type: String,
        required:true,
        trim:true
    },
    dob: {
        type: String,
        required:true,
        trim:true
    },
    age: {
        type: Number,
        required:true,
        trim:true
    },
    otpExpiration: {
        type: Date,
    },
    otp: {
        type: String,
    },
    userRole: {
        type: Number,
        trim:true
 },
    status: {
        type: Number,
        }
},
{timestamps:true,versionKey:false}
);
export default mongoose.model("User", userSchema);


