import express from 'express';
import {registration, getUserData, userLogin, verifyOTP,forgotPassword,getUserDataById,resetPassword,updateUserDataById} from "../controllers/users.js";
import {airlinesInsertion, getAirlineDetails, getAirlinesDetailsByairlinesId, updateAirlinesDetailsById,deleteAirlines}from "../controllers/airlines.js"
import {userRegisterationValidation,loginUserValidation,verifyOtpValidation,forgotPasswordValidation,updateUserDataValidation,passwordResetValidation} from "../validations/users.js"
const router = express.Router();

router.post("/registration",userRegisterationValidation, registration);
router.post("/login",loginUserValidation,userLogin);
router.post("/verifyOTP",verifyOtpValidation,verifyOTP);
router.post("/forgotPasswordEmail",forgotPasswordValidation,forgotPassword);
router.post("/resetPassword",passwordResetValidation,resetPassword);
router.get("/getRegisterData",getUserData);
router.post("/getDataById",getUserDataById);
router.post("/updateDataById",updateUserDataValidation,updateUserDataById);

router.post("/airlineInsertion",airlinesInsertion);
router.get("/getAirlineDetails",getAirlineDetails);
router.post("/getAirlinesDetailsByairlinesId",getAirlinesDetailsByairlinesId);
router.post("/updateAirlinesDetailsById",updateAirlinesDetailsById);
router.post("/deleteAirlines",deleteAirlines);

export default router;
