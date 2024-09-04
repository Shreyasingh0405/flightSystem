import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    mobileNo: {
        type: Number,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    dob: {
        type: Date,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    otpExpiration: {
        type: Date,
    },
    otp: {
        type: String,
    },
    role: {
        type: Number,
        enum: [1, 2], // 1 :user,2:admin
        trim: true,
        default: 1
    },
    status: {
        type: Number,
    }
},
    { timestamps: true, versionKey: false }
);
export default mongoose.model("User", userSchema);