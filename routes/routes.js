import express from 'express';
import {registration, getData, loginUser, verifyOTP,forgotPasswordEmail,getDataById,resetPassword,updateDataById} from "../controllers/users.js";
const router = express.Router();
router.post("/registration", registration);
router.get("/getRegisterData",getData);
router.post("/login",loginUser);
router.post("/verifyOTP",verifyOTP);
router.post("/forgotPasswordEmail",forgotPasswordEmail);
router.post("/getDataById",getDataById);
router.post("/resetPassword",resetPassword);
router.post("/updateDataById",updateDataById)
export default router;
