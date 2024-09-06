export default async (app) => {
    try {
        //===================controllers===================//
        const { 
            registration, 
            getUserData, 
            userLogin, 
            verifyOTP, 
            forgotPassword, 
            getUserDataById, 
            resetPassword, 
            updateUserDataById 
        } = await import("../controllers/users.js");

        //=================validations============================//
        const { 
            userRegisterationValidation, 
            loginUserValidation, 
            verifyOtpValidation, 
            forgotPasswordValidation, 
            updateUserDataValidation, 
            passwordResetValidation 
        } = await import("../validations/users.js");

        //==================user API=========================//
        app.post("/registration", userRegisterationValidation, registration);
        app.post("/login", loginUserValidation, userLogin);
        app.post("/verifyOTP", verifyOtpValidation, verifyOTP);
        app.post("/forgotPasswordEmail", forgotPasswordValidation, forgotPassword);
        app.post("/resetPassword", passwordResetValidation, resetPassword);
        app.get("/getRegisterData", getUserData);
        app.post("/getDataById", getUserDataById);
        app.post("/updateDataById", updateUserDataValidation, updateUserDataById);

    } catch (error) {
        console.log(error.message);
    }
};
